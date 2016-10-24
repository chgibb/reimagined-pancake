import inputFile from "./inputFile";

declare var Plotly : any;
export default function refreshChart(div : string,inputs : Array<inputFile>,nerFilter? : RegExp) : void
{
    var averageSentimentData = 
    {
        x : <Array<string>>[],
        y : <Array<number>>[],
        type : "scatter"
    };
    var nerCountData : any;
    if(nerFilter)
    {
        nerCountData = 
        {
            x : <Array<string>>[],
            y : <Array<number>>[],
            type : "scatter"
        }
    }
    var data : Array<any>;
    if(nerFilter)
        data = <Array<any>>[averageSentimentData,nerCountData];
    else
        data = <Array<any>>[averageSentimentData];
    for(let i = 0; i != inputs.length; ++i)
    {
        data[0].x.push(inputs[i].json.date);
        data[0].y.push(inputs[i].json.sentimentAverage);

        if(nerFilter)
        {
            data[1].x.push(inputs[i].json.date);
            for(let k : number = 0; k != inputs[i].json.nerTags.length; ++k)
            {
                if(nerFilter.test(inputs[i].json.nerTags[k].token))
                {
                    data[1].y.push(inputs[i].json.nerTags[k].count);
                }
            }
        }
    }
    var layout = 
    {
        title: '',
        yaxis: {title: ''},
        yaxis2: 
        {
            title: '',
            titlefont: {color: 'rgb(148, 103, 189)'},
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
        }
    };

    Plotly.newPlot(div,data,layout);
}