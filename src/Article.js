import React, {Component} from 'react';

class Article extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="article">
                <img src={this.props.urlToImage}></img>
                <div className="content">
                    <h4>{this.props.title}</h4>
                    <p className="descrip">{this.props.description}</p>
                    <p><span class="badge badge-primary">{this.props.author}</span></p>
                </div>
            </div>
        );
    }
}

export default Article;