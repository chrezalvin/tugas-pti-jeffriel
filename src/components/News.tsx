import {Component} from "react";

interface Article {
    source: {
            id: string,
            name: string
        };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface NewsProp{

}

interface NewsState{
    title: string;
    description: string;
    urlToImage: string;
}

class News extends Component<NewsProp, NewsState>{
    constructor(prop: NewsProp){
        super(prop);

        this.state = {
            description: "",
            title: "",
            urlToImage: ""
        }
    }

    async componentDidMount(){
        const article = await this.getNews();
        const timeInterval = 10 * 1000;

        // change news every x second
        setInterval(() => {
            // get random number between 0 - 20
            const randomNumber = Math.floor(Math.random() * 20);
            const articleTarget = article[randomNumber];
            this.setState({
                description: articleTarget.description,
                title: articleTarget.title,
                urlToImage: articleTarget.urlToImage
            });
        }, timeInterval);
    }

    getNews = async (): Promise<Article[]> => {
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
    
        const response: Response = await fetch(request);
        if(response.ok){

        }
        const {articles} = await (response.json() as Promise<{articles: Article[]}>);
        return articles;
    }

    render(){
        return (
            <div className="w-100 h-100 overflow-scroll" style={{height: "30vh"}}>
                <div className="d-flex justify-content-center">
                    <h3>NEWS</h3>
                </div>
                <div className="">
                    <strong>{this.state.title}</strong>
                </div>
                <div className="d-flex">
                    <div className="w-50">
                        <img src={this.state.urlToImage} alt="news" className="w-100 h-100"/>
                    </div>
                    <div className="w-50">
                        <p>{this.state.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default News;