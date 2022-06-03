import { Component } from "react";
import { type ReactNode } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

interface StatPoint{
    name: ("sleep" | "education" | "happiness" | "health");
    amount: number;
}

interface Achievement{
    name: string;
    description: string;
}

interface Activity{
    name: string;
    hoursUsed: number;
    minutesUsed: number;
    point: {
        sleep: number;
        education: number;
        health: number;
        happiness: number;
    }
}

interface EvaluationProps {
    characterName: string;
    characterUrl: string;
    characterProdi: string;

    stat: StatPoint[];
    trackActivity: (Activity | string)[];
    DATA_Achievements: Achievement[];
    restartGame: () => void;
}

interface EvaluationState {
    achievements: Achievement[];

    activityCount: number;
    switchPlaceCount: number;
}

class Evaluation 
extends Component<EvaluationProps, EvaluationState> {
    constructor(props: EvaluationProps) {
        super(props);

        this.state = {
            achievements: [],
            activityCount: 0,
            switchPlaceCount: 0,
        }
    }

    componentDidMount(){
        this.createAchievements();
    }

    findAchievement = (name: string): Achievement|undefined => {
        return this.props.DATA_Achievements.find(
            (achievement: Achievement) => achievement.name === name
        );
    }

    addAchievement = () => {
        if(!this.props.trackActivity.find(activity => typeof activity !== "string")){
            const achievement = this.findAchievement("Home Stuck");
            if(achievement)
                this.setState({
                    achievements: [...this.state.achievements, achievement]
                })
        }
        // else if(this.props.trackActivity.filter(activity => {typeof activity !== "string" && activity.name === "Sleep"}).length >= 20){
        //     const achievement = this.findAchievement("Dreamer");
        //     if(achievement)
        //         this.setState({
        //             achievements: [...this.state.achievements, achievement]
        //         })
        // }
    }

    createAchievements = () => {
        console.log(this.props.trackActivity);

        this.props.trackActivity.forEach(activity => {
            if(typeof activity != "string"){
                this.setState({
                    activityCount: this.state.activityCount + 1,
                })
            }
            else{
                this.setState({
                    switchPlaceCount: this.state.switchPlaceCount + 1
                })
            }
        })
    }

    render(): ReactNode{
        const achievements = this.state.achievements.map(achievement => {
            return (
                <div className="border border-primary rounded-2 bg-primary mx-2 px-2">
                    <div className="">
                        <span className="fw-bolder">{achievement.name}</span>
                    </div>
                    <div className="">{achievement.description}</div>
                </div>
            )
        })

        return (
        <main>
            <div className="d-flex justify-content-center">
                <h1 className="te-de-text-decoration-underline">Evaluation</h1>
            </div>
            <div className="d-flex gap-2 p-2" style={{height: "70vh"}}>
                <div className="w-25 h-50 border border-dark">
                    <div className="d-flex justify-content-center border border-dark">
                        {this.props.characterName}
                    </div>
                    <div className="d-flex justify-content-center p-1 h-100 w-100">
                        <img src={this.props.characterUrl} className="align-self-center w-100" alt=""/>
                    </div>
                </div>
                <div className="w-100 overflow-scroll">
                    <div className="d-flex justify-content-center">
                        <h3>Achievement Obtained:</h3>
                    </div>

                    <div className="d-flex flex-column gap-1" id="achievements">
                        {achievements}
                    </div>
                    <div className="d-flex justify-content-center my-2">
                        <h3>Evaluation:</h3>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Link to="/" onClick={this.props.restartGame}>
                    <Button variant="outline-primary" className="px-3">Play Again</Button>
                </Link>
            </div>
        </main>
        );
    }
}

export default Evaluation;