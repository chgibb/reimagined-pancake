if [[ "$OSTYPE" == "linux-gnu" ]]; then
    charter="src/charter/charter-linux-x64"
    artifact="pancake-linux-x64.tar.gz"
fi

cp -R -v $charter dep
cd dep

tar -zcvf $artifact --exclude=*.tar.gz *

mv $artifact ../