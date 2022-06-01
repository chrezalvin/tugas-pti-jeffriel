import { Component } from "react";
import {type ReactNode} from "react";

const STAT_MAX = 10;

interface StatProp{
    name: string;
    iconUrl: string;
    amount: number;
    amountToAdd: number;
    amountToSubtract: number;
    // addStat: (amount: number) => void;
    // reduceStat: (amount: number) => void;
}

interface StatState{
    barRemaining: number;
    toBeRemoved?: number;
}

class Stat extends Component<StatProp, StatState> {
    constructor(prop: StatProp){
        super(prop);

        let statAmount = STAT_MAX;
        if(this.props.amount != undefined && this.props.amount > 0)
            statAmount = this.props.amount;

        this.state = {barRemaining: statAmount, toBeRemoved: 0};
    }

    addStat = (amount: number) => {
        if(amount < 0) throw new Error("the amount of stat added cannot be negative!");

        if(this.state.barRemaining + amount > STAT_MAX)
            this.setState({barRemaining: STAT_MAX});
        else
            this.setState({barRemaining: this.state.barRemaining + amount});
    }

    reduceStat = (amount: number) => {
        if(amount < 0) throw new Error("the amount of stat reduced cannot be negative!");

        if(this.state.barRemaining - amount < 0)
            this.setState({barRemaining: 0});
        else
            this.setState({barRemaining: this.state.barRemaining - amount});
    }

    createStatBars = () => {
        const greenBar = (<div className="bg-success" style={{width: "calc(10% - 1px)"}}></div>);
        const redBar = (<div className="bg-danger" style={{width: "calc(10% - 1px)"}}></div>);
        const blueBar = (<div className="bg-primary" style={{width: "calc(10% - 1px)"}}></div>);

        let bars: ReactNode[] = [];
        for(let iii = 0; iii < this.props.amount && iii < 10; ++iii){
            if(iii >= this.props.amount - this.props.amountToSubtract)
                bars.push(redBar);
            else
                bars.push(greenBar);
        }

        // adding to be added bars
        for(let iii = 0; iii < this.props.amountToAdd && iii + this.props.amount < 10; ++iii){
            bars.push(blueBar);
        }
        
        return bars
    }

    render(): ReactNode{
        return (
        <div className="w-100 d-flex ">
            <div className="h-100">
                <img 
                    className="h-100" 
                    src={this.props.iconUrl} 
                    alt={this.props.name}
                />
            </div>
            <div className="d-flex w-100" style={{gap: "1px"}}>
                {this.createStatBars()}
            </div>
        </div>
        );
    }
}

export default  Stat;