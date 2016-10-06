#pragma once
#include <vector>
#include <string>
#include <functional>
template<class T>
class streamToArray
{
    public:
        std::vector<T> arr;
        streamToArray&operator<<(T rhs)
        {
            this->arr.push_back(rhs);
            return *this;
        }
};
