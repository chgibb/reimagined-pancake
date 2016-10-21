#ifndef _UTIF_H_
#define _UTIF_H_ 1

#include <stdexcept>
#include <locale>
#include <iosfwd>
#include <algorithm>

#ifdef __MINGW32_VERSION
#ifndef _GLIBCXX_USE_WCHAR_T

namespace std
{
	/// declare a coecvt between wchar_t and char
	/*!
	 * If Mingw support for wchar_t is not activated, the following declarations are
	 * required to properly let the code to be translatable
	 */
	template<>
	class codecvt<wchar_t,char,mbstate_t>:
		public __codecvt_abstract_base<wchar_t,char,mbstate_t>
	{
	protected:
		explicit codecvt(size_t refs=0)
			:__codecvt_abstract_base<wchar_t,char,mbstate_t>(refs)
		{}
	public:
		static locale::id id;
	};

	// wide types for char dependent templates
	typedef basic_ios<wchar_t> 				wios;
	typedef basic_streambuf<wchar_t> 		wstreambuf;
	typedef basic_istream<wchar_t> 			wistream;
	typedef basic_ostream<wchar_t> 			wostream;
	typedef basic_iostream<wchar_t> 		wiostream;
	typedef basic_stringbuf<wchar_t> 		wstringbuf;
	typedef basic_istringstream<wchar_t>	wistringstream;
	typedef basic_ostringstream<wchar_t>	wostringstream;
	typedef basic_stringstream<wchar_t> 	wstringstream;
	typedef basic_filebuf<wchar_t> 			wfilebuf;
	typedef basic_ifstream<wchar_t> 		wifstream;
	typedef basic_ofstream<wchar_t> 		wofstream;
	typedef basic_fstream<wchar_t> 			wfstream;
}

#endif //_GLIBCXX_USE_WCHAR_T
#endif //__MINGW32_VERSION

