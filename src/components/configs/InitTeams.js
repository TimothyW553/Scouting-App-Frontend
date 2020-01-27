import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/teamActions";
import { Redirect } from "react-router-dom";

let fetch_teams = [];
let event = '2020onwat'
const fetchAndLog = async() => {
  const response = await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/teams`, {
    headers: {
      'X-TBA-Auth-Key': `rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7`
    }
  });
  const json_temp = await response.json();
  for(let i = 0; i < json_temp.length; i++) {
    fetch_teams.push(
      json_temp[i].team_number
    );
  }
}

class InitTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_id: "",
      teams: []
    }
    fetchAndLog();
    this.state.teams = fetch_teams;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createEvent(this.state);
    console.log(this.state);
    console.log(this.state.teams);
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create Teams For Event</h5>
          <div className="input-field">
            <input type="text" id="event_id" onChange={this.handleChange} />
            <label htmlFor="event_id">Event ID</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
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
    createEvent: project => dispatch(createEvent(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitTeams);
