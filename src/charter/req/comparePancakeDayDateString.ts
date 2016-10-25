interface monthsIndex
{
    [index : string] : number;
}
let months : monthsIndex =
{
    dummy : 0,
    Jan : 1,
    Feb : 2,
    Mar : 3,
    Apr : 4,
    May : 5,
    Jun : 6,
    Jul : 7,
    Aug : 8,
    Sep : 9,
    Oct : 10,
    Nov : 11,
    Dec : 12
}
export default function comparePancakgeDayDateString(lhs : string,rhs : string) : number
{
    let lTokens : Array<string> = lhs.split("-");
    let rTokens : Array<string> = rhs.split("-");
    if(lTokens[0] < rTokens[0])
        return 1;
     if(lTokens[0] > rTokens[0])
        return -1;
    if(months[lTokens[1]] < months[rTokens[1]])
        return 1;
    if(months[lTokens[1]] > months[rTokens[1]])
        return -1;
    if(lTokens[2] < rTokens[2])
        return 1;
    if(lTokens[2] > rTokens[2])
        return -1;
    return 0;
}