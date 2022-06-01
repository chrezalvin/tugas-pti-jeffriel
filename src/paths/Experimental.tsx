import {Component, MouseEventHandler} from "react";
import {Button, Modal} from "react-bootstrap";

// props
interface ExperimentalProps{
}

interface ExperimentalState{
    showModal: boolean;
}

class Experimental extends Component<ExperimentalProps, ExperimentalState> {
    constructor(props: ExperimentalProps){
        super(props);

        this.state = {
            showModal: false
        }
    }

    handleButtonOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        // change color to primary, removing previous color
        e.currentTarget.classList.remove("btn-success");
        e.currentTarget.classList.add("btn-primary");

        e.currentTarget.innerText = "Confirm?";

        const handleButtonConfirmOnClick = () => {
            this.setState({});
        }

        e.currentTarget.onclick = handleButtonConfirmOnClick;
    }

    render() {
        return (
        
        <main>
            <Button
                onClick={this.handleButtonOnClick}
                variant="success"
            >
                Click me!
            </Button>
        </main>
        );
    }
}

export default Experimental;