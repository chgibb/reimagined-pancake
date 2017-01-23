npm install
git clone https://github.com/philsquared/catch
cp catch/single_include/catch.hpp src/inc
rm -rf catch
cd src
for d in */ ; do
    printf $d
    cd $d
    if [ -f "install.sh" ]; then
        sh install.sh
    fi
    cd ../
done
