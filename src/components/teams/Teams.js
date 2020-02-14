import React, { Component } from "react";
import TeamsList from "./TeamsList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';

let json = [];

const fetchAndLog = async () => {
  const response = await fetch(
    `https://www.thebluealliance.com/api/v3/event/2020onosh/teams`,
    {
      headers: {
        "X-TBA-Auth-Key": `rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7`
      }
    }
  );
  const json_temp = await response.json();
  for (let i = 0; i < json_temp.length; i++) {
    json.push(json_temp[i].team_number);
  }
  console.log(json);

};

fetchAndLog();

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartVisible: new Array(json.length),
      o: 0,
      p: 0,
      data : [],
      check:true
    
    };
    this.state.chartVisible.fill(false);

  }
  


  countTrues(arr) {
    let count = 0;
    for(let i = 0; i < arr.length; i++)
      if(arr[i]) count++; 
    return count;
  }

  onClicked = (element, indexOfElem) => {
    this.setState(() => 
      (this.state.chartVisible[indexOfElem] = !this.state.chartVisible[indexOfElem])
    )
    console.log("team: " + element)
    this.setState({o: element})
    this.state.p = indexOfElem
    console.log(this.props.match_forms[0]);
    if(this.state.check){
      for(let i=0; i<this.props.match_forms.length;i++){
        this.state.data.push(this.props.match_forms[i]);
      }
      this.setState({check:false});
    }
    console.log(this.state.data);
  }
  
  charts = (e, dataIn, ind) => {
    return (
      <div>
        Info about the team: {e}
        {console.log(dataIn[ind])}
        <XYPlot margin={{bottom: 100, left:50}} xType="ordinal" width={300} height={300} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-45} />
      <YAxis />
      <VerticalBarSeries
        data={[
          {x: 'Upper Scored', y: dataIn[ind].shots[0].score},
          {x: 'Lower Scored', y: dataIn[ind].shots[1].score},
          {x: 'Missed', y: dataIn[ind].shots[2].score}

        ]}
      />

    </XYPlot>
    <XYPlot margin={{bottom: 75, left:50}} xType="ordinal" width={300} height={300} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-45} />
      <YAxis />
      <VerticalBarSeries
        data={[
          {x: 'Cycle Time', y: dataIn[ind].average_cycle_time},
          {x: 'Climb Time', y: dataIn[ind].climb_time},
          {x: 'Defence Time', y: dataIn[ind].defence_time}
        ]}
      />

    </XYPlot>
      </div>
    )
  }

  render() {


    let buttons = [];
    for(let i = 0; i < json.length; i++)
      buttons.push(json[i]);

    let i = 0, j = 0, k = 0, l = 0;
    let teamN = 0;

    const { match_forms, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    

    return (
      
      <div>
        
        <div className="align-baseline" role="group" arial-label="Basic Example">
          {buttons.map((currElement, index) =>(
            <button onClick={() => { 
              if ( this.state.chartVisible[index] || this.countTrues(this.state.chartVisible) < 3 ) { 
                { this.onClicked(currElement, index); }
              } 
            }} 
              key={buttons[k++]} 
              style={ { width:"75px", height:"50px",background:"green", border: this.state.chartVisible[index] ? "2px solid black" : null }} > 
              {buttons[i++]} 
            </button>
          ))}
        </div>
        <div>
          <table className="align-baseline" role="group">
            <tbody>
              <tr>
                {this.state.chartVisible.map((currElement, index) => 
                  this.state.chartVisible[index] ? 
                  (<td key={index} style={{ color: "red"}}>{this.charts(buttons[index], this.state.data, index)}</td>) : null
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <TeamsList match_forms={match_forms} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    match_forms: state.firestore.ordered.match_forms,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
    
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "match_forms", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Teams);