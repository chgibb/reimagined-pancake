sh clean.sh
rm -rf node_modules
cd src
for d in */ ; do
    cd $d
    if [ -f "clean.sh" ]; then
        sh clean.sh
    fi
    cd ../
done
