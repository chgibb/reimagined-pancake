(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

git clone https://github.com/chgibb/stanford-ner
cd stanford-ner
find . -name "*.java" -type f | awk '{print substr($1,3);}' > srcs
javac -d . @srcs
rm srcs
find . -name "*.java" -type f -delete
cp -R edu ../
cd ../
rm -rf stanford-ner
rmdir stanford-ner

