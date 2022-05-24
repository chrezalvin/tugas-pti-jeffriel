import {Component} from "react";
import { type ChangeEventHandler, MouseEventHandler} from "react";

interface MyProps {
    name:string;
    age:number;
    id:number;
    isEdit?: boolean;
    deletePerson: (id:number) => void;
    toggleEdit: (id:number) => void;
    editPerson: (id:number, name:string, age:number) => void
}

interface MyState{
    name:string;
    age:number;
}

class Person extends Component <MyProps, MyState>{
    constructor(props: MyProps){
        super(props);

        this.state = {
            name: this.props.name,
            age: this.props.age
        }
    }

    handleDelete:MouseEventHandler = (e) => {
        this.props.deletePerson(this.props.id);
    }

    handleEdit:MouseEventHandler = (e) => {
        e.preventDefault();
        // check if cancels edit
        if(this.props.isEdit)
            this.setState({age: this.props.age, name: this.props.name});

        this.props.toggleEdit(this.props.id);
    }

    handleEditSave:MouseEventHandler = (e) => {
        e.preventDefault();
        this.props.editPerson(this.props.id, this.state.name, this.state.age);
    }

    handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        this.setState({name: e.target.value})
    }

    handleAgeChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const value = parseInt(e.target.value)
        this.setState({age: value})
    }

    render(): JSX.Element{
        if(this.props.isEdit === true){
            return (
                <div className="person bordered">
                    <div className="toolkit">
                        <button onClick={this.handleEdit} id="cancel">Cancel</button>
                        <input type="submit" onClick={this.handleEditSave} id="save" value="save"/>
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
            )
        }
        else
        return (
            <div className="person bordered">
                <div className="toolkit">
                    <button onClick={this.handleEdit} className="editBtn">edit</button>
                    <button onClick={this.handleDelete} className="deleteBtn">delete</button>
                </div>
                <table className="info">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.props.name}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{this.props.age}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export {Person};
export default Person;