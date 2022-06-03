import { Component } from "react";
import { type ReactNode, MouseEventHandler, ChangeEventHandler } from "react";
import { Link } from "react-router-dom";
import {Modal, Button, } from "react-bootstrap";
import {characters, prodi as DATA_Prodi} from "../data";

const iconsPath = `${process.env.PUBLIC_URL}/assets/icons`;
const charactersPath = `${process.env.PUBLIC_URL}/assets/characters`;

interface StartProps{
    startGame: (
        name: string,
        prodi: string,
        characterIndex: number
    ) => void;
}

interface StartState{
    characterIndex: number;
    characterName: string;
    characterProdi: string;
    tutorialModalOpen: boolean;
    inputClean?: boolean;
}

class Start extends Component<StartProps, StartState> {
    constructor(props: StartProps){
        super(props);

        this.state = {
            characterIndex: 0, 
            characterName: "", 
            characterProdi: "",
            inputClean: false,
            tutorialModalOpen: false,
        };
    }

    componentDidUpdate(prevProps: StartProps, prevState: StartState){
        // check if the state are the same key and value
        if(prevState.characterIndex === this.state.characterIndex &&
            prevState.characterProdi === this.state.characterProdi &&
            prevState.characterName === this.state.characterName &&
            prevState.inputClean === this.state.inputClean
            ) return;

        if(this.state.characterName !== '' && this.state.characterProdi !== '')
            this.setState({inputClean: true});
        else
            this.setState({inputClean: false});
    }

    handleArrowRightOnClick: MouseEventHandler = (e) => {
        if(characters.length === this.state.characterIndex + 1)
            this.setState({characterIndex: 0});
        else
            this.setState({characterIndex: this.state.characterIndex + 1})
    }
    
    handleArrowLeftOnClick: MouseEventHandler = (e) => {
        if(this.state.characterIndex === 0)
            this.setState({characterIndex: characters.length - 1});
        else
            this.setState({characterIndex: this.state.characterIndex - 1});
    }

    handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.value.length < 20)
            this.setState({characterName: e.target.value})
    }
    
    handleProdiChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        this.setState({characterProdi: e.target.value});
    }

    handleStartgameOnClick: MouseEventHandler = (e) => {
        this.props.startGame(
            this.state.characterName,
            this.state.characterProdi,
            this.state.characterIndex
        );
    }

    openTutorialModal = () => {
        this.setState({tutorialModalOpen: true});
    }

    closeTutorialModal = () => {
        this.setState({tutorialModalOpen: false});
    }

    render() {
        const Prodis = DATA_Prodi.map(prodi => {
            return (
                <option key={prodi} value={prodi}>{prodi}</option>
            )
        });

        return (
        <main className="d-flex flex-column gap-2 p-2">
            <Modal show={this.state.tutorialModalOpen} onHide={this.closeTutorialModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tutorial Permainan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Kamu adalah seorang mahasiswa UMN yang akan menjalani 7 hari masa-masa mahasiswa</p>
                    <p>Tugasmu adalah untuk menjaga kestabilan stat kamu selama 7 hari dengan melakukan berbagai macam aktivitas</p>
                    <p>Aktivitas yang kamu lakukan akan mengubah stat kamu</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.closeTutorialModal}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="d-flex justify-content-center position-relative">
                <h3>choose your character</h3>
                <div className="position-absolute" style={{right: "20px"}}>
                <Button 
                    variant="light"
                    data-toggle="modal" 
                    data-target="#modalGuide"
                    onClick={this.openTutorialModal}
                    >
                    <div className="d-flex flex-column">
                        <div className="img d-flex justify-content-center">
                            <img src={`${iconsPath}/book.svg`} alt="" style={{height: "10vh"}}/>
                        </div>
                        <div className="title container-fluid justify-content-center">
                            <div className="wrapper">Guide</div>
                        </div>
                    </div>
                </Button>
            </div>
            </div>
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
                        src={`${charactersPath}/${characters[this.state.characterIndex]}`}
                        alt={`character-${this.state.characterIndex}`}
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
            <form className="d-flex justify-content-center" action="">
                
                <div className="w-50 d-flex flex-column gap-2">
                    <div className="form-group">
                        <label htmlFor="name"><h5>Enter Name Here</h5></label>
                        <input 
                            className={`form-control`}
                            type="text" 
                            placeholder="maximum of 20 characters" 
                            id="name"
                            value={this.state.characterName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            onChange={this.handleProdiChange}
                        >
                        <option value="">Input Program Studi</option>
                        {Prodis}
                        </select>
                    </div>
                    <Link 
                        type="submit"
                        to="/game"
                        className={`btn btn-success ${this.state.inputClean ? "": "disabled"}`}
                        onClick={this.handleStartgameOnClick}
                    >
                    START GAME!
                    </Link>
                </div>
            </form>
            <footer className="py-3 my-2 bg-light" style={{height: "20vh"}}>
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link text-muted fw-bolder">
                        <Link
                            to="/about-us"
                            className="btn btn-light"
                        >
                        About Us
                        </Link>
                    </a>
                </li>
                </ul>
            </footer>
        </main>
        );
    }
}

export default Start;