import React, { Component } from "react";
import TeamsList from "./TeamsList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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
  }

  charts = (e, data) => {
    return (
      <div>
        Info about the team: {e}
        {console.log(e)}
        <BarChart width={300} height={300} data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name " />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    )
  }

  render() {

    let data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100
      }
    ];
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
              style={{ border: this.state.chartVisible[index] ? "2px solid black" : null }} > 
              {buttons[i++]} 
            </button>
          ))}
        </div>
        <div className="align-baseline" role="group">
          {this.state.chartVisible.map((currElement, index) => 
            this.state.chartVisible[index] ? 
            (<td style={{ color: "red"}}>{this.charts(buttons[index], data)}</td>) : null
          )}
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
