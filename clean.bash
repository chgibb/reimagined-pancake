rm -r dep/*.js
rm -r dep/*.jar
rm -r dep/*.json
rm -r dep/*.html
rm -r dep/*.sh
rm dep/*.so
rm dep/*.bash
rm dep/genListing
rm dep/tagApplicator

rm -r dep/public/*
rmdir dep/public
#rm -r dep/classifiers/*
#rmdir dep/classifiers
rm -r dep/scripts/*
rmdir dep/scripts

cd src
for d in */ ; do
    cd $d
    if [ -f "clean.sh" ]; then
        sh clean.sh
    fi
    if [ -f "clean.bash" ]; then
        bash clean.bash
    fi
    cd ../
done
