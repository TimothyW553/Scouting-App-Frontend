import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createMatchForm } from '../../store/actions/matchFormActions';

const imageurl = "https://i.ibb.co/FbLRpF2/field.jpg";

const image_button = (
    <img src={imageurl} width="736" height="400" onClick={clicky} id="clickyimg"></img>
);

function clicky(event) {
  let x = event.clientX;
  let y = event.clientY;
  console.log(
    x - document.getElementById("clickyimg").getBoundingClientRect().left,
    y - document.getElementById("clickyimg").getBoundingClientRect().top
  )
}
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
      shooting_pos: [{"x": 0.0, "y": 0.0}],
      time: 0,
      isOn: false,
      start: 0,
      inMatchView: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
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
    // console.log(this.state);
    this.props.createMatchForm(this.state);
    this.props.history.push('/');
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

    let inMatchForm = (this.state.inMatchView) ? image_button : null

    let start = (this.state.time === 0) ? <button onClick={this.startTimer}>start</button> : null
    let stop = (this.state.isOn) ? <button onClick={this.stopTimer}>stop</button> : null
    let reset = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.resetTimer}>reset</button> : null
    let resume = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.startTimer}>resume</button> : null

    return (
      <div className="card text-center">
        <div className="card-header" style={{fontWeight: 'bold'}}>
          Scouting Match Form
        </div>
        <div className="card-body">
          {newMatchForm}
          {inMatchForm}
        </div>
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