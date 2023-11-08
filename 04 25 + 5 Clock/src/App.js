// 07 oct 20:46

import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
      breakLength: 5,
      sessionLength: 25,
      running: false,
      breakTime: false,
      startStopButtonClass: "btn btn-success"
    };
    this.time = this.time.bind(this);
    this.decBreak = this.decBreak.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decSession = this.decSession.bind(this);
    this.runningHandler = this.runningHandler.bind(this);
    this.setTime = this.setTime.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  time() {
    const minutes = this.state.minutes;
    const seconds = this.state.seconds;
    const minutesFormatted = minutes.toString().padStart(2, '0');
    const secondsFormatted = seconds.toString().padStart(2, '0');
    return `${minutesFormatted}:${secondsFormatted}`;
  }

  decBreak() {
    if (this.state.breakLength === 1 || this.state.running) {
      return;
    }
    this.setState((prevState) => ({
      breakLength: prevState.breakLength - 1,
    }));
  }

  incBreak() {
    if (this.state.breakLength === 60 || this.state.running) {
      return;
    }
    this.setState((prevState) => ({
      breakLength: prevState.breakLength + 1,
    }));
  }

  incSession() {
    if (this.state.minutes === 60 || this.state.running) {
      return;
    }
    this.setState((prevState) => {
      const newMinutes = prevState.minutes + 1;
      return {
        minutes: newMinutes,
        sessionLength: newMinutes,
      };
    });
  }

  decSession() {
    if (this.state.minutes === 1 || this.state.running) {
      return;
    }
    this.setState((prevState) => {
      const newMinutes = prevState.minutes - 1;
      return {
        minutes: newMinutes,
        sessionLength: newMinutes,
      };
    });
  }

  runningHandler() {
    if (this.state.running) {
      clearInterval(this.state.refreshInterval);
      this.setState({
        running: false,
        refreshInterval: null,
        startStopButtonClass: "btn btn-success"
      });
    } else {
      const refreshInterval = setInterval(this.setTime, 1);
      this.setState({
        running: true,
        refreshInterval,
        startStopButtonClass: "btn btn-warning"
      });
    }
  }

  setTime() {
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      document.getElementById("beep").play();
      setTimeout(() => {
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;    
      }, 2000);
      if (!this.state.breakTime) {
        this.setState((prevState) => ({
          minutes: prevState.breakLength,
          seconds: 0,
          breakTime: true,
        }));
      } else {
        this.resetState();
      }
      return;
    }

    if (this.state.seconds === 0) {
      this.setState((prevState) => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }));
    } else {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
  }

  resetState() {
    if (this.state.running) {
      clearInterval(this.state.refreshInterval);
    }
    this.setState({
      minutes: 25,
      seconds: 0,
      breakLength: 5,
      sessionLength: 25,
      breakTime: false,
      running: false,
      refreshInterval: null,
    });
  }

  render() {
    return (
      <div id={"clock"} className={"bg-dark"}>
        <h1 id={"title"} className={"text-center text-light"}>
          25 + 5 Clock
        </h1>
        <label
          id={"time-left"}
          className={"bg-warning text-secondary rounded-top"}
        >
          {this.time()}
        </label>
        <div id={"inc-dec-buttons"} className={"bg-secondary text-light rounded-bottom"}>
          <div id={"left"}>
            <div className={"buttons"}>
              <button id={"break-decrement"} className={"btn btn-secondary rounded-0"} onClick={this.decBreak}>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
              <label id={"break-label"}>Break Length</label>
              <button id={"break-increment"} className={"btn btn-secondary rounded-0"} onClick={this.incBreak}>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
            <label id={"break-length"}>{this.state.breakLength}</label>
          </div>
          <div id={"middle"}>
            <label id={"timer-label"}>
              {this.state.breakTime ? "Break" : "Session"}
            </label>
            <div className={"buttons"}>
              <button id={"start_stop"} className={this.state.startStopButtonClass} onClick={this.runningHandler}>
                {this.state.running ? "Pause" : "Start"}
              </button>
              <button id={"reset"} className={"btn btn-danger"} onClick={this.resetState}>
                Reset
              </button>
            </div>
          </div>
          <div id={"right"}>
            <div className={"buttons"}>
              <button id={"session-increment"} className={"btn btn-secondary rounded-0"} onClick={this.incSession}>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
              <label id={"session-label"}>Session Length</label>
              <button id={"session-decrement"} className={"btn btn-secondary rounded-0"} onClick={this.decSession}>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>
            <label id={"session-length"}>{this.state.sessionLength}</label>
          </div>
        </div>
        <audio id={"beep"} src={"https://www.fesliyanstudios.com/play-mp3/7032"} />
      </div>
    );
  }
}

export default Application;

// Pause     07 oct 20:57
// Continue  08 oct 14:00
// Pause     08 oct 15:54
// Continue  08 oct 19:56
// Finished  08 oct 21:07