interface lineChartSettings
{
    label : string,
    fill : boolean,
    lineTension : number;
    backgroundColor : string;
    borderColor : string;
    borderCapStyle : string;
    borderDashOffset : number;
    borderJoinStyle : string;
    pointBorderColor : string;
    pointBackgroundColor : string;
    pointBorderWidth : number;
    pointHoverRadius : number;
    pointHoverBackgroundColor : string;
    pointHoverBorderColor : string;
    pointHoverBorderWidth : number;
    pointRadius : number;
    pointHitRadius : number;
    data : Array<number>;
    spanGaps : boolean;
}
export default function createDefaultLineChartSettings(data? : Array<number>) : lineChartSettings
{
    var res : lineChartSettings = 
    {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,
        spanGaps: false,
    }
    return res;
}