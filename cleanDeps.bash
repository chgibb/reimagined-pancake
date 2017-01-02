bash clean.bash
rm -rf node_modules
cd src
for d in */ ; do
    cd $d
    if [ -f "cleanDeps.sh" ]; then
        sh cleanDeps.sh
    fi
    cd ../
done
