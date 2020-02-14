import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import firebase from "../../config/fbConfig.js";

let display_list = [
  ["average_cycle_time", "AverageCycle", "Avg. Cycle Time"],
  ["preloads", "Preloads", "Avg. Preloads"],
  ["climb_time", "ClimbTime", "Avg. Climb Time"],
  ["defence_time", "DefenceTime", "Avg. Defence Time"],
  ["top", "Upper", "Avg. Balls Upper"],
  ["bot", "Lower", "Avg. Balls Lower"],
  ["miss", "Miss", "Avg. Balls Missed"],
  ["tele_top", "Tele_Upper", "Avg. Teleop Balls Upper"],
  ["tele_bot", "Tele_Lower", "Avg. Teleop Balls Lower"],
  ["tele_miss", "Tele_Miss", "Avg. Teleop Balls Missed"]
];

let getAvg = async that => {
  firebase
    .firestore()
    .collection("match_forms")
    .get()
    .then(snapshot => {
      that.snap_Loaded(snapshot.docs, display_list);
    });
};

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

// let fetchAndLog = async that => {
//   const response = await fetch(
//     `https://www.thebluealliance.com/api/v3/event/2020onosh/teams`,
//     {
//       headers: {
//         "X-TBA-Auth-Key": `rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7`
//       }
//     }
//   );

//   let json_temp = await response.json();
//   for (let i = 0; i < json_temp.length; i++) {
//     let jsoncopy = [...that.state.json];
//     jsoncopy.push({
//       TeamNumber: json_temp[i].team_number
//     });
//     that.setState({ json: jsoncopy });
//   }
//   that.state.json[0].TeamNumber = 6969;
//   that.state.json[1].TeamNumber = 188;
//   that.state.json[2].TeamNumber = 2200;
//   that.state.json[3].TeamNumber = 2609;
//   that.state.json[4].TeamNumber = 2994;

//   that.setState({});
//   console.log(that.state.json);
// };

class SortTB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    };
    // fetchAndLog(this);
  }

  that = this.props.that;

  snap_Loaded(docs1, varlist) {
    // get all the teams
    let teamsList = [];
    let used = [];
    for (let i = 0; i < docs1.length; i++) {
      if (
        !used.includes(docs1[i].data().team_num) &&
        docs1[i].data().team_num === 1 + docs1[i].data().team_num - 1
      ) {
        teamsList.push({ TeamNumber: docs1[i].data().team_num });
        used.push(docs1[i].data().team_num);
      }
    }
    this.setState({
      json: teamsList,
      teamsList: teamsList.map(x => {
        return x.TeamNumber;
      })
    });

    // varlist: list containing match form var names and display names
    for (let j = 0; j < varlist.length; j++) {
      this.that.setState({ docs: docs1, data: docs1[0].data() });
      // loop through varlist
      for (let i = 0; i < this.state.json.length; i++) {
        let docs = this.that.state.docs;
        let avg = 0;
        let listcopy = [...docs];
        let bad = 0;
        for (let I = docs.length - 1; I >= 0; I--) {
          if (this.state.json[i].TeamNumber == docs[I].data().team_num) {
            if (typeof docs[I].data()[varlist[j][0]] == "number") {
              avg += docs[I].data()[varlist[j][0]];
              listcopy.splice(I, 1);
            } else {
              listcopy.splice(I, 1);
              bad++;
            }
          }
        }
        if (listcopy.length != docs.length) {
          if (bad != docs.length - listcopy.length) {
            avg = (avg / (docs.length - listcopy.length - bad)).toFixed(3);
            this.that.setState({ docs: listcopy });
            let jsoncopy = [...this.state.json];
            jsoncopy[i][varlist[j][1]] = avg;
            this.setState({ json: jsoncopy });
          } else {
            let jsoncopy = [...this.state.json];
            jsoncopy[i][varlist[j][1]] = null;
            this.setState({ json: jsoncopy });
          }
        }
      }
      for (let i = 0; i < this.state.teamsList.length; i++) {
        if (this.state.json[i][varlist[j][1]] === null) {
          this.state.json[i][varlist[j][1]] = "No data";
          this.setState({});
        }
      }
    }
  }

  componentDidMount() {
    getAvg(this);
  }

  render() {
    let that = this.props.that;
    return (
      <div className="card text-center">
        <button
          onClick={() => {
            getAvg(this);
            this.setState({ refresh: !this.state.refresh });
          }}
          className="btn btn-danger grey darken-3"
<<<<<<< Updated upstream
          // style={{color: }}
        >
          Re-fetch
=======
        >
          Re-Fetch
>>>>>>> Stashed changes
        </button>
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
            {display_list.map(x => {
              return (
                <TableHeaderColumn width="120" dataField={x[1]} dataSort={true}>
                  {x[2]}
                </TableHeaderColumn>
              );
            })}
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
// console.log([...document.getElementsByClassName("table table-bordered")]);

export default SortTB;
