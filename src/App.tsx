import {Component} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Start from "./paths/Start";
import Game from "./paths/Game";
import Evaluation from "./paths/Evaluation";
import AboutUs from "./paths/AboutUs";

import Experimental from "./paths/Experimental";

import {
  characters as DATA_characters,
  creator as DATA_creator
} from './data'

const iconsPath = `${process.env.PUBLIC_URL}/assets/icons`;
const charactersPath = `${process.env.PUBLIC_URL}/assets/characters`;

interface AppProps{

}

interface AppState{
  characterName: string;
  characterProdi: string;
  characterIndex: number;

  stat: {
    sleep: number,
    education: number,
    health: number,
    happiness: number
  }
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);

    this.state = {
      characterName: "", 
      characterProdi: "", 
      characterIndex: 0,

      stat: {
        sleep: 5,
        education: 0,
        happiness: 5,
        health: 5
      }
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
      newsSection: "top-headlines", // top-headlines/everything
      searchQuery: "", // searched word option
    }

    const newsUrl = `https://newsapi.org/v2/${option.newsSection}` +
                    `?country=${option.country}&` +
                    `apiKey=${apiKey}&` +
                    `q=${encodeURI(option.searchQuery)}`;

    // create new fetch interface
    const request = new Request(newsUrl);

    const response = await fetch(request);
    const newsJson = await response.json();
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
                characterIndex={this.state.characterIndex} 
                characterName={this.state.characterName}
          />}
          />
          <Route path='/evaluation' key="evaluation"
            element={
              <Evaluation />
            }/>
          <Route path='/about-us' key="about-us"
            element={
              <AboutUs 
                data_creator={DATA_creator}
              />
            }/>
          <Route path='experimental' element={<Experimental />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
