import { Component } from "react";
import { type MouseEventHandler, ChangeEventHandler } from "react";

enum Error{
    NAME_ERROR,
    AGE_ERROR
}

interface NewPersonState{
    name: string;
    age: number;
    isEdit: boolean;
    error?: boolean;
}

const initialState: NewPersonState = {
    name: "",
    age: 0,
    isEdit: false,
    error: false
}; 

interface NewPersonProps{
    addPerson: (name: string, age: number) => void;
}

class NewPerson extends Component<NewPersonProps, NewPersonState>{
    constructor(props: NewPersonProps){
        super(props);

        this.state = initialState;
    }

    resetState = () => { this.setState(initialState); }
    toggleEdit = () => { this.setState({isEdit: !this.state.isEdit}) };
    
    handleSave: MouseEventHandler = (e) => {
        if(this.state.age < 0 || this.state.name === ""){
            this.setState({error: true});
            return;
        }
        
        this.props.addPerson(this.state.name, this.state.age);
        this.resetState();
    }

    handleCancel: MouseEventHandler = (e) => {
        this.resetState();
        this.toggleEdit();
    };

    handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        this.setState({name: e.target.value})
    }

    handleAgeChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const value = parseInt(e.target.value)
        this.setState({age: value})
    }

    render():JSX.Element{
        if(this.state.isEdit || this.state.error)
            return (
                <div className="person bordered">
                    <div className="toolkit">
                        <button id="cancel" onClick={this.handleCancel}>Cancel</button>
                        <button id="save" onClick={this.handleSave}>Add</button>
                    </div>
                    <table className="info">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type="text"
                                        id="name"
                                        value={this.state.name}
                                        placeholder="insert name here"
                                        onChange={this.handleNameChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>
                                    <input
                                        type="number"
                                        id="age"
                                        value={this.state.age}
                                        onChange={this.handleAgeChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        else
            return (
                <div className="person newPerson bordered" onClick={(e) => this.toggleEdit()}>
                    Add New Person
                </div>
            )
    }
}

export default NewPerson;