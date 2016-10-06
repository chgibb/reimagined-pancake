function insertLeadingPaddingToSize(str : string, digits : number,padChar : string) : string
{
    if(str.length == digits)
        return str;
    if(!digits || digits == 0)
        return "";
    var res : string = "";
    var zeroesToAdd : number = digits - str.length;
    for(let i : number = 0; i != zeroesToAdd; ++i)
        res += padChar;
    res += str;
    return res;
}
export default insertLeadingPaddingToSize;