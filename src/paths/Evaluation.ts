import { Component } from "react";
import { type ReactNode } from "react";

interface StatPoint{
    name: "sleep" | "education" | "happiness" | "health",
    amount: number,
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
    characterImage: string;
    characterProdi: string;

    stat: StatPoint[];
    trackActivity: (Activity | string)[];
}

interface EvaluationState {

}

class Evaluation extends Component<EvaluationProps, EvaluationState> {
    constructor(props: EvaluationProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            null
        );
    }
}

export default Evaluation;