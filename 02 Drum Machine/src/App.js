// 07 oct 03:20

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import $ from 'jquery';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.audioPlay = this.audioPlay.bind(this);
    this.validKeys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
    this.names = {
      "Q": "Chord 1",
      "W": "Chord 2",
      "E": "Chord 3",
      "A": "Chord 4",
      "S": "Claps",
      "D": "Opened Hit Hat",
      "Z": "Bass Drum and Snare",
      "X": "Bass Drum",
      "C": "Closed Hit Hat"
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (this.validKeys.includes((event.key).toUpperCase())) {
      this.audioPlay((event.key).toUpperCase());
    }
  }

  audioPlay(letter) {
    $("#" + letter)[0].play();
    $("#display-text").text(this.names[letter]);
  }

  render() {
    return (
      <div id={"drum-machine"} className={"bg-dark rounded"}>
        <div id={"display"} className={"bg-warning rounded-top"}>
          <p id={"display-text"} className="text-center text-dark">Drumpad</p>
        </div>
        <div id={"drum-pads"}>
          <button id={"heater-1"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("Q")}}>
          Q
          <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"} id={"Q"} className="clip">
          </audio>
          </button>
          <button id={"heater-2"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("W")}}>
            W
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"} id={"W"} className="clip">
            </audio>
          </button>
          <button id={"heater-3"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("E")}}>
            E
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"} id={"E"} className="clip">
            </audio>
          </button>
          <button id={"heater-4"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("A")}}>
            A
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"} id={"A"} className="clip">
            </audio>
          </button>
          <button id={"clap"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("S")}}>
            S
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"} id={"S"} className="clip">
            </audio>
          </button>
          <button id={"open-hit-hat"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("D")}}>
            D
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"} id={"D"} className="clip">
            </audio>
          </button>
          <button id={"kick-n'-hat"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("Z")}}>
            Z
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"} id={"Z"} className="clip">
            </audio>
          </button>
          <button id={"kick"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("X")}}>
            X
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"} id={"X"} className="clip">
            </audio>
          </button>
          <button id={"closed-hit-hat"} className={"drum-pad btn btn-secondary"} onClick={() => {this.audioPlay("C")}}>
            C
            <audio src={"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"} id={"C"} className="clip">
            </audio>
          </button>
        </div>
      </div>
    );
  }
}

export default MyApp;


// Finished  07 oct 05:47