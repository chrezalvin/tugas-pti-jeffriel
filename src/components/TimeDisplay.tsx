import { Component } from "react";

const HARI: ("Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu")[]
        = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

interface TimeDisplayProps {
    beingConfirmed?: boolean;
}

interface TimeDisplayState {
    day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
    hour: number;
    minute: number;
}

class TimeDisplay extends Component<TimeDisplayProps, TimeDisplayState> {
    constructor(props: TimeDisplayProps){
        super(props);
    }

    render(){
        if(this.props.beingConfirmed){
            return (
                <h3>
                    {this.state.day} - {this.state.hour}:{this.state.minute}
                </h3>
            );
        }
    }
}

export default TimeDisplay;