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

git clone https://github.com/chgibb/jna
cd jna/src/com/sun/jna
find . -name "*.java" -type f | awk '{print substr($1,3);}' > srcs
javac -d . @srcs
rm srcs
cd ../
cd ../
cd ../
cd ../
cd ../
mkdir com
cp -R jna/src/com/sun/jna/com/* com
rm -rf jna
rmdir jna
