import { Component } from "react";
import { type ReactNode, MouseEventHandler} from "react";

import {Places as DATA_Place, characters as DATA_characters} from "../data";
import {Button} from "react-bootstrap";

import Stat from '../components/Stat'

const iconsPath = `${process.env.PUBLIC_URL}/assets/icons`;
const charactersPath = `${process.env.PUBLIC_URL}/assets/characters`;

interface Place {
    name: string;
    iconUrl?: string;
    activities: Activity[];
}

interface Activity{
    name: string;
    hoursUsed: number;
    minutesUsed?: number;
    point: {
        sleep: number;
        education: number;
        health: number;
        happiness: number;
    }
}

interface GameProps{
    characterName: string;
    characterIndex: number;
}

interface StatPoint{
    name: "sleep" | "education" | "happiness" | "health",
    amount: number,
}

interface Time{
    day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu",
    hour: number,
    minute: number,
}

interface GameState{
    selectedPlace: Place;
    time: Time;
    confirming: boolean;
    activityBeingConfirmed: Activity;

    stats: StatPoint[];
}

class Game extends Component<GameProps, GameState> {
    constructor(props: GameProps){
        super(props);

        this.state = {
            selectedPlace: DATA_Place[0],
            time: {
                day: "Senin",
                hour: 12,
                minute: 0
            },
            confirming: false,
            activityBeingConfirmed: {
                name: "",
                hoursUsed: 0,
                point: {
                    sleep: 0,
                    education: 0,
                    health: 0,
                    happiness: 0
                }
            },
            stats: [
                {
                    name: "sleep",
                    amount: 5,
                },
                {
                    name: "education",
                    amount: 0,
                },
                {
                    name: "health",
                    amount: 5,
                },
                {
                    name: "happiness",
                    amount: 5,
                }
            ]
        }
    }

    resetConfirmation = () => {
        this.setState({
            confirming: false,
            activityBeingConfirmed: {
                name: "",
                hoursUsed: 0,
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
        let placeToGo = DATA_Place.find(place => {
            return place.name === e.currentTarget.value;
        }) 
        ?? DATA_Place[0]; // just in case it's undefined
    
        this.setState({selectedPlace: placeToGo});
    }
    
    handleActivityOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        this.setState({
            confirming: true,
            activityBeingConfirmed: {
                ...this.state.activityBeingConfirmed,
                name: e.currentTarget.value,
            }
        });

        // e.currentTarget.innerText = 
    }

    confirmActivity = (activity: Activity) => {
        return;
    }

    doActivity = (statChange: {
        sleep: number,
        education: number,
        health: number,
        happiness: number
    }) => {
        return;
    }

    handleActivityOnConfirm = () => {
        this.setState({
            stats: this.state.stats.map(stat => {
                const calculateStat = stat.amount + this.state.activityBeingConfirmed.point[stat.name]
                return {
                    ...stat, 
                    amount: Math.min(calculateStat, 10)
                };
            })
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
        const Places = DATA_Place.map(place => {
            return (
            <button
                className="btn btn-warning fw-bold" 
                value={place.name}
                disabled={this.state.confirming && this.state.activityBeingConfirmed.name !== place.name}
                onClick={this.handleChangePlaceOnClick}
                >
                {place.name}
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

                                    console.log('hello');

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

        const Time: ReactNode = (() => {
            const greeting = this.state.time.hour < 12 ? "Selamat Pagi" : "Selamat Siang";
            return (
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                    <h3>{this.state.time.day} - {this.state.time.hour}:{this.state.time.minute}</h3>
                </div>
                <div className="d-flex justify-content-center">
                    <h5>{greeting} {`${this.props.characterName}`}</h5>
                </div>
            </div>)
        })()

        return (
            <main>
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
                    <div className="bg-dark w-100 h-100" id="news"></div> 
                </div>
                <div className="d-flex flex-column w-50">
                    <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center">
                            <h3>Selasa - 9:43</h3>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h5>Good Morning {`${this.props.characterName}`}</h5>
                        </div>
                    </div>
                    <div className="w-100 h-100">
                        <img 
                            className="p-4 w-100 h-100" 
                            src={`${charactersPath}/${DATA_characters[this.props.characterIndex]}`} 
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