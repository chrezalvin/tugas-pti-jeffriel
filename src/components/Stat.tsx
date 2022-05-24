import { Component } from "react";
import {type ReactNode} from "react";

interface StatProp{
    iconUrl: string;
}

interface StatState{
    barRemaining: number;

}

class Stat extends Component<StatProp, StatState> {
    constructor(prop: StatProp){
        super(prop);

        this.state = {barRemaining: 10};
    }

    createStatBars = (amount?: number) => {
        const bar = (<div className="bg-success" style={{width: "calc(10% - 1px)"}}></div>);
        let bars: ReactNode[] = [];
        if(amount)
            for(let iii = 0; iii < amount; ++iii)
                bars.push(bar);
        else
            for(let iii = 0; iii < this.state.barRemaining; ++iii)
                    bars.push(bar);
        
        return bars
    }

    render(): ReactNode{
        return (
        <div className="w-100 d-flex ">
            <div className="h-100">
                <img className="h-100" src={this.props.iconUrl} alt=""/>
            </div>
            <div className="d-flex w-100" style={{gap: "1px"}}>
                {this.createStatBars()}
            </div>
        </div>
        );
    }
}

export default  Stat;