export default function checkDateFilterOnBinPath(binPath : string,year? : string, month? : string,day? : string,hour? : string,minute? : string) : boolean
{
    /*console.log("binPath : "+typeof binPath+" = "+binPath);
    console.log("year : "+typeof year+" = "+year);
    console.log("month : "+typeof month+" = "+month);
    console.log("hour : "+typeof hour+" = "+hour);
    console.log("minute : "+typeof minute+" = "+minute);*/
    if(!year && !month && !day && !hour && !minute)
        return true;
    else
    {
        var pathParts : Array<string> = binPath.split('/');
        if(year && year !== undefined)
        {
            if(pathParts[1] != year)
            {
                //console.log("\nno match for year on "+binPath);
                //console.log("\n year is: \""+year+"\" type is "+typeof year);
                return false;
            }
        }
        if(month && month !== undefined)
        {
            if(pathParts[2] != month)
            {
                //console.log("\nno match for month on "+binPath);
                //console.log("\n month is: \""+month+"\" type is "+typeof month);
                return false;
            }
        }
        if(day && day !== undefined)
        {
            if(pathParts[3] != day)
            {
                //console.log("\nno match for day on "+binPath);
                //console.log("\n day is: \""+day+"\" type is "+typeof day);
                return false;
            }
        }
        if(hour && hour !== undefined)
        {
            if(pathParts[4] != hour)
            {
                //console.log("\nno match for hour on "+binPath);
                //console.log("\n hour is: \""+hour+"\ type is "+typeof hour);
                return false;
            }
        }
        if(minute && minute !== undefined)
        {
            if(pathParts[5] != minute)
            {
                //console.log("\nno match for hour on "+binPath);
                //console.log("\n minute is: \""+minute+"\" type is "+typeof minute);
                return false;
            }
        }
        return true;

    }
}