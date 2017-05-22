(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

bash clean.bash
rm -rf node_modules
rm src/inc/catch.hpp
cd src
for d in */ ; do
    cd $d
    if [ -f "cleanDeps.sh" ]; then
        sh cleanDeps.sh
    fi
    cd ../
done
