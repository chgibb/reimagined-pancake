COUNTER=0
while [ $COUNTER -lt 10 ]; do
	node --max_old_space_size=11000 binTagScheduler --dataDir=data --threads=1 --iterations=1
	let COUNTER=COUNTER+1
done

