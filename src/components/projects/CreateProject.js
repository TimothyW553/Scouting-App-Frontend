import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

class CreateProject extends Component {
  state = {
    team_num: "",
    drive_speed: "",
    shooter_mech: "",
    climb_mech: "",
    spin_mech: "",
    type: "",
    comments: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Expert Scouting Comments</h5>
          <div className="input-field">
            <input type="text" id="team_num" onChange={this.handleChange} />
            <label htmlFor="team_num">Team Number</label>
          </div>
          <div className="input-field">
            <input type="text" id="drive_speed" onChange={this.handleChange} />
            <label htmlFor="drive_speed">Drive Train Speed</label>
          </div>
          <div className="input-field">
            <input type="text" id="shooter_mech" onChange={this.handleChange} />
            <label htmlFor="shooter_mech">Shooter Mechanism</label>
          </div>
          <div className="input-field">
            <input type="text" id="climb_mech" onChange={this.handleChange} />
            <label htmlFor="climb_mech">Climbing Mechanism</label>
          </div>
          {/* Add button for YES OR NO - Active Leveling */}
          <div className="input-field">
            <input type="text" id="spin_mech" onChange={this.handleChange} />
            <label htmlFor="spin_mech">Spinner Mechanism</label>
          </div>
          <div className="input-field">
            <input type="text" id="type" onChange={this.handleChange} />
            <label htmlFor="type">Defense, Offensive, or Both</label>
          </div>
          <div className="input-field">
            <textarea
              id="comments"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
            <label htmlFor="comments">Comments</label>
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
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