namespace gel
{namespace stdx
{
	///exception class thrown during conversions.
	/*!
	 * A special kind-of std::runtime_error to signal errors in UTF conversions.
	 *
	 * In Normal situations this should be caught by the std::basic_streambuf derived
	 * implementation provided by STL.
	 *
	 * You can take advantage by this exception and messages if you plan to
	 * deploy your own buffer implementations.
	 */
	class utf_error:
		public std::runtime_error
	{
	public:
		utf_error() :runtime_error("UTF conversion error") {}
		utf_error(const std::string& txt) :runtime_error(txt) {}
	};


	/// utf8 reader for wstream-s.
	/*!
	 * Facet used to read/write UTF-8 bytes into UTF-16 streams.
	 * /param strict set true for throw in case of invalid chars or sequences.
	 *
	 * This is a replacement for std::codecvt<wchar_t,char,mbstate_t>, from where it
	 * derives, and can be used to setup a locale to handle UTF-8 to 16 conversion.
	 *
	 * If \c strict is \c true every invalid character or sequence causes a
	 * throw utf_error with an appropriate message.
	 *
	 * If \c strict is \c false every sequence is somehow interpreted, as more accurate
	 * as possible according to the encoding and decoding algorithms.
	 */
	template<bool strict>
	class utf8cvt:
		public std::codecvt<wchar_t,char,std::mbstate_t>
	{
	public:
		typedef std::codecvt<wchar_t,char,std::mbstate_t> baset_type;
		typedef baset_type::extern_type extern_type;
		typedef baset_type::intern_type intern_type;
		typedef baset_type::state_type state_type;

		explicit utf8cvt(size_t refs=0) :std::codecvt<wchar_t,char,std::mbstate_t>(refs) {}
		bool is_strict() const { return strict; }
	protected:

		/// return false
		virtual bool do_always_noconv() const throw() { return false; }
		/// return 6 (the maximum supportable UTF sequences
		virtual int do_max_length() const throw() { return 6; }
		/// return -1 being state-dependent
		virtual int do_encoding() const throw() { return -1; }

		/// gets the number of symbols representing up-to Len2 outputs
		/*!
		 * Return a safe number to grant enough space for encoding if the
		 * required sequence
		 */
		virtual int do_length(state_type& _State,
			const extern_type* _First1, const extern_type* _Last1, size_t _Len2) const
		{
			return (int)std::min(_Len2, (size_t)(_Last1-_First1));
		}

		/// decode the UTF-8 characters and encode as UTF-16
		/*!
		 * _State used here as 0xNXXXXXXX, where N is the number of following bytes and
		 * XXX... are the UCS (limited to 28 bits)for a translating character
		 *
		 * The following encodings are valid, except for the 5 and 6 byte combinations: \n
	     *	0xxxxxxx (7 bit - masks 0xFFFFFF80 - 0x0000007F)\n
	     *	110xxxxx 10xxxxxx (11 bit - masks 0xFFFFF800 - 0x000007FF)\n
	     *	1110xxxx 10xxxxxx 10xxxxxx (16 bit - masks 0xFFFF0000 - 0x0000FFFF)\n
	     *	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (21 bit - masks 0xFFE00000 - 0x001FFFFF)\n
	     *	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx (26 bit - masks 0xFC000000 - 0x03FFFFFF)\n
	     *	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx (31 bit - masks 0xC0000000 - 0x3FFFFFFF)\n
		 *
	     * The following combinations are overlong, and illegal:
	     *	1100000x (10xxxxxx)
	     *	11100000 100xxxxx (10xxxxxx)
	     *	11110000 1000xxxx (10xxxxxx 10xxxxxx)
	     *	11111000 10000xxx (10xxxxxx 10xxxxxx 10xxxxxx)
	     *	11111100 100000xx (10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx)
	     *
	     */
		virtual result do_in(state_type& state,
			const extern_type* _First1, const extern_type* _Last1, const extern_type*& _Next1,
			intern_type* _First2, intern_type* _Last2, intern_type*& _Next2) const
		{
			unsigned & _State = *(unsigned*)&state;
			for(_Next1 = _First1, _Next2 = _First2; _Next1 < _Last1 && _Next2 < _Last2; ++_Next1)
			{
				if(!(_State&0x80000000))
				{
					if((*_Next1 & 0xC0) == 0x80) //follower of a partial
					{
						if(is_strict())
						{
							if(!(_State & 0x70000000)) //too many followers
								throw utf_error("malformd UTF-8: too many followers");
							if((_State & 0x70000000) == 0x20000000 && (_State & 0xFF) == 0xE0 && (*_Next1 & 0xE0) == 0x80) throw utf_error("overlong 3 bytes sequence");
							if((_State & 0x70000000) == 0x30000000 && (_State & 0xFF) == 0xF0 && (*_Next1 & 0xF0) == 0x80) throw utf_error("overlong 4 bytes sequence");
							if((_State & 0x70000000) == 0x40000000 && (_State & 0xFF) == 0xF8 && (*_Next1 & 0xF8) == 0x80) throw utf_error("overlong 5 bytes sequence");
							if((_State & 0x70000000) == 0x50000000 && (_State & 0xFF) == 0xFC && (*_Next1 & 0xFC) == 0x80) throw utf_error("overlong 6 bytes sequence");
						}
						if(_State & 0x70000000) _State -= 1<<28; //decreent the counter
						_State = _State & 0x70000000 |
							(_State << 6)&0x0FFFFFC0 | *_Next1 & 0x3F; //shift and merge
					}
					else if (is_strict()&& _State & 0x7000000)
						throw utf_error("malformd UTF-8: not enough followers");
					else if((*_Next1 & 0x80) == 0) // ASCII - just cast
					{ _State = (state_type)(*_Next1 & 0x7F); }
					else if((*_Next1 & 0xE0) == 0xC0) // 2 byte - save 5 bits
					{
						if(is_strict() && (*_Next1 & 0xFE) == 0xC0) throw utf_error("overlong 2 bytes sequence");
						_State = (state_type)(*_Next1 & 0x1F) | 1<<28;
					}
					else if((*_Next1 & 0xF0) == 0xE0) // 3 byte - save 4 bits
					{ _State = (state_type)(*_Next1 & 0x0F) | 2<<28; }
					else if((*_Next1 & 0xF8) == 0xF0) // 4 byte - save 3 bits
					{ _State = (state_type)(*_Next1 & 0x07) | 3<<28; }
					else if((*_Next1 & 0xFC) == 0xF8 && !is_strict()) // 5 byte - save 2 bits
					{ _State = (state_type)(*_Next1 & 0x03) | 4<<28; }
					else if((*_Next1 & 0xFE) == 0xFC && !is_strict()) // 6 byte - save 1 bit
					{ _State = (state_type)(*_Next1 & 0x01) | 5<<28; }
					else throw utf_error("Bad UTF-8 sequence");
				}

				if(!(_State & 0x70000000))
				{
					//write pending
					unsigned n(_State & 0x0FFFFFFF);
					if(n != 0)
					{
						if (n <= 0xFFFF)
						{
							if(is_strict() && n >= 0xD800 && n<= 0xDFFF)
								throw utf_error("Bad Unicode character - unexpected surrogate");
							//regulare wchar_t
							*_Next2 = (intern_type) n;
							_State = 0;
						}
						else
						{
							//surrogate
							n -= 0x10000;
							if(!(_State & 0x80000000)) //1st part
							{ *_Next2 = (intern_type) ((((n & 0xFFC00) >> 10) & 0x3FF) | 0xD800); _State |=0x80000000; --_Next1; }
							else // 2nd part
							{ *_Next2 = (intern_type) ((n & 0x3FF) | 0xDC00);  _State =0;}
						}
						++_Next2;
					}
				}
			}
			return (!_State)? ok: partial;
		}

		/// Encode UTF-8 characters decoding them from UTF-16
		virtual result do_out(state_type& state,
			const intern_type* _First1, const intern_type* _Last1, const intern_type*& _Next1,
			extern_type* _First2, extern_type* _Last2, extern_type*& _Next2) const
		{
			unsigned & _State = *(unsigned *)&state;
			for(_Next1 = _First1, _Next2 = _First2; _Next1 < _Last1 && _Next2 < _Last2;)
			{
				if(!(_State & 0x80000000)) //no "carry" in progress
				{
					if((*_Next1 & 0xFC00) == 0xDC00) //follower of a partial
					{
						_State <<= 10; _State |= (*_Next1 & 0x3FF);  _State += 0x10000;
						++_Next1;
					}
					else if((*_Next1 & 0xFC00) == 0xD800) //first of a partial
					{
						_State = (*_Next1 & 0x3FF);  ++_Next1;
						continue;
					}
					else if(!_State)
					{ _State = *_Next1;  ++_Next1; }
				}

				//now _State is an UCS to be written

				if(_State & 0x80000000) //carry from a partial write
				{
					do_unshift(state,_Next2,_Last2,_Next2);
				}
				else if(!(_State & 0xFFFFFF80)) //ASCII
				{
					*_Next2 = (char)((unsigned)_State & 0x7F); ++_Next2;
					_State = 0;
				}
				else if(!(_State & 0xFFFFF800)) //8 to 11 bit -> 5+6
				{
					*_Next2 = (char)((unsigned)_State>>6)&0x3F | 0xC0; ++_Next2;
					_State = _State & 0x3F | 0x80000000;
				}
				else if(!(_State & 0xFFFF0000)) //11 to 16 bits -> 4+6+6
				{
					if(_State >= 0xD800 && _State <= 0xDFFF) throw utf_error("Bad Unicode character");
					*_Next2 = (char)((unsigned)_State>>12)&0x0F | 0xE0; ++_Next2;
					_State = _State & 0x0FFF | 0x80000000;
				}
				else if(!(_State & 0xFFE00000)) //17 to 21 bits -> 3+6+6+6
				{
					*_Next2 = (char)((unsigned)_State>>18)&0x07 | 0xF0; ++_Next2;
					_State = _State & 0x3FFFF | 0x80000000;
				}
				else if(is_strict()) throw utf_error("bad character: outside Unicode space");
				else if(!(_State & 0xFC000000)) //22 to 26 bits -> 2+6+6+6+6
				{
					*_Next2 = (char)((unsigned)_State>>24)&0x03 | 0xF8; ++_Next2;
					_State = _State & 0xFFFFFF | 0x80000000;
				}
				else if(!(_State & 0xC0000000)) //27 to 31 bits ->1+6+6+6+6+6
				{
					*_Next2 = (char)((unsigned)_State>>30)&0x01 | 0xFC; ++_Next2;
					_State = _State & 0x3FFFFFFF | 0x80000000;
				}
				else throw utf_error("Bad Unicode character");
			}
			return (!_State)? ok: partial;
		}

		/// complete UTF-8 residual encoding after the end of UTF-16 sequence
		virtual result do_unshift(
			state_type& state,
			extern_type* _First2, extern_type* _Last2, extern_type*& _Next2) const
		{
			unsigned & _State = *(unsigned*)&state;
			_Next2 = _First2;
			while(_State & 0x80000000 && _Next2 < _Last2) //carry from a partial write
			{
				unsigned n = _State & 0x7FFFFFFF;
				/*6*/      if(n<=0x3F)   { *_Next2 = 0x80|(extern_type)n   ;  _State = 0; }
				/*12*/else if(n<=0xFFF) { *_Next2 = 0x80|(extern_type)(n>>6);  _State &= 0x8000003F; }
				/*18*/else if(n<=0x3FFFF) { *_Next2 = 0x80|(extern_type)(n>>12); _State &= 0x80000FFF; }
				/*24*/else if(n<=0xFFFFFF) { *_Next2 = 0x80|(extern_type)(n>>18); _State &= 0x8003FFFF; }
				/*30*/else if(n<=0x3FFFFFFF) { *_Next2 = 0x80|(extern_type)(n>>24); _State &= 0x80FFFFFF; }
				++_Next2;
			}
			return !_State? ok: partial;
		}

	};

	extern std::locale utf8_locale; ///< global locale with UTF-8 conversion capabilities.

}}

#endif
