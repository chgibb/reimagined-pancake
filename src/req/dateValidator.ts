class valDate
{
    dMonth : number;
    dDay : number;
    dYear : number;
    daysInMonth : Array<number>;
    constructor(m : number,d : number,y : number)
    {
        this.daysInMonth = 
        [
            0,
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        this.setDate(m,d,y);
    }
    setMonth(m : number) : void
    {
        this.dMonth = this.valMonth(m);
    }
    setDay(d : number) : void
    {
        this.dDay = this.valDay(this.dMonth,d);
    }
    setYear(y : number) : void
    {
        this.dYear = this.valYear(y);
    }
    setDate(m : number,d : number,y : number) : void
    {
        this.dYear = this.valYear(y);
        this.dMonth = this.valMonth(m);
        this.dDay = this.valDay(this.dMonth,d);
    }
    valYear(m : number) : number
    {
        if(m > 12)
            m = 12;
        if(m < 0)
            m = 1;
        return m;
    }
    valMonth(m : number) : number
    {
        if(m > 12)
            m = 12;
        if(m < 0)
            m = 1;
        return m;
    }
    valDay(m : number,d : number) : number
    {
        if(d < 0)
            d = 1;
        if(d > 31)
            d = 31;
        if(d > 28 && m ==2)
        {
            if(this.isLeapYear())
                d = 29;
            else
                d = 28;
        }
        return d;
    }
    isLeapYear() : boolean
    {
        if((this.dYear % 4 ) == 0)
        {
            if((this.dYear % 100 ) == 0)
            {
                if((this.dYear % 400 ) == 0)
                    return true;
                else
                    return false;
            }
            else
                return true;
        }
        else
            return false;
    }
}
export default valDate;