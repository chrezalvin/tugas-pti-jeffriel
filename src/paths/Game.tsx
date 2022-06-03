import { Component } from "react";
import { type ReactNode, MouseEventHandler} from "react";

import { Link } from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

import Stat from '../components/Stat'
import News from '../components/News'
import TimeDisplay from '../components/TimeDisplay'

const iconsPath = `${process.env.PUBLIC_URL}/assets/icons`;
const dayList: ("Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu")[]
            = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

interface Place {
    name: string;
    activities: Activity[];
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

interface GameProps{
    characterName: string;
    characterUrl: string;
    DATA_Place: Place[];
    defaultStat: StatPoint[];
    gameOver: (finalStat: StatPoint[], trackedActivity: (Activity | string)[]) => void;
}

interface StatPoint{
    name: "sleep" | "education" | "happiness" | "health",
    amount: number,
}

interface Time{
    day: number,
    hour: number,
    minute: number,
}

interface GameState{
    selectedPlace: Place;
    time: Time;
    confirming: boolean;
    activityBeingConfirmed: Activity;

    stats: StatPoint[];
    trackActivity: (Activity | string)[];
    gameOver: boolean;
}

class Game extends Component<GameProps, GameState> {
    constructor(props: GameProps){
        super(props);

        this.state = {
            selectedPlace: this.props.DATA_Place[0],
            time: {
                day: 0,
                hour: 0,
                minute: 0
            },
            confirming: false,
            activityBeingConfirmed: {
                name: "",
                hoursUsed: 0,
                minutesUsed: 0,
                point: {
                    sleep: 0,
                    education: 0,
                    health: 0,
                    happiness: 0
                }
            },
            stats: this.props.defaultStat,
            trackActivity: [],
            gameOver: false
        }
    }

    componentDidUpdate(prevProps: GameProps, prevState: GameState){
        // check for state change for hours and minute
        if(this.state.time.day > dayList.length - 1 && !this.state.gameOver){
            // trigger game over
            this.props.gameOver(this.state.stats, this.state.trackActivity);
            this.setState({gameOver: true});
        }
    }

    resetConfirmation = () => {
        this.setState({
            confirming: false,
            activityBeingConfirmed: {
                name: "",
                hoursUsed: 0,
                minutesUsed: 0,
                point: {
                    sleep: 0,
                    education: 0,
                    health: 0,
                    happiness: 0
                }
            },
        })
    }

    handleChangePlaceOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        let placeToGo = this.props.DATA_Place.find(place => {
            return place.name === e.currentTarget.value;
        }) 
        ?? this.props.DATA_Place[0]; // just in case it's undefined
        
        this.setState(
            {
                selectedPlace: placeToGo,
                trackActivity: [...this.state.trackActivity, placeToGo.name]
            });
    }
    
    handleActivityOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        this.setState({
            confirming: true,
            activityBeingConfirmed: {
                ...this.state.activityBeingConfirmed,
                name: e.currentTarget.value,
            }
        });
    }

    handleActivityOnConfirm = () => {
        let minute = this.state.time.minute + 
                    this.state.activityBeingConfirmed.minutesUsed;
        let hour =  this.state.time.hour + 
                    this.state.activityBeingConfirmed.hoursUsed + 
                    Math.floor(minute / 60);
        let day =   this.state.time.day + 
                    Math.floor((this.state.time.hour + 
                    this.state.activityBeingConfirmed.hoursUsed) / 24);

        this.setState({
            stats: this.state.stats.map(stat => {
                const calculateStat = stat.amount + this.state.activityBeingConfirmed.point[stat.name]
                return {
                    ...stat, 
                    amount: Math.min(calculateStat, 10)
                };
            }),
            time: {
                hour: (hour) % 24,
                minute: (minute) % 60,
                day: day,
            },
            trackActivity: [...this.state.trackActivity, 
                            this.state.activityBeingConfirmed],
        });

        this.resetConfirmation();
    }


    handleActivityOnCancel = () => {
        this.resetConfirmation();
    }

    changeToConfirmingState = (activity: Activity) => {
        this.setState({
            confirming: true,
            activityBeingConfirmed: activity,

        });
    }

    render(): ReactNode {
        const Places = this.props.DATA_Place.map(place => {
            // requirement for places
            let closed = false;
            switch(place.name){
                case "Kampus": {
                    // disabled at 18pm - 6am
                    closed = this.state.time.hour >= 18 || 
                            this.state.time.hour < 6 ||
                            dayList[this.state.time.day] === "Minggu";
                    break;
                }
                case "Cafe": {
                    // disabled at 12pm - 8am
                    closed = (this.state.time.hour >= 12 || this.state.time.hour < 8);
                    break;
                }
                case "Supermarket": {
                    // disabled at 23pm - 4am
                    closed = (this.state.time.hour >= 23 || this.state.time.hour < 4);
                    break;
                }

                default: break;
            }

            return (
            <button
                className="btn btn-warning fw-bold" 
                value={place.name}
                disabled=   {(this.state.confirming && this.state.activityBeingConfirmed.name !== place.name) 
                            || closed 
                            || this.state.selectedPlace.name === place.name}
                onClick={this.handleChangePlaceOnClick}
                >
                {`${place.name} ${closed ? "(closed)" : ""}`}
            </button>
            )
        });

        const activities = this.state.selectedPlace.activities.map(activity => {
            if(this.state.activityBeingConfirmed.name === activity.name){
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
            else {
                // check if other activity is confirming
                // check if the stat is not enough to do the activity
                const checkDisabled = (this.state.confirming && 
                                    this.state.activityBeingConfirmed.name !== activity.name) ||
                                    this.state.stats.find(stat => {return (stat.amount + activity.point[stat.name]) <= 0}) !== undefined;

                return (<Button 
                variant="warning"
                value={activity.name}
                disabled={checkDisabled}
                onClick={(e) => {
                    this.handleActivityOnClick(e);
                    this.changeToConfirmingState(activity);
                }}
                >
                <strong> {activity.name} </strong>
            </Button>
            )}
        });

        const Stats = this.state.stats.map(stat => {
            const PointAddorSubtract = this.state.activityBeingConfirmed.point[stat.name];
            return (
            <Stat 
                key={stat.name}
                name={stat.name}
                amount={stat.amount}
                amountToAdd={PointAddorSubtract > 0 ? PointAddorSubtract: 0}
                amountToSubtract={PointAddorSubtract < 0 ? -PointAddorSubtract: 0}
                iconUrl={`${iconsPath}/stat-${stat.name}.svg`}
            />)
        });

        const gameOverModal = (
            <Modal show={this.state.gameOver}>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title>
                        <h2>Game Over</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>You have reached the end of the game</h5>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Link to="/evaluation">
                        <Button variant="primary">
                            go to Evaluation
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
                    );

        return (
            <main>
                {gameOverModal}
            <div className="d-flex" id="stats" style={{height: "5vh"}}>
                {Stats}
            </div>
            <div className="d-flex p-2" id="gameScreen" style={{height: "70vh"}}>
                <div className="d-flex flex-column tab w-25">
                    <div className="d-flex flex-column gap-1 p-1" id="gotoList">
                        <div className="d-flex justify-content-center">
                            <h3>GO TO</h3>
                        </div>
                        {Places}
                    </div>
                    <div className="w-100 h-100" id="news">
                        <News />
                    </div> 
                </div>
                <div className="d-flex flex-column w-50">
                    <div className="d-flex flex-column justify-content-center">
                        <TimeDisplay
                            characterName={this.props.characterName}
                            day={this.state.time.day}
                            hour={this.state.time.hour}
                            minute={this.state.time.minute}
                            hourToAdd={this.state.activityBeingConfirmed.hoursUsed}
                            minuteToAdd={this.state.activityBeingConfirmed.minutesUsed}
                        />
                    </div>
                    <div className="w-100 h-100">
                        <img 
                            className="p-4 w-100 h-100" 
                            src={`${this.props.characterUrl}`} 
                            style={{maxHeight: "50vh"}}
                            alt={`${this.props.characterName} avatar`}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column w-25">
                    <div className="p-1 d-flex flex-column" id="atList">
                        <div className="d-flex justify-content-center">
                            <h2>At {this.state.selectedPlace.name}</h2>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-1 gap-2">
                        {activities}
                    </div>
                </div>
            </div>
        </main>
    )
    }
}

export default Game;