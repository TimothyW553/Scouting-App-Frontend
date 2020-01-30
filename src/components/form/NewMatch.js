import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createMatchForm } from '../../store/actions/matchFormActions';

class NewMatch extends Component {
  state = {
    match_num: 0,
    isClicked: false
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

  printState() {
    console.log(this.state);
  }  

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="card text-center">
        <div className="card-header" style={{fontWeight: 'bold'}}>
          Scouting Match Form
        </div>
        <div className="card-body">
          <div className="card text-left">
            <div className="card-header">
              New Match
            </div>
            <div className="card-body">
              <form className="white" onSubmit={this.handleNext}>
                <div className="input-field">
                  <p style={{fontWeight: 'bold', fontSize: 25}}>Enter the current match number:</p>
                  <input type='number' id="match_num" onChange={this.handleChange} placeholder="Match number"/>
                </div>
                <div className="input-field">
                  <button className="btn pink lighten-1">Next</button>
                </div>
              </form>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewMatch)