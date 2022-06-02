import { Component } from "react";

const dayList: ("Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu")[]
        = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

interface TimeDisplayProps {
    characterName: string;

    hour: number;
    minute: number;
    day: number;

    hourToAdd: number;
    minuteToAdd: number;
}

interface TimeDisplayState {
    isConfirming: boolean;
}

class TimeDisplay extends Component<TimeDisplayProps, TimeDisplayState> {
    constructor(props: TimeDisplayProps){
        super(props);

        this.state = {
            isConfirming: this.props.hourToAdd !== 0 || this.props.minuteToAdd !== 0
        }
    }

    getGreeting = (hour: number, minute?: number) => {
        if(hour >= 5 && hour < 12)
            return "Selamat Pagi";
        else if(hour >= 12 && hour < 15)
            return "Selamat Siang";
        else if(hour >= 15 && hour < 18)
            return "Selamat Sore";
        else
            return "Selamat Malam";
    }

    render(){
        let minute = this.props.minute + this.props.minuteToAdd;
        let hour = this.props.hour + this.props.hourToAdd;
        if(minute >= 60) ++hour;

        let day = this.props.day;
        if(hour >= 24) ++day;

        let greeting = this.getGreeting(this.props.hour, this.props.minute);

        return (
        <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
                <h3>
                    {this.props.day === day ? dayList[day] : <span className="text-primary">{dayList[day]}</span>} 
                    - 
                    {this.props.hour === hour ? hour % 24: <span className="text-primary">{hour % 24}</span>}
                    :
                    {this.props.minute === minute ? minute % 60: <span className="text-primary">{minute % 60}</span>}
                </h3>
            </div>
            <div className="d-flex justify-content-center">
                <h5>{greeting} {`${this.props.characterName}`}</h5>
            </div>
        </div>)
    }
}

export default TimeDisplay;