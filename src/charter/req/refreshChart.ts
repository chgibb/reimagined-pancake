import inputFile from "./inputFile";

declare var Plotly : any;

interface plotlyDataSet
{
    x : Array<string>;
    y : Array<number>;
    type : string;
    name : string;
}
export default function refreshChart(div : string,inputs : Array<inputFile>,nerFilter? : string) : void
{
    var nerFilterRegExp : RegExp = new RegExp(nerFilter,"i");
    var averageSentimentData : plotlyDataSet = 
    {
        x : <Array<string>>[],
        y : <Array<number>>[],
        type : "scatter",
        name : "Average Sentiment For All Tweets"
    };
    var nerCountData : plotlyDataSet;
    var nerSentimentData : plotlyDataSet;
    if(nerFilter)
    {
        nerCountData = 
        {
            x : <Array<string>>[],
            y : <Array<number>>[],
            type : "scatter",
            name : "Mentions of "+nerFilter
        }
        nerSentimentData = 
        {
            x : <Array<string>>[],
            y : <Array<number>>[],
            type : "scatter",
            name : "Average Sentiment For Tweets Containing "+nerFilter
        }
    }
    var data : Array<plotlyDataSet>;
    if(nerFilter)
    {
        data = <Array<plotlyDataSet>>[averageSentimentData,nerCountData,nerSentimentData];
    }
    else
        data = <Array<plotlyDataSet>>[averageSentimentData];
    
    for(let i = 0; i != inputs.length; ++i)
    {
        data[0].x.push(inputs[i].json.date);
        data[0].y.push(inputs[i].json.sentimentAverage);
        let averageSentiment = 0;
        let consideredItemsForAverageSentiment = 0;
        let count = 0;
        if(nerFilter)
        {
            data[1].x.push(inputs[i].json.date);
            data[2].x.push(inputs[i].json.date);
            for(let k : number = 0; k != inputs[i].json.nerTags.length; ++k)
            {
                if(nerFilterRegExp.test(inputs[i].json.nerTags[k].token))
                {
                    console.log(inputs[i].json.nerTags[k].token);
                    count += inputs[i].json.nerTags[k].count;
                    averageSentiment += inputs[i].json.nerTags[k].sentimentAverage;
                    consideredItemsForAverageSentiment++;
                    //data[2].y.push(data[2].y + inputs[i].json.nerTags[k].sentimentAverage);
                }
            }
            data[1].y.push(count);
            data[2].y.push(averageSentiment/consideredItemsForAverageSentiment);
            
        }
    }
    var layout = 
    {
        title: '',
        yaxis: {title: 'Mentions'},
        yaxis2: 
        {
            title: 'Average Sentiment',
            titlefont: {color: 'rgb(148, 103, 189)'},
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
        }
    };

    Plotly.newPlot(div,data,layout);
}