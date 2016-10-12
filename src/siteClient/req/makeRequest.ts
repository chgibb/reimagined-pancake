export interface requestParams
{
    dataPoint : string;
    tagFilter? : string;
    filterType? : string;
    year? : string;
    month? : string;
    day? : string;
    hour? : string;
    minute? : string;
}
export function makeRequest(params : requestParams,callBack : (response : string,params : requestParams) => void) : void
{
    var http : XMLHttpRequest = new XMLHttpRequest();
    var queryString : string = "/api/search?";
    queryString += "dataPoint="+params.dataPoint+"\u0026";
    if(params.tagFilter)
        queryString += "tagFilter="+params.tagFilter+"\u0026";
    if(params.filterType)
        queryString += "filterType="+params.filterType+"\u0026";
    if(params.year)
        queryString += "year="+params.year+"\u0026";
    if(params.month)
        queryString += "month="+params.month+"\u0026";
    if(params.day)
        queryString += "day="+params.day+"\u0026";
    if(params.hour)
        queryString += "hour="+params.hour+"\u0026";
    if(params.minute)
        queryString += "minute="+params.minute+"\u0026";
    queryString = queryString.substr(0,queryString.length-1);
    http.open("GET", queryString, true);
    http.onreadystatechange = function()
    {
        if(http.readyState == 4 && http.status == 200)
        {
            callBack(http.responseText,params);
        }
        else if(http.status != 200)
        {
            var msg : string = "Request to server failed!\n";
            msg += "readyState: "+http.readyState+"\n";
            msg += "status: "+http.status+"\n";
            msg += "responseText: "+http.responseText+"\n";
            alert(msg);
            console.log(msg);
        }
    }
    http.send(null);
}