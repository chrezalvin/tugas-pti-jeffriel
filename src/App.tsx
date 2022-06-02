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

    // this.getNews();
  }

  getNews = async () => {
    const apiKey = "53b17730633049a1a0e32384e25ca065";
    const option = {
      country: "id", // id = indonesia, en = english
      newsSection: "everything", // top-headlines/everything
      searchQuery: "", // searched word option
    }

    const newsUrl = `https://newsapi.org/v2/${option.newsSection}` +
                    `?country=${option.country}&` +
                    `apiKey=${apiKey}&` +
                    `q=${encodeURI(option.searchQuery)}`;

    // create new fetch interface
    const request = new Request(newsUrl);

    const response = await fetch(request);
    return await response.json();
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
    this.setState({
      stat: finalStat,
      trackActivity: trackedActivity
    })
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
          {/* <Route path='/evaluation' key="evaluation"
            element={
              <Evaluation />
            }/> */}
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
