import {Component} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Start from "./paths/Start";
import Game from "./paths/Game";
import Evaluation from "./paths/Evaluation";
import AboutUs from "./paths/AboutUs";

import Experimental from "./paths/Experimental";

import {
  characters as DATA_characters,
  creator as DATA_creator,
  Places as DATA_places,
  achievements as DATA_achievements,
} from './data'

const iconsPath = `${process.env.PUBLIC_URL}/assets/icons`;
const charactersPath = `${process.env.PUBLIC_URL}/assets/characters`;

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

interface AppProps{

}

interface StatPoint{
  name: "sleep" | "education" | "happiness" | "health",
  amount: number,
}

interface AppState{
  characterName: string;
  characterProdi: string;
  characterIndex: number;

  stat: StatPoint[];
  trackActivity: (Activity | string)[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);

    this.state = {
      characterName: "", 
      characterProdi: "", 
      characterIndex: 0,

      stat: [
        {
            name: "sleep",
            amount: 5,
        },
        {
            name: "education",
            amount: 3,
        },
        {
            name: "health",
            amount: 5,
        },
        {
            name: "happiness",
            amount: 5,
        }
    ],
    trackActivity: []
    };
  }

  componentDidMount(){
    // force to preload all characters image
    DATA_characters.forEach(character => {
        const img = new Image();
        img.src = `${charactersPath}/${character}`;
    })
  }

  gameStart = (name: string, prodi: string, characterIndex: number) => {
    if(name !== "" && prodi !== ""){
      this.setState(
        {
          characterName: name, 
          characterProdi: prodi,
          characterIndex: characterIndex
        }
      );
    }
  }

  gameOver = (finalStat: StatPoint[], trackedActivity:(Activity | string)[] ) => {
    finalStat.forEach(stat => {
      this.setState(prevState => {
        return {
          stat: [
            ...prevState.stat,
            stat
          ]
        }
      })
    })

    this.setState({trackActivity: [...trackedActivity]});
  }

  restartGame = () => {
    this.setState({
      characterName: "", 
      characterProdi: "", 
      characterIndex: 0,

      stat: [
        {
            name: "sleep",
            amount: 5,
        },
        {
            name: "education",
            amount: 3,
        },
        {
            name: "health",
            amount: 5,
        },
        {
            name: "happiness",
            amount: 5,
        }
    ],
    trackActivity: []
    });
  }

  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route index key="index"
            element={
              <Start 
                startGame={this.gameStart}
              />}
          />
          <Route path='/game' key="game"
            element={
              <Game 
                characterUrl={`${charactersPath}/${DATA_characters[this.state.characterIndex]}`} 
                characterName={this.state.characterName}
                DATA_Place={DATA_places}
                defaultStat={this.state.stat}
                gameOver={this.gameOver}
          />}
          />
          <Route path='/evaluation' key="evaluation"
            element={
              <Evaluation 
                characterName={this.state.characterName}
                characterUrl={`${charactersPath}/${DATA_characters[this.state.characterIndex]}`}
                characterProdi={this.state.characterProdi}
                
                stat={this.state.stat}
                trackActivity={this.state.trackActivity}
                DATA_Achievements={DATA_achievements}
                restartGame={this.restartGame}
              />
            }/>
          <Route path='/about-us' key="about-us"
            element={
              <AboutUs 
                data_creator={DATA_creator}
              />
            }/>
            {
              process.env.NODE_ENV === 'development' ? 
              <Route path='/experimental' key="experimental"/> : ""
            }
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
