for d in src/*/ ; do
	printf $d
	cd $d
	npm install
	cd ../
done
