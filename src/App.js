import React, {Component} from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Article from './Article';
import './App.css';

var keyCode = '34ef4250641b42959736f53db7cfb436';
var key = '?apiKey='+keyCode;

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeKey: 'entertainment',
      entertainmentArticles: [],
      businessArticles: [],
      sportsArticles: [],
      politicsArticles: [],

      searchInput:'',
      searchArticles:[]
  
    };
  }

  handleTabSelect = (key, e) => {
    this.setState({activeKey:key})
  }

  handleSearchSubmitClick = (e) => {
    e.preventDefault();
    this.setState({activeKey:'search'})

    var term = this.state.searchInput
    this.loadHeadlinesByTerm(term);
  }

  loadHeadlinesByCategory = (category) => {
    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&country=nz&category='+category;
    fetch(articlesURL)
      .then( res=>res.json())
      .then((data)=>{
        var articles = data.articles;

        if(category == 'entertainment'){
          this.setState({entertainmentArticles:articles})
        }
        if(category == 'business'){
          this.setState({businessArticles:articles})
        }
        if(category == 'sports'){
          this.setState({sportsArticles:articles})
        }
        if(category == 'politics'){
          this.setState({politicsArticles:articles})
        }
      })
  }

  loadHeadlinesByTerm = (term) => {
    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&q='+term;
    fetch(articlesURL)
      .then( res=>res.json())
      .then((data)=>{
        var articles = data.articles;
        this.setState({searchArticles:articles})
      })
  }

  componentDidMount(){
    this.loadHeadlinesByCategory('entertainment');
    this.loadHeadlinesByCategory('business');
    this.loadHeadlinesByCategory('sports');
    this.loadHeadlinesByCategory('politics');
  }

  handleSearchInputChange = (e) => {
    this.setState({searchInput:e.target.value})
  }

  render(){
    return(
      <div className="container">

        <h1 className="news-title">Metropolitan news</h1>

          <Tab.Container activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
       
            <div className="row tab-top">
              
              <Nav variant="pills" className="col-7 pills">
                <Nav.Item>
                  <Nav.Link className="link" eventKey="entertainment">Entertainment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="link" eventKey="business">Business</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="link" eventKey="sports">Sports</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="link" eventKey="politics">Politics</Nav.Link>
                </Nav.Item>
              </Nav>

              <form className="col-5">
                <div class="form-row align-items-center justify-content-end">
                  <div class="col-auto">
                    <input onChange={this.handleSearchInputChange} type="text" className="form-control mb-2 search-input" placeholder="Enter keywords"/>
                  </div>
                  
                  <div class="col-auto">
                    <button onClick={this.handleSearchSubmitClick} type="submit" className="btn btn-primary mb-2 search-submit">Search</button>
                  </div>
                </div>
              </form>
            </div>

            
            <Tab.Content>
              <Tab.Pane className="tab-pane" eventKey="entertainment">
                <div className="name-box"><h1 className="name">Entertainment</h1></div>

                <div className="articles">

                {
                  this.state.entertainmentArticles.map((article)=>{
                    var articleProps = {
                    ...article,
                    key:Date.now(),
                    loadHeadlinesByCategory:this.loadHeadlinesByCategory
                    }
                    return <Article {...articleProps}/>
                  })
                } 

                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane" eventKey="business">
              <div className="name-box"><h1 className="name">Business</h1></div>
                <div className="articles">

                {
                 this.state.businessArticles.map((article)=>{
                    var articleProps = {
                    ...article,
                    key:Date.now(),
                    loadHeadlinesByCategory:this.loadHeadlinesByCategory
                    }
                    return <Article {...articleProps}/>})
                } 
                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane" eventKey="sports">
              <div className="name-box"><h1 className="name">Sports</h1></div>
                <div className="articles">

                {
                  this.state.sportsArticles.map((article)=>{
                    var articleProps = {
                    ...article,
                    key:Date.now(),
                    loadHeadlinesByCategory:this.loadHeadlinesByCategory
                    }
                    return <Article {...articleProps}/>
                  })
                }

                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane" eventKey="politics">
              <div className="name-box"><h1 className="name">Politics</h1></div>

                <div className="articles">

                {
                  this.state.politicsArticles.map((article)=>{
                    var articleProps = {
                    ...article,
                    key:Date.now(),
                    loadHeadlinesByCategory:this.loadHeadlinesByCategory
                    }
                    return <Article {...articleProps}/>
                  })
                }

                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane" eventKey="search">
                <h1>Search Results</h1>

                <div className="articles">
                {
                  this.state.searchArticles.map((article)=>{
                    var articleProps = {
                    ...article,
                    key:Date.now(),
                    loadHeadlinesByCategory:this.loadHeadlinesByCategory,
                    loadHeadlinesByTerm:this.loadHeadlinesByTerm
                    }
                    return <Article {...articleProps}/>
                  })
                }
                </div>
                
              </Tab.Pane>

            </Tab.Content>
          
          </Tab.Container>
        </div>
    );
  }
}

export default App;
