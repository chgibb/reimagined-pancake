npm install
cd src
for d in */ ; do
    printf $d
    cd $d
    if [ -f "install.sh" ]; then
        sh install.sh
    fi
    cd ../
done
