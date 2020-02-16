import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import firebase from "../../config/fbConfig.js";

// [
//   ["average_cycle_time", "AverageCycle", "Avg. Cycle Time"],
//   ["preloads", "Preloads", "Avg. Preloads"],
//   ["climb_time", "ClimbTime", "Avg. Climb Time"],
//   ["defence_time", "DefenceTime", "Avg. Defence Time"],
//   ["top", "Upper", "Avg. Balls Upper"],
//   ["bot", "Lower", "Avg. Balls Lower"],
//   ["miss", "Miss", "Avg. Balls Missed"],
//   ["tele_top", "Tele_Upper", "Avg. Teleop Balls Upper"],
//   ["tele_bot", "Tele_Lower", "Avg. Teleop Balls Lower"],
//   ["tele_miss", "Tele_Miss", "Avg. Teleop Balls Missed"]
// ];

// let func_list = [];
// for (let i = 0; i < display_list.length; i++) {
//   func_list.push(x => {
//     try {
//       let y = +x;
//       y++;
//       y--;
//       return y;
//     } catch {
//       return undefined;
//     }
//   });
// }

// let getAvg = async that => {
//   firebase
//     .firestore()
//     .collection("match_forms")
//     .get()
//     .then(snapshot => {
//       snap_Loaded(snapshot.docs, display_list, that, func_list);
//     });
// };

// let snap_Loaded = (docs1, varlist, that, func) => {
//   // get all the teams
//   let teamsList = [];
//   let used = [];
//   for (let i = 0; i < docs1.length; i++) {
//     if (!used.includes(docs1[i].data().team_num)) {
//       teamsList.push({ TeamNumber: docs1[i].data().team_num });
//       used.push(docs1[i].data().team_num);
//     }
//   }
//   that.setState({
//     json: teamsList,
//     teamsList: teamsList.map(x => {
//       return x.TeamNumber;
//     })
//   });

//   // varlist: list containing match form var names and display names
//   for (let j = 0; j < varlist.length; j++) {
//     that.that.setState({ docs: docs1, data: docs1[0].data() });
//     // loop through varlist
//     for (let i = 0; i < that.state.json.length; i++) {
//       let docs = that.that.state.docs;
//       let avg = 0;
//       let listcopy = [...docs];
//       let bad = 0;
//       for (let I = docs.length - 1; I >= 0; I--) {
//         if (that.state.json[i].TeamNumber == docs[I].data().team_num) {
//           if (
//             typeof parseFloat(func[j](docs[I].data()[varlist[j][0]])) ==
//             "number"
//           ) {
//             // apply function to each
//             avg += parseFloat(func[j](docs[I].data()[varlist[j][0]]));
//             // avg += docs[I].data()[varlist[j][0]];
//             listcopy.splice(I, 1);
//           } else {
//             listcopy.splice(I, 1);
//             bad++;
//           }
//         }
//       }
//       if (listcopy.length != docs.length) {
//         if (bad != docs.length - listcopy.length) {
//           avg = (avg / (docs.length - listcopy.length - bad)).toFixed(3);
//           that.that.setState({ docs: listcopy });
//           let jsoncopy = [...that.state.json];
//           jsoncopy[i][varlist[j][1]] = avg;
//           that.setState({ json: jsoncopy });
//         } else {
//           let jsoncopy = [...that.state.json];
//           jsoncopy[i][varlist[j][1]] = null;
//           that.setState({ json: jsoncopy });
//         }
//       }
//     }
//     for (let i = 0; i < that.state.teamsList.length; i++) {
//       if (that.state.json[i][varlist[j][1]] === null) {
//         that.state.json[i][varlist[j][1]] = "No data.";
//         that.setState({});
//       }
//     }
//   }
// };

function rowStyleFormat(row, rowIdx) {
  return {
    backgroundColor: rowIdx % 2 === 0 ? "#F7F7F7" : "#EAEAEA"
  };
}

class SortTB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    };
  }

  componentDidMount() {
    // getAvg(this);
    // getAvg will fetch data from app
  }

  render() {
    let data = this.props.that.that2.state.json;

    this.display_list = this.props.that.that2.state.display_list;
    try {
      return (
        <div className="card text-center">
          <button
            onClick={() => {
              this.props.that.props.onRefresh();
            }}
            className="btn btn-danger grey darken-3"
          >
            Re-fetch
          </button>
          <div className="card-body">
            <BootstrapTable
              ref="table"
              data={data}
              multiColumnSort={2}
              trStyle={rowStyleFormat}
            >
              <TableHeaderColumn
                width="120"
                dataField="TeamNumber"
                isKey={true}
                dataSort={true}
              >
                Team #
              </TableHeaderColumn>
              {this.display_list.map(x => {
                return (
                  <TableHeaderColumn
                    width="120"
                    dataField={x[1]}
                    dataSort={true}
                    key={x[0]}
                  >
                    {x[1]}
                  </TableHeaderColumn>
                );
              })}
            </BootstrapTable>
          </div>
        </div>
      );
    } catch {
      return null;
    }

    // empty div
    // <div>{/* <h1>{this.that.that.state.test}</h1> */}</div>
  }
}
// console.log([...document.getElementsByClassName("table table-bordered")]);

export default SortTB;
