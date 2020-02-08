import React, { Component } from "react";
import { connect } from "react-redux";
import { createMatchForm } from "../../store/actions/matchFormActions";
import { Redirect, withRouter } from "react-router-dom";
import "./style.css";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const red_field = "./red-field.jpg";
const blue_field = "./blue-field.jpg";
const circleimg = "./circle.png";
const field_size = 8;
const CompetingTeams_Array = [
  { label: "Red 1: 610", value: 1 },
  { label: "Red 2: 690", value: 2 },
  { label: "Red 3: 420", value: 3 },
  { label: "Blue 1: 1111", value: 4 },
  { label: "Blue 2: 6969", value: 5 },
  { label: "Blue 3: 4200", value: 6 }
];

let starting_time;

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

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer_running: null,
      timer: 0
    };
  }
  render() {
    let that = this.props.this;
    return (
      <button
        className="btn btn-danger"
        style={{ height: "60px" }}
        onClick={() => {
          if (!this.state.timer_running) {
            this.setState({ timer_running: new Date().getTime() });
          } else {
            this.setState({
              timer_running: null,
              timer:
                this.state.timer +
                new Date().getTime() -
                this.state.timer_running
            });
          }
        }}
      >
        {(this.state.timer_running === null
          ? this.props.displayName
          : "Stop Timer") +
          ": " +
          (this.state.timer / 1000).toFixed(3) +
          "s"}
      </button>
    );
  }
}

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.type === Boolean ? false : null };
  }
  render() {
    return (
      <tr>
        <th style={{ width: "30px", paddingTop: "0px", paddingBottom: "0px" }}>
          <button
            onClick={() => {
              this.setState({ value: !this.state.value });
              console.log(!this.state.value);
              this.props.doClick({
                [this.props.statename]: !this.state.value
              });
            }}
            style={{ border: "1px solid black" }}
          >
            <div style={{ height: "20px", width: "10px" }}>
              {this.state.value ? "✓" : null}
            </div>
          </button>
        </th>
        <th style={{ width: "30px", paddingTop: "0px", paddingBottom: "0px" }}>
          <div style={{ height: "11px" }}></div>
          <p>{this.props.displayName}</p>
        </th>
      </tr>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_num: 0,
      cycle_time: [],
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
      circle_size: 50,
      circle_show: true,
      timers: [0, 0, 0, 0, 0],
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
      ],
      teamSelected: null
    };
  }

  Circle(props) {
    try {
      let circle = index => {
        return (
          <img
            key={props.shooting_pos[index].index}
            src={require(`${circleimg}`)}
            width={props.circle_size}
            height={props.circle_size}
            onClick={() => {
              this.clicky(window.event);
            }}
            style={{
              position: "absolute",
              left:
                props.shooting_pos[index].x +
                document.getElementById("clickyimg").getBoundingClientRect()
                  .left -
                props.circle_size / 2 +
                "px",
              top:
                props.shooting_pos[index].y +
                document.getElementById("clickyimg").getBoundingClientRect()
                  .top -
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
    } catch {
      return null;
    }
  }

  updateTeamChange = () => {
    try {
      this.setState({
        teamSelected: document.getElementsByClassName(
          "  css-1uccc91-singleValue"
        )[0].innerText
      });
    } catch {}
  };

  onScoreChange = (index, delta) => {
    this.state.shots[index].score += delta;
    if ((this.state.shots[0].score + this.state.shots[1].score) % 5 === 0) {
      this.state.cycle_time.push((new Date().getTime() - starting_time) / 1000);
    }
    this.setState(this.state);
  };

  showPreMatch = e => {
    e.preventDefault();
    this.setState({ inMatchView: 1 });
    console.log(this.state);
  };

  showInMatch = e => {
    e.preventDefault();
    this.setState({ inMatchView: 2, preloads: this.state.balls_scored });
    starting_time = new Date().getTime();
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

  handleNext = e => {
    e.preventDefault();
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createMatchForm(this.state);
    this.props.history.push("/");
  };

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
            <button className="btn pink lighten-1" id="button1">
              Next
            </button>
          </div>
        </form>
      ) : null;

    let CompetingTeams =
      this.state.inMatchView === 1 ? (
        <div className="spacer">
          <h1> </h1>
          {/* <div className="container"> */}
          <div className="row">
            <div className="col-md-4" style={{ marginLeft: "15px" }}>
              <h5 style={{ fontWeight: "bold" }}>
                Select The Team You're Scouting
              </h5>
              <div onClick={this.updateTeamChange} id="teamSelect2">
                <Select
                  options={CompetingTeams_Array}
                  id="teamSelect"
                  ref="teamselect"
                />
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          {/* </div> */}
        </div>
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
              onClick={this.updateTeamChange}
              className="btn pink lighten-1"
              onSubmit={() => {
                this.getCurrentTime();
              }}
              id="button2"
            >
              Next
            </button>
          </div>
        </form>
      ) : null;

    let matchField = (
      <img
        src={require(`${red_field}`)}
        width={76 * 1.3 * field_size}
        height={47 * 1.3 * field_size}
        onClick={this.clicky}
        id="clickyimg"
      ></img>
    );

    let boolCheckMap = () => {
      let boolCheckMapList = [
        ["Floor Pickup", "floor_pickup"],
        ["Station Pickup", "station_pickup"],
        ["Stage 2 Activated", "stage2_activate"],
        ["Stage 3 Activated", "stage3_activate"],
        ["Can Go Through Trench", "trench"]
      ];
      return boolCheckMapList.map(index => (
        <Checkbox
          key={index[0]}
          type={Boolean}
          displayName={index[0]}
          doClick={state => {
            this.setState(state);
          }}
          statename={index[1]}
          key={index[1]}
        />
      ));
    };

    let endMatchForm =
      this.state.inMatchView === 3 ? (
        <div className="container">
          <div className="input-field">
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              End of Match Form
            </p>
          </div>
          <table>
            <tbody>{boolCheckMap()}</tbody>
          </table>

          <form className="white" onSubmit={this.handleSubmit}>
            <div className="input-field">
              <button className="btn pink lighten-1" id="button4">
                Next
              </button>
            </div>
          </form>
        </div>
      ) : null;

    let inMatchForm = this.state.inMatchView === 2 ? matchField : null;

    let showncircle = this.state.circle_show ? this.Circle(this.state) : null;

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
                  <Timer this={this} index="0" displayName="Defence Timer" />
                  <br /> <br />
                  {scoreboard}
                  <br />
                  <Timer this={this} index="1" displayName="Climb Timer" />
                </td>
                <td width="500px">{inMatchForm}</td>
              </tr>
            </tbody>
          </table>
          {showncircle}   
          <div className="input-field">
            <button
              className="btn pink lighten-1"
              onClick={this.showEndMatch}
              id="button3"
            >
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
          {CompetingTeams}
          {prematch}
          {/* {team_select} */}
          {field_input}
          {endMatchForm}
        </span>
      </div>
    );
  }
  componentDidMount() {
    document.getElementById("button1").focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inMatchView != this.state.inMatchView) {
      document.getElementById("button" + (this.state.inMatchView + 1)).focus();
    }
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
