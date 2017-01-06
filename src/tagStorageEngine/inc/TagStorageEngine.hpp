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
                        return false;
                }
            }
            return true;
        }
    private:
        std::string storageDirectory;
        std::string getBucketHash(std::string&token)
        {
            return "";
        }
        std::fstream* getBucketByHash(std::string&bucketHash)
        {
            std::fstream* bucket = new std::fstream("",std::ios::in|std::ios::out);
            return bucket;
        }
        bool tagExists(std::string&token,std::fstream*bucket)
        {
            return false;
        }
        bool writeTag(std::string&token,std::string&entity,std::fstream*bucket)
        {
            return true;
        }

};