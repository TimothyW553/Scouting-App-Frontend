import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createMatchForm } from '../../store/actions/matchFormActions';
import './style.css'

const imageurl = "https://i.ibb.co/FbLRpF2/field.jpg";

let PLAYERS = [
  {
    name: "high",
    score: 0,
    id: 1  
  },
  {
    name: "low",
    score: 0,
    id: 2
  },
  {
    name: "miss",
    score: 0,
    id: 3
  }
];

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function () { props.onChange(-1); }}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function () { props.onChange(+1); }}> + </button>
    </div>
  );
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-score">
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
      outer: 0,
      lower: 0,
      miss: 0,
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
      inMatchView: false,
      players: PLAYERS
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  onScoreChange(index, delta) {
    this.state.players[index].score += delta;
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

  showInMatch = (e) => {
    e.preventDefault();
    this.setState({inMatchView: true})
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

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    let newMatchForm = (!this.state.inMatchView) ?
      <div className="card text-left">
        <div className="card-header">
          New Match
        </div>
        <div className="card-body">
          <form className="white" onSubmit={this.showInMatch}>
            <div className="input-field">
              <p style={{fontWeight: 'bold', fontSize: 25}}>Enter the current match number:</p>
              <input type='number' id="match_num" onChange={this.handleChange} placeholder="Match number"/>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1">Next</button>
            </div>
          </form>
        </div>
      </div> : null

    let matchField = <img src={imageurl} width="736" height="400" onClick={this.clicky} id="clickyimg"></img>
    
    let inMatchForm = (this.state.inMatchView) ? matchField : null

    let scoreboard = (this.state.inMatchView) ? (
      <div className="scoreboard">
        <div className="players">
          {this.state.players.map(function (player, index) {
            return (
              <Player
                onScoreChange={function (delta) { this.onScoreChange(index, delta) }.bind(this)}
                score={player.score} key = {index}
                />
                
            );
          }.bind(this))}
        </div>
      </div>
    ) : null

    let start = (this.state.time === 0) ? <button onClick={this.startTimer}>start</button> : null
    let stop = (this.state.isOn) ? <button onClick={this.stopTimer}>stop</button> : null
    let reset = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.resetTimer}>reset</button> : null
    let resume = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.startTimer}>resume</button> : null

    return (
      <div className="card text-center">
        <div className="card-header" style={{fontWeight: 'bold'}}>
          Scouting Match Form
        </div>
        <span className="card-body">
          {newMatchForm}
          {inMatchForm}
          {scoreboard}
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