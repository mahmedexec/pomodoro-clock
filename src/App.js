import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      playing: false,
      minutes: 25,
      seconds: "00",
      switcher: false,
      first: true,
    };
  }

  counter = () => {
    var timer = this.state.sessionLength * 60,
      minutes,
      seconds;

    setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (this.state.playing) {
        this.setState({
          minutes,
          seconds,
        });

        timer--;
      }
      if (this.state.first) {
        timer = !this.state.switcher
          ? this.state.sessionLength * 60
          : this.state.breakLength * 60;
      }
      if (minutes == 0 && seconds == 0) {
        if (!this.state.switcher) {
          timer = this.state.breakLength * 60;
          this.setState({
            switcher: true,
          });
        } else {
          timer = this.state.sessionLength * 60;
          this.setState({
            switcher: false,
          });
        }
      }
    }, 1000);
  };

  mmss=()=> this.state.minutes+":"+this.state.seconds;
  handleIncDec = (event) => {
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;
    let minutes = this.state.minutes;
    if (!this.state.playing) {
      switch (event.target.parentElement.id) {
        case "break-increment":
          breakLength++;

          break;
        case "break-decrement":
          breakLength--;
          break;
        case "session-increment":
          sessionLength++;
          minutes++;
          break;
        case "session-decrement":
          sessionLength--;
          minutes--;
          break;
        default:
          break;
      }
      if (
        breakLength < 1 ||
        sessionLength < 1 ||
        breakLength > 60 ||
        sessionLength > 60
      )
        return;
      else {
        this.setState({
          breakLength,
          sessionLength,
          minutes : minutes < 10 ? "0" + minutes : minutes,
        });
      }
    }

    //log statements:
    console.log("AFTER-INCREMENT/DECREMENT:");
    console.log(this.state);
  };
  handleReset = (event) => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: "00",
      playing: false,
      first: true,
      switcher: false,
    });

    //log statements:
    console.log("AFTER-RESET:");
    console.log(this.state);
  };

  handlePlayPause = () => {
    this.setState({
      playing: !this.state.playing,
    });
    if (this.state.first) {
      this.setState({
        first: false,
      });
      this.counter();
    }
  };

  render() {
    return (
      <div className="container-fluid fill-viewport">
        <h1
          className="title text-responsive text-center text-white p-3"
          style={titleStyle}
        >
          Pomodoro Clock 1.0
        </h1>
        <div className="container col-lg-6">
          <div className="row mt-5">
            <div className="col">
              <h4
                id="break-label"
                style={titleStyle}
                className="p-2 text-center"
              >
                Break Length
              </h4>

              <div
                className="container d-flex justify-content-center bg-warning align-items-center p-2"
                style={controlStyle}
              >
                <button
                  className="btn btn-sm"
                  id="break-decrement"
                  onClick={this.handleIncDec}
                >
                  <i className="material-icons m-1">expand_more</i>
                </button>

                <h4
                  id="break-length"
                  className="d-inline m-1"
                  style={titleStyle}
                >
                  {this.state.breakLength}
                </h4>
                <button
                  className="btn btn-sm"
                  id="break-increment"
                  onClick={this.handleIncDec}
                >
                  <i className="material-icons m-1">expand_less</i>
                </button>
              </div>
            </div>

            <div className="col">
              <h4
                id="session-label"
                className="p-2 text-center"
                style={titleStyle}
              >
                Session Length
              </h4>

              <div
                className="container bg-warning d-flex justify-content-center align-items-center p-2"
                style={controlStyle}
              >
                <button
                  className="btn btn-sm"
                  id="session-decrement"
                  onClick={this.handleIncDec}
                >
                  <i className="material-icons m-1">expand_more</i>
                </button>

                <h4
                  id="session-length"
                  className="d-inline m-1"
                  style={titleStyle}
                >
                  {this.state.sessionLength}
                </h4>
                <button
                  className="btn btn-sm"
                  id="session-increment"
                  onClick={this.handleIncDec}
                >
                  <i className="material-icons m-1">expand_less</i>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4
              className="p-2 pt-4 text-center"
              style={titleStyle}
              id="timer-label"
            >
              {this.state.switcher ? "Break" : "Session"}
            </h4>
            <h2
              id="time-left"
              className="p-5  bg-warning col-5 mx-auto text text-center"
              style={timerStyle}
            > 
            {this.mmss()}
            </h2>
          </div>
          <div className="controls mt-5 container ">
            <h4
              className="p-2 pt-4 text-center"
              style={titleStyle}
              id="controls-label"
            >
              Controls
            </h4>
            <div className="container d-flex justify-content-center align-items-center">
              <i
                className=" btn-lg btn-warning   material-icons m-2  "
                style={controlStyle}
                id="start_stop"
                onClick={this.handlePlayPause}
              >
                {this.state.playing ? "pause" : "play_arrow"}
              </i>

              <i
                className=" btn-lg btn-warning  material-icons m-2 "
                style={controlStyle}
                id="reset"
                onClick={this.handleReset}
              >
                replay
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const titleStyle = {
  fontFamily: "Fredoka One",
};
const timerStyle = {
  fontFamily: "Jost",
  borderRadius: 100,
};

const controlStyle = {
  borderRadius: 100,
};
