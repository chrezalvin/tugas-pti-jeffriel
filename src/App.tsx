import {Component} from 'react';
import { type ChangeEventHandler, MouseEventHandler } from 'react';

import CharacterSelector from './components/CharacterSelector';



interface AppProps{

}

interface AppState{
  characterName: string;
  characterProdi: string;
  gameStart: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);

    this.state = {characterName: "", characterProdi: "", gameStart: false};
  }

  handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if(e.target.value.length < 20)
      this.setState({characterName: e.target.value});
  }

  handleProdiChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    this.setState({characterProdi: e.target.value});
  }

  startGame: MouseEventHandler = (e) => {
    e.preventDefault();
    if(this.state.characterName !== "" && this.state.characterProdi !== "")
      this.setState({gameStart: true});
  }

  render(){
    if(!this.state.gameStart)
    return (
      <main className="bg-primary d-flex flex-column gap-2 p-2">
        <div className="d-flex justify-content-center">
            <h3>choose your character</h3>
        </div>
        <CharacterSelector />
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
                    <option value="">Input Prodi</option>
                    <option value="input prodi">Input Prodi</option>
                    <option value="input prodi">Input Prodi</option>
                    <option value="input prodi">Input Prodi</option>
                    <option value="input prodi">Input Prodi</option>
                    <option value="input prodi">Input Prodi</option>
                  </select>
              </div>
              <button 
                type="submit" 
                className="btn btn-success"
                onClick={this.startGame}
              >
                START GAME!
              </button>
          </div>
        </form>
      </main>
    )
  }
}

// interface AppProps{
// }

// type person_t = {
//   id: number; 
//   name: string; 
//   age: number; 
//   isEdit?: boolean;
// }

// interface AppState{
//   people: person_t[];
//   searchInput: string;
// }

// className App extends Component<AppProps, AppState>{
//   constructor(props: AppProps){
//     super(props);

//     this.state = {
//       people: [],
//       searchInput: ""
//     }
//   }

//   async componentDidMount(){
//     const data = await fetch('http://localhost:3000/');
//     const {people} = await data.json();
//     this.setState({people: people});
//   }

//   addPerson = (name: string, age: number) => {
//     const id = this.state.people.length + 1;
//     this.setState({people: [{id: id, name: name, age: age}, ...this.state.people]});
//   };

//   deletePerson = (id:number) => {
//     this.setState({people: this.state.people.filter(person => person.id !== id)});
//   }

//   editPerson = (id:number, name:string, age:number) => {
//     this.setState({people: this.state.people.map(person => {
//       if(person.id === id)
//         return {...person, name: name, age: age, isEdit: false};
//       else return person;
//     })})
//   }

//   toggleEdit = (id:number) => {
//     this.setState({people: this.state.people.map(person => {
//       if(person.id === id) return {...person, isEdit: !person.isEdit};
//       else return person;
//     })})
//   }

//   handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
//     this.setState({searchInput: e.target.value});
//   };

//   displayPeople: (search?: string) => person_t[] = (search) => {
//     if(search)
//       return this.state.people.filter((person) => {
//         return person.name.match(search) != null;
//       });
//     else
//       return this.state.people;
//   }

//   render(){
//     const displayPeople = this.displayPeople(this.state.searchInput)
//     .map(person => {
//       return (
//         <Person 
//           age={person.age} 
//           name={person.name} 
//           id={person.id}
//           isEdit={person.isEdit ?? false}
//           deletePerson={this.deletePerson}
//           toggleEdit={this.toggleEdit}
//           editPerson={this.editPerson}
//           key={person.id}
//           />
//         );
//     });

//     return (
//       <div classNameName="App">
//         <h1>database example</h1>
//         <h2>{displayPeople.length} people found</h2>
//         <div classNameName="wrapper">
//           <div classNameName='boxlist f-column'>
//             <input 
//               type="text" 
//               classNameName='searchBox' 
//               placeholder='Search person here...' 
//               onChange={this.handleSearch}
//             />
//             <NewPerson addPerson={this.addPerson}/>
//             {displayPeople}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
