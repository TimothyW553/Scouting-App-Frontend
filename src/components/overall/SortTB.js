import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import firebase from "../../config/fbConfig.js";

let refresh = async function(asfunc, f1args, func2, f2args, that) {
  await asfunc(that, f1args);
  that.setState({ refresh: !that.state.refresh });
  func2(that, f2args);
  that.setState({ refresh: !that.state.refresh });
};

let getAvg = async (that, team_number) => {
  await firebase
    .firestore()
    .collection("match_forms")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().teamSelected == team_number) {
          let listcopy = [...that.state.balls_scored_avg];
          listcopy.push(doc.data().balls_scored);
          that.setState({ balls_scored_avg: listcopy });
        }
      });
      let len = that.state.balls_scored_avg.length;
      let sum = 0;
      that.state.balls_scored_avg.forEach(value => {
        sum += value;
      });
      that.setState({
        balls_scored_avg: len ? (sum / len).toFixed(3) : "No data"
      });
    });
};

let setAvg = that => {
  console.log(that.state);
  for (let i = 0; i < that.state.json.length; i++) {
    that.state.json[i].Average = that.state.balls_scored_avg;
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let fetchAndLog = async that => {
  const response = await fetch(
    `https://www.thebluealliance.com/api/v3/event/2020onosh/teams`,
    {
      headers: {
        "X-TBA-Auth-Key": `rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7`
      }
    }
  );

  let json_temp = await response.json();
  for (let i = 0; i < json_temp.length; i++) {
    let jsoncopy = [...that.state.json];
    jsoncopy.push({
      TeamNumber: i ? json_temp[i].team_number : 6969,
      CycleTime: getRandomInt(100),
      CycleTime: getRandomInt(100),
      Upper: getRandomInt(100),
      Lower: getRandomInt(100),
      Miss: getRandomInt(100),
      ClimbTime: getRandomInt(100),
      Preloads: getRandomInt(100),
      Average: null
    });
    that.setState({ json: jsoncopy });
  }
  console.log(that.state.json);
};

class SortTB extends Component {
  constructor() {
    super();
    this.state = {
      refresh: false,
      balls_scored_avg: [],
      json: []
    };
    fetchAndLog(this);
    // refresh(getAvg, this);
  }

  docs;

  getDocs = async () => {
    this.docs = await firebase
      .firestore()
      .collection("match_forms")
      .get()
      .then(snapshot => {
        return snapshot;
      });
  };

  getAvg = team_number => {
    let count = 0;
    let value = 0;
    let team_num = this.docs.data().teamSelected;
    this.docs.data().forEach(val => {
      if (team_number == team_num) {
        count++;
        value += val.balls_scored_avg;
      }
    });
    value /= count;
  };

  componentDidMount() {
    // fetchAndLog(this);
    refresh(getAvg, 6969, setAvg, null, this);
  }

  render() {
    // this.getAvg();
    return (
      <div className="card text-center">
        <div className="card-header">Overall Table</div>
        <div className="card-body">
          <BootstrapTable
            ref="table"
            data={this.state.json}
            multiColumnSort={2}
          >
            <TableHeaderColumn
              width="120"
              dataField="TeamNumber"
              isKey={true}
              dataSort={true}
            >
              Team #
            </TableHeaderColumn>
            <TableHeaderColumn
              width="120"
              dataField="CycleTime"
              dataSort={true}
            >
              Avg. Cycle Time
            </TableHeaderColumn>
            <TableHeaderColumn width="120" dataField="Upper" dataSort={true}>
              Avg. Balls Upper
            </TableHeaderColumn>
            <TableHeaderColumn width="120" dataField="Lower" dataSort={true}>
              Avg. Balls Lower
            </TableHeaderColumn>
            <TableHeaderColumn width="120" dataField="Miss" dataSort={true}>
              Avg. Balls Missed
            </TableHeaderColumn>
            <TableHeaderColumn width="120" dataField="Average" dataSort={true}>
              Avg. Balls Shot
            </TableHeaderColumn>
            <TableHeaderColumn
              width="120"
              dataField="ClimbTime"
              dataSort={true}
            >
              Avg. Climb Time
            </TableHeaderColumn>
            <TableHeaderColumn
              width="120"
              dataField="ClimbTime"
              dataSort={true}
            >
              Avg. Defence Time
            </TableHeaderColumn>
            <TableHeaderColumn width="120" dataField="Preloads" dataSort={true}>
              Avg. Preloads
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
// console.log([...document.getElementsByClassName("table table-bordered")]);

export default SortTB;
