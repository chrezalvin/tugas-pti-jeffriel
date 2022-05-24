import { Component, ReactNode } from "react";
import { type MouseEventHandler } from "react";

const iconsPath = `${process.env.PUBLIC_URL}/assets/icons`;
const charactersPath = `${process.env.PUBLIC_URL}/assets/characters`;

const characters = [
    "male.svg",
    "female.svg",
    "trophy.svg"
];

interface CharacterSelectorProps{

}

interface CharacterSelectorState{
    characterSelectIndex: number;
}

class CharacterSelector extends Component<CharacterSelectorProps, CharacterSelectorState> {
    constructor(props: CharacterSelectorProps){
        super(props);

        // default stat
        this.state = {characterSelectIndex: 0};
    }

    componentDidMount(){
        // force to preload all characters image
        characters.forEach(character => {
            const img = new Image();
            img.src = `${charactersPath}/${character}`;
        })
    }

    handleArrowRightOnClick: MouseEventHandler = (e) => {
        if(characters.length === this.state.characterSelectIndex + 1)
            this.setState({characterSelectIndex: 0});
        else
            this.setState({characterSelectIndex: this.state.characterSelectIndex + 1})
    }

    handleArrowLeftOnClick: MouseEventHandler = (e) => {
        if(this.state.characterSelectIndex === 0)
            this.setState({characterSelectIndex: characters.length - 1});
        else
            this.setState({characterSelectIndex: this.state.characterSelectIndex - 1});
    }


    render(): ReactNode {
        return (
            <div className="d-flex justify-content-center" id="characterSelector">
                <div className="wrapper align-self-center">
                    <img 
                        className="" 
                        src={`${iconsPath}/arrow-left.svg`} 
                        id="arrowLeft" 
                        alt="" 
                        style={{width: "64px", height: "64px"}}
                        onClick={this.handleArrowLeftOnClick}
                    />
                </div>
                <div className="wrapper align-self-center">
                    <img 
                        className="" 
                        src={`${charactersPath}/${characters[this.state.characterSelectIndex]}`}
                        alt={`character-${this.state.characterSelectIndex}`}
                        id="characterIcon" 
                        style={{height: "30vh"}}
                    />
                </div>
                <div className="wrapper align-self-center">
                    <img 
                        className=""
                        src={`${iconsPath}/arrow-right.svg`} 
                        id="arrowRight"
                        style={{width: "64px", height: "64px"}}
                        onClick={this.handleArrowRightOnClick}
                    />
                </div>
            </div>
        );
    }
}

export default CharacterSelector;