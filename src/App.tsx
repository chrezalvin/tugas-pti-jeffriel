import {Component} from 'react';
import { type ChangeEventHandler, MouseEventHandler } from 'react';

import CharacterSelector from './components/CharacterSelector';
import Stat from './components/Stat';


interface AppProps{

}

interface AppState{
  characterName: string;
  characterProdi: string;
  characterIndex: number;
  gameStart: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);

    this.state = {
      characterName: "", 
      characterProdi: "", 
      gameStart: false, 
      characterIndex: 0
    };
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
                    <option value="">Input Program Studi</option>
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
    else
      return (
      <main>
        <div className="d-flex" id="stats" style={{height: "5vh"}}>
          <Stat 
            iconUrl={`${process.env.PUBLIC_URL}/assets/icons/trophy.svg`}
            key="0"
          />
          <Stat 
            iconUrl={`${process.env.PUBLIC_URL}/assets/icons/trophy.svg`}
            key="1"
          />
          <Stat 
            iconUrl={`${process.env.PUBLIC_URL}/assets/icons/trophy.svg`}
            key="2"
          />
          <Stat 
            iconUrl={`${process.env.PUBLIC_URL}/assets/icons/trophy.svg`}
            key="3"
          />
        </div>

        <div className="d-flex p-2" id="gameScreen" style={{height: "70vh"}}>
            <div className="d-flex flex-column tab w-25">
                <div className="d-flex flex-column gap-1 p-1" id="gotoList">
                    <div className="d-flex justify-content-center">
                        <h3>GO TO</h3>
                    </div>
                    <button className="btn btn-warning fw-bold">Kampus</button>
                    <button className="btn btn-warning fw-bold">Kafe</button>
                    <button className="btn btn-warning fw-bold">Supermarket</button>
                </div>
                <div className="bg-dark w-100 h-100" id="news"></div> 
            </div>
            <div className="d-flex flex-column w-50">
                <div className="bg-info d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <h3>Selasa - 9:43</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h5>Good Morning {`${this.state.characterName}`}</h5>
                    </div>
                </div>
                <div className="bg-success w-100 h-100">
                    <img className="p-4 w-100 h-100" src={`${process.env.PUBLIC_URL}/assets/icons/trophy.svg`} style={{maxHeight: "50vh"}}/>
                </div>
            </div>
            <div className="d-flex flex-column w-25 bg-danger">
                <div className="bg-primary p-1 d-flex flex-column" id="atList">
                    <div className="btn btn-warning fw-bold">At Supermarket</div>
                </div>
                <div className="bg-danger d-flex flex-column p-1 gap-2">
                    <button className="btn btn-info fw-bold">Something</button>
                    <button className="btn btn-info fw-bold">Something</button>
                    <button className="btn btn-info fw-bold">Something</button>
                    <button className="btn btn-info fw-bold">Something</button>
                </div>
            </div>
        </div>
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
