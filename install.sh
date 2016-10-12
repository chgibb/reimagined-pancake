for d in src/*/ ; do
	cd $d
	npm install
	cd ../
done
