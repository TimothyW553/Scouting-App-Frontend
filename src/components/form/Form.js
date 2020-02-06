import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import InMatch from './InMatch'
import { createMatchForm } from '../../store/actions/matchFormActions';

class Form extends Component {
  state = {
    match_num: 0,
    team_tum: 0,
    cycle_time: [0.0],
    climb_time: 0.0,
    balls_scored: 0,
    outer: 0,
    lower: 0,
    miss: 0,
    pickup: 0,
    max_pickup: 0,
    floor_pickup: false,
    station_pickup: false,
    defense_time: 0.0,
    stage2_activate: false,
    stage3_activate: false,
    trench: false,
    preloads: 0,
    shooting_pos: [{"x": 0.0, "y": 0.0}]
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
    return (
      <div>
        <InMatch/>
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