cd src
for d in */ ; do
	printf $d
	cd $d
	npm install
	cd ../
done
