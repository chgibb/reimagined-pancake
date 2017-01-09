#include <string>
#include <fstream>
class TagStorageEngine
{
    public:
        TagStorageEngine(){}
        ~TagStorageEngine(){}
        template<class Char>
        void setStorageDirectory(Char dir)
        {
            this->storageDirectory = dir;
        }
        bool storeTag(std::string&token,std::string&entity)
        {
            std::fstream* bucket = nullptr;
            std::string bucketHash = this->getBucketHash(token);
            bucket = this->getBucketByHash(bucketHash);
            if(bucket != nullptr)
            {
                if(!this->tagExists(token,bucket))
                {
                    bool res = this->writeTag(token,entity,bucket);
                    if(!res)
                    {
                        delete bucket;
                        return false;
                    }
                    return true;
                    delete bucket;
                }
            }
            return false;
        }
    private:
        std::string storageDirectory;
        std::string getBucketHash(std::string&token)
        {
            std::string res = this->storageDirectory;
            res += "/";
            if(token.size() >= 3)
                return res + token[0] + token[1] + token[2];
            if(token.size() >= 2)
                return res + token[0] + token[1];
            if(token.size() >= 1)
                return res + token[0];
            return "";
        }
        std::fstream* getBucketByHash(std::string&bucketHash)
        {
            std::fstream* bucket = new std::fstream(bucketHash.c_str(),std::ios::in|std::ios::out|std::ios::app);
            return bucket;
        }
        bool tagExists(std::string&token,std::fstream*bucket)
        {
            return false;
        }
        bool writeTag(std::string&token,std::string&entity,std::fstream*bucket)
        {
            if(bucket->good())
            {
                (*bucket)<<"{\"token\":\""<<token<<"\",\"entity\":\""<<entity<<"\"}"<<std::endl
                bucket->close();
                return true;
            }
            return false;
        }

};