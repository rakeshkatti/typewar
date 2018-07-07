import React, { Component } from 'react';
import './App.css';
import {getSocket} from "../plugins/socket";
import { Game } from "./Game";
import { fetchAllWords } from '../actions';
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
    }
    
    startGame() {
        let socket = getSocket();
        socket.emit('start-game', {
            userId: localStorage.getItem("username")
        });
    }
    
    render() {
        return (
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">..</h1>
            </header>
            <button onClick={this.props.startGame}>ss</button>
            <Game />
            </div>
        );
    }
}

export default connect(()=> {return {}}, {startGame: fetchAllWords})(App);
