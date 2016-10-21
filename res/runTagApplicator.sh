bins=$(./scripts/getBinNames.bash data)

node --max_old_space_size=11000 tagApplicator $bins

