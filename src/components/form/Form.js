import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
// import Checkbox from './Checkbox'

const imageurl = "https://i.ibb.co/FbLRpF2/field.jpg";

const image_button = (
  <button onClick={clicky}>
    <img src={imageurl} width="620" height="360" id="clickyimg"></img>
  </button>
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
  state = {
    match_num: '',
    team_tum: '',
    cycle_time: '',
    climb_time: '',
    balls_scored: '',
    outer: '',
    lower: '',
    miss: '',
    pickup: '',
    max_pickup: '',
    floor_pickup: '',
    station_pickup: '',
    defense_time: '',
    stage2_activate: '',
    stage3_activate: '',
    trench: '',
    preloads: '',
    shooting_pos: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div>
        {image_button}
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
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)