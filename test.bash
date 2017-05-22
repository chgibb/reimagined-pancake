(set -o igncr) 2>/dev/null && set -o igncr;
cd src
for d in */ ; do
    cd $d
    if [ -f "test.sh" ]; then
        sh test.sh
    fi
    if [ -f "test.bash" ]; then
        bash test.bash
    fi
    if [ $? != 0 ]; then
        cd ../
        cd ../
        bash clean.bash
        exit 1
    fi
    cd ../
done
