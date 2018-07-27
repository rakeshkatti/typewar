import React, { Component } from 'react';
import './App.css';
import {getSocket} from "../plugins/socket";
import { Game } from "./Game";
import { fetchAllWords } from '../actions';
import {connect} from "react-redux";

function signOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //     console.log('User signed out.');
    // });
}
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
            <h1 className="App-title">typewar</h1>
            </header>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <a href="#" onclick={signOut}>Sign out</a>
            <button onClick={this.props.startGame}>start game</button>
            <Game />
            </div>
        );
    }
}

export default connect(()=> {return {}}, {startGame: fetchAllWords})(App);
