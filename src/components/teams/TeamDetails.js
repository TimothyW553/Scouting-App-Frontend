import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

function average(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

const ProjectDetails = props => {
  const { match_form, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (match_form) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{match_form.team_num}</span>
            <p>Match Number: {match_form.match_num}</p>
            <p>Defence Time: {match_form.defence_time / 1000}</p>
            <p>Climb Time: {match_form.climb_time / 1000}</p>
            <p>Balls scored: {match_form.balls_scored}</p>
            <p>Climb Time: {match_form.climb_time / 1000}</p>
            <p>Upper Scored: {match_form.shots[0].score}</p>
            <p>Lower Scored: {match_form.shots[1].score}</p>
            <p>Miss Scored: {match_form.shots[2].score}</p>
            <p>Floor pickup: {match_form.floor_pickup ? "True" : "False"}</p>
            <p>Station pickup: {match_form.station_pickup ? "True" : "False"}</p>
            <p>Stage 2 Activate: {match_form.stage2_activate ? "True" : "False"}</p>
            <p>Stage 3 Activate: {match_form.stage3_activate ? "True" : "False"}</p>
            <p>Average Cycle Time: {average(match_form.cycle_time).toFixed(4)}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {match_form.authorFirstName} {match_form.authorLastName}
            </div>
            <div>{moment(match_form.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const match_forms = state.firestore.data.match_forms;
  const match_form = match_forms ? match_forms[id] : null;
  return {
    match_form: match_form,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "match_forms"
    }
  ])
)(ProjectDetails);
