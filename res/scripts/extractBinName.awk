#!/usr/bin/awk -f
{
	gsub(/:/,"");
	gsub(/"items" \[/,"");
	gsub(/ /,"");
	print $1;
}
