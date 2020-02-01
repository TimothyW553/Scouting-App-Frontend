import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createMatchForm } from '../../store/actions/matchFormActions'
import ReactStopwatch from 'react-stopwatch'
import './style.css'

const red_field = './red-field.jpg';
const blue_field = './blue-field.jpg';

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function () { props.onChange(-1); }}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function () { props.onChange(+1); }}> + </button>
    </div>
  );
}

function Shot(props) {
  return (
    <div className="shot">
      <div className="shot-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
};

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
      defense_time: 0.0,
      stage2_activate: false,
      stage3_activate: false,
      trench: false,
      preloads: 0,
      shooting_pos: [],
      time: 0,
      isOn: false,
      start: 0,
      inMatchView: 0,
      shots:[
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
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  onScoreChange(index, delta) {
    this.state.shots[index].score += delta;
    this.setState(this.state);
  }
  
  startTimer() {
    this.setState({
      isOn: true,
      timer: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0, isOn: false})
  }

  showPreMatch = (e) => {
    e.preventDefault();
    this.setState({inMatchView: 1})
    console.log(this.state);
  }

  showInMatch = (e) => {
    e.preventDefault();
    this.setState({inMatchView: 2, preloads: this.state.balls_scored})
    console.log(this.state);
  }

  showEndMatch = (e) => {
    e.preventDefault();
    this.setState({inMatchView: 3})
    console.log(this.state);
  }

  handleChange = (e) => {
    if(isNaN(e.target.value)) {
      this.setState({
        [e.target.id]: e.target.value
      })
    } else {
      this.setState({
        [e.target.id]: Number(e.target.value)
      })
    }
    console.log(this.state);
  }

  handleNext = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createMatchForm(this.state);
    this.props.history.push('/');
  }

  clicky = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    x = Number(x - document.getElementById("clickyimg").getBoundingClientRect().left).toFixed(0);
    y = Number(y - document.getElementById("clickyimg").getBoundingClientRect().top).toFixed(0)
    this.state.shooting_pos.push({"x": Number(x), "y": Number(y)})
    console.log(this.state)
  }

  incrementPreload = (e) => {
    e.preventDefault();
    if(this.state.balls_scored + 1 > 3) {
      this.setState({
        balls_scored : 3
      })
    } else {
      this.setState({
        balls_scored: this.state.balls_scored + 1
      })
    }
  }

  resetPreload = (e) => {
    e.preventDefault();
    this.setState({
      balls_scored: 0
    })
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    let newMatchForm = (this.state.inMatchView === 0) ?
      <form className="white" onSubmit={this.showPreMatch}>
        <div className="input-field">
          <p style={{fontWeight: 'bold', fontSize: 25}}>Enter the current match number:</p>
          <input type='number' id="match_num" onChange={this.handleChange} placeholder="Match number"/>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Next</button>
        </div>
      </form> : null

    let prematch = (this.state.inMatchView === 1) ? (
      <form className="white" onSubmit={this.showInMatch}>
        <div className="input-field">
          <p style={{fontWeight: 'bold', fontSize: 25}}>Number of Preloads</p>
          <button type='number' id="balls_scored" onClick={this.incrementPreload} className="preload increment">
            Preloads: {this.state.balls_scored}
            </button>
          <button type='number' id="balls_scored" onClick={this.resetPreload} className="preload decrement">
            Reset Preloads
            </button>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1" onSubmit={this.showInMatch}>Next</button>
        </div>
      </form>
    ) : null

    let matchField = <img src={require(`${red_field}`)} width="760" height="470" onClick={this.clicky} id="clickyimg"></img>
    
    let inMatchForm = (this.state.inMatchView === 2) ? matchField : null

    let scoreboard = (this.state.inMatchView === 2) ? (
      <span className="scoreboard">
        <span className="shots">
          {this.state.shots.map(function (shot, index) {
            return (
              <Shot
                onScoreChange={function (delta) { this.onScoreChange(index, delta) }.bind(this)}
                score={shot.score} key = {index}
                />
            );
          }.bind(this))}
        </span>
      </span>
    ) : null

    let field_input = (this.state.inMatchView === 2) ? 
      <div>
        <table className="FieldInput">
          <tbody>
            <tr>
              <td>{scoreboard}</td>
              <td>{inMatchForm}</td>
            </tr>
          </tbody>
        </table> 
        <div className="input-field">
          <button className="btn pink lighten-1" onSubmit={this.showEndMatch}>Next</button>
        </div>
      </div>: null
      
    let endform = (this.state.inMatchView === 3) ? (
      <div>

      </div>
    ) : null
    
    let team_select = (this.state.inMatchView === 2) ? (
      <div className="card text-left">
        <div className="card-header">
          Team Select
        </div>
        <div className="card-body">

        </div>
      </div> ): null

    let start = (this.state.time === 0) ? <button onClick={this.startTimer}>start</button> : null
    let stop = (this.state.isOn) ? <button onClick={this.stopTimer}>stop</button> : null
    let reset = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.resetTimer}>reset</button> : null
    let resume = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.startTimer}>resume</button> : null

    return (
      <div>
        <div>
        {}
        </div>
        <span>
          {newMatchForm}
          {prematch}
          {/* {team_select} */}
          {field_input}
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMatchForm: (project) => dispatch(createMatchForm(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)