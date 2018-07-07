import  React, {Component} from 'react';
import { Character } from "./Character";
import {connect} from "react-redux";

class GameComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    
    componentWillMount() {
        
    }
    
    render() {
        return (<div>
            {this.props.words.map((word) => {
                return <Character word={word} key={word} />
            })
        }
        </div>)
    }   
}

export const Game = connect(({words}) => {
    return {words}
})(GameComponent);
