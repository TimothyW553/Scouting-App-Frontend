import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import firebase from "../../config/fbConfig.js";

let getAvg = async that => {
  firebase
    .firestore()
    .collection("match_forms")
    .get()
    .then(snapshot => {
      that.snap_Loaded(snapshot.docs);
    });
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
      TeamNumber: json_temp[i].team_number,
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
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      json: []
    };
    fetchAndLog(this);
    // refresh(getAvg, this);
  }

  that = this.props.that;

  snap_Loaded(docs1) {
    this.that.setState({ docs: docs1, data: docs1[0].data() });
    // for (let i = 0; i < this.state.json.length; i++) {
    //   let idata = this.that.state.docs;
    //   for (let I = 0; I < idata.length; I++) {
    //     if (this.state.json[i].TeamNumber == idata.team_number) {
    //       this.state.json[i].Average = idata.balls_scored;
    //     }
    //   }
    // }
    // this.setState({ json: this.that.state.docs });
  }

  componentDidMount() {
    // fetchAndLog(this);
    // refresh(getAvg, setAvg, this);
  }

  render() {
    let that = this.props.that;
    getAvg(this);
    // this.getAvg();
    return (
      <div className="card text-center">
        <button
          onClick={() => {
            this.setState({ refresh: !this.state.refresh });
          }}
        >
          refresh
        </button>
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
