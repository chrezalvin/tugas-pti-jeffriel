import { Component } from "react";
import { type ReactNode } from "react";

import {Button} from "react-bootstrap";

interface ActivityProps{
    beingConfirmed?: boolean;
    name: string,
    point: {
        sleep: number;
        education: number;
        health: number;
        happiness: number;
    };

    modifyStat: (point: {
        sleep: number;
        education: number;
        health: number;
        happiness: number;
    }) => void;
}

interface ActivityState{

}

class Activity extends Component<ActivityProps, ActivityState>{
    constructor(props: ActivityProps){
        super(props);
    }

    handleActivityOnConfirm = () => {

    }

    handleActivityOnCancel = () => {

    }

    render(): ReactNode{
        // if(this.state.being)

        return (
            <div className="d-flex">
            <Button 
                onClick={this.handleActivityOnConfirm} 
                className="w-50 rounded-0" 
                variant="success"
            >
                Confirm
            </Button>
            <Button 
                onClick={this.handleActivityOnCancel} 
                className="w-50 rounded-0" 
                variant="danger"
            >
                Cancel
            </Button>
        </div>
        )
    }
}