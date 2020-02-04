import React, { Component } from "react";
import { connect } from "react-redux";
import { createMatchForm } from "../../store/actions/matchFormActions";
import { Redirect, withRouter } from "react-router-dom";
import "./style.css";

const red_field = "./red-field.jpg";
const blue_field = "./blue-field.jpg";
const circleimg = "./circle.png";
const field_size = 8;

// x = [[], [], [], [], []];
// for (i = 0; i < 10; i++) {
//   for (I = 0; I < 5; I++) {
//     var y = x;
//     x[I] = y;
//   }
// }
// console.log(x);

// while (true) {handleSubmit(x)}

function Counter(props) {
  return (
    <div className="counter">
      <button
        className="counter-action decrement"
        onClick={function() {
          props.onChange(props.score > 0 ? -1 : 0);
        }}
      >
        {" "}
        -{" "}
      </button>
      <div className="counter-score"> {props.score} </div>
      <button
        className="counter-action increment"
        onClick={function() {
          props.onChange(+1);
        }}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
}

function Shot(props) {
  return (
    <div className="shot">
      <div className="shot-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}

function Circle(props, doclick) {
  let circle = index => {
    return (
      <img
        key={props.shooting_pos[index].index}
        src={require(`${circleimg}`)}
        width={props.circle_size}
        height={props.circle_size}
        onClick={doclick}
        style={{
          position: "absolute",
          left:
            props.shooting_pos[index].x +
            document.getElementById("clickyimg").getBoundingClientRect().left -
            props.circle_size / 2 +
            "px",
          top:
            props.shooting_pos[index].y +
            document.getElementById("clickyimg").getBoundingClientRect().top -
            props.circle_size / 2 +
            "px"
        }}
      ></img>
    );
  };
  let circles = props.shooting_pos.map(index => {
    return circle(index.index);
  });
  return <React.Fragment>{circles}</React.Fragment>;
}

function Timer(props, doclick) {
  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        doclick();
      }}
    >
      {(props.timer_running === null ? "Start" : "Stop") +
        " timer: " +
        props.timer[0] / 1000 +
        "s"}
    </button>
  );
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_num: 0,
      cycle_time: [0.0],
      climb_time: 0.0,
      balls_scored: 0,
      floor_pickup: false,
      station_pickup: false,
      stage2_activate: false,
      stage3_activate: false,
      trench: false,
      preloads: 0,
      shooting_pos: [],
      time: 0,
      isOn: false,
      start: 0,
      inMatchView: 0,
      circle_size: 150,
      circle_show: true,
      timer_running: null,
      timer: [0, 0],
      shots: [
        {
          type: "high",
          score: 0,
          id: 1
        },
        {
          type: "low",
          score: 0,
          id: 2
        },
        {
          type: "miss",
          score: 0,
          id: 3
        }
      ]
    };
    // this.startTimer = this.startTimer.bind(this);
    // this.stopTimer = this.stopTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
  }

  onScoreChange(index, delta) {
    this.state.shots[index].score += delta;
    this.setState(this.state);
  }

  showPreMatch = e => {
    e.preventDefault();
    this.setState({ inMatchView: 1 });
    console.log(this.state);
  };

  showInMatch = e => {
    e.preventDefault();
    this.setState({ inMatchView: 2, preloads: this.state.balls_scored });
    console.log(this.state);
  };

  showEndMatch = e => {
    e.preventDefault();
    this.setState({ inMatchView: 3 });
    console.log(this.state);
  };

  handleChange = e => {
    if (isNaN(e.target.value)) {
      this.setState({
        [e.target.id]: e.target.value
      });
    } else {
      this.setState({
        [e.target.id]: Number(e.target.value)
      });
    }
    console.log(this.state);
  };

  handleNext = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createMatchForm(this.state);
    this.props.history.push('/');
  }

  togglecircledisplay = () => {
    this.setState({ circle_show: !this.state.circle_show });
  };

  clicky = e => {
    let x = e.clientX;
    let y = e.clientY;
    x = Number(
      x - document.getElementById("clickyimg").getBoundingClientRect().left
    ).toFixed(0);
    y = Number(
      y - document.getElementById("clickyimg").getBoundingClientRect().top
    ).toFixed(0);
    if (
      x >= 0 &&
      y >= 0 &&
      x <=
        document.getElementById("clickyimg").getBoundingClientRect().right -
          document.getElementById("clickyimg").getBoundingClientRect().left &&
      y <=
        document.getElementById("clickyimg").getBoundingClientRect().bottom -
          document.getElementById("clickyimg").getBoundingClientRect().top
    ) {
      let shooting_pos_copy = [...this.state.shooting_pos];
      shooting_pos_copy.push({
        x: Number(x),
        y: Number(y),
        index: this.state.shooting_pos.length
      });
      this.setState({ shooting_pos: shooting_pos_copy });
      console.log(this.state);
    }
  };

  incrementPreload = e => {
    e.preventDefault();
    if (this.state.balls_scored + 1 > 3) {
      this.setState({
        balls_scored: 3
      });
    } else {
      this.setState({
        balls_scored: this.state.balls_scored + 1
      });
    }
  };

  resetPreload = e => {
    e.preventDefault();
    this.setState({
      balls_scored: 0
    });
  };

  handleButtonClick = () => {
    this.setState({
      timer: [
        this.state.timer_running === null
          ? this.state.timer[0]
          : this.state.timer[0] +
            new Date().getTime() -
            this.state.timer_running,
        this.state.timer[1]
      ]
    });
    if (this.state.timer_running != null) {
      this.setState({ timer_running: null });
    } else {
      this.setState({ timer_running: new Date().getTime() });
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    let newMatchForm =
      this.state.inMatchView === 0 ? (
        <form className="white" onSubmit={this.showPreMatch}>
          <div className="input-field">
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              Enter the current match number:
            </p>
            <input
              type="number"
              id="match_num"
              onChange={this.handleChange}
              placeholder="Match number"
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Next</button>
          </div>
        </form>
      ) : null;

    let prematch =
      this.state.inMatchView === 1 ? (
        <form className="white" onSubmit={this.showInMatch}>
          <div className="input-field">
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              Number of Preloads
            </p>
            <button
              type="number"
              id="balls_scored"
              onClick={this.incrementPreload}
              className="preload increment"
            >
              Preloads: {this.state.balls_scored}
            </button>
            <button
              type="number"
              id="balls_scored"
              onClick={this.resetPreload}
              className="preload decrement"
            >
              Reset Preloads
            </button>
          </div>
          <div className="input-field">
            <button
              className="btn pink lighten-1"
              onSubmit={() => {
                this.showInMatch();
              }}
            >
              Next
            </button>
          </div>
        </form>
      ) : null;

    let matchField = (
      <img
        src={require(`${red_field}`)}
        width={76 * field_size}
        height={47 * field_size}
        onClick={this.clicky}
        id="clickyimg"
      ></img>
    );

    let endMatchForm = this.state.inMatchView === 3 ? (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <div className="input-field">
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              Number of Preloads
            </p>
            <button
              type="number"
              id="balls_scored"
              onClick={this.incrementPreload}
              className="preload increment"
            >
              Preloads: {this.state.balls_scored}
            </button>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">
              Next
            </button>
          </div>
        </form>
      </div>
    ) : null;

    let inMatchForm = this.state.inMatchView === 2 ? matchField : null;

    let showncircle = this.state.circle_show
      ? Circle(this.state, this.clicky)
      : null;

    let toggle_circle_button_text =
      (this.state.circle_show ? "Hide" : "Show") + " map";

    let scoreboard =
      this.state.inMatchView === 2 ? (
        <span className="scoreboard">
          <span className="shots">
            {this.state.shots.map(
              function(shot, index) {
                return (
                  <Shot
                    onScoreChange={function(delta) {
                      this.onScoreChange(index, delta);
                    }.bind(this)}
                    score={shot.score}
                    key={index}
                  />
                );
              }.bind(this)
            )}
          </span>
        </span>
      ) : null;

    let field_input =
      this.state.inMatchView === 2 ? (
        <div>
          <table className="FieldInput">
            <tbody>
              <tr>
                <td>
                  {scoreboard} {Timer(this.state, this.handleButtonClick)}
                </td>
                <td width="500px">{inMatchForm}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    id="togglecircle"
                    onClick={() => {
                      this.togglecircledisplay();
                    }}
                  >
                    {toggle_circle_button_text}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {showncircle}   
          <div className="input-field">
            <button className="btn pink lighten-1" onClick={this.showEndMatch}>
              Next
            </button>
          </div>
        </div>
      ) : null;

    return (
      <div>
        <div>{}</div>
        <span>
          {newMatchForm}
          {prematch}
          {/* {team_select} */}
          {field_input}
          {endMatchForm}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMatchForm: project => dispatch(createMatchForm(project))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
