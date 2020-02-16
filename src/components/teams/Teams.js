import React, { Component } from "react";
import TeamsList from "./TeamsList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Chart from "react-google-charts";

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
    this.state = { charts_shown: [] };
  }

  buttons = json.map(x => {
    try {
      return (
        <button
          key={x}
          style={{
            width: "75px",
            height: "50px",
            background: "green"
          }}
          onClick={() => {
            let chartscopy = [...this.state.charts_shown];
            if (chartscopy.includes(x)) {
              chartscopy.pop(x);
            } else {
              chartscopy.push(x);
            }
            this.setState({ charts_shown: chartscopy });
          }}
        >
          {x}
        </button>
      );
    } catch {
      return null;
    }
  });

  render() {
    let that = this.props.appthat;
    let rawData = that.state.rawData;
    let jsonData = that.state.json;

    if (rawData && jsonData) {
      let charts = [];
      for (let team = 0; team < this.state.charts_shown.length; team++) {
        charts.push([]);
        let data1 = [["Match", "Auton", "Teleop"]];
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i].team_num == this.state.charts_shown[team]) {
            let rawDatai = rawData[i];
            data1.push([
              "Match " + rawDatai.match_num,
              +rawDatai["bot"] + +rawDatai["top"],
              +rawDatai["tele_bot"] + +rawDatai["tele_top"]
            ]);
          }
        }
        let data2 = [["Match", "Cycle", "Defence", "Climb"]];
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i].team_num == this.state.charts_shown[team]) {
            let rawDatai = rawData[i];
            data2.push([
              "Match " + rawDatai.match_num,
              +rawDatai["average_cycle_time"],
              +rawDatai["defence_time"],
              +rawDatai["climb_time"]
            ]);
          }
        }
        let data3 = [["Stat", "Auton", "Teleop", "Cycle", "Defence", "Climb"]];
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i].TeamNumber == this.state.charts_shown[team]) {
            let jsonDatai = jsonData[i];
            data3.push([
              "Team " + jsonDatai.team_num,
              +jsonDatai["Balls Lower"] + jsonDatai["Balls Upper"],
              +jsonDatai["Teleop Balls Lower"] +
                jsonDatai["Teleop Balls Upper"],
              +jsonDatai["Cycle Time"],
              +jsonDatai["Defence Time"],
              +jsonDatai["Climb Time"]
            ]);
          }
        }
        console.log(data3);
        let c1 =
          data1.length - 1 ? (
            <div
              key={"0" + team}
              style={{
                display: "inline-block",
                width: (window.screen.width - 300) / 3 + 50
              }}
            >
              <Chart
                style={{ display: "inline-block" }}
                width={(window.screen.width - 300) / 3}
                height={"300px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={data1}
                options={{
                  isStacked: true,
                  // Material design options
                  chart: {
                    title: "Team " + this.state.charts_shown[team] + " Shots"
                  }
                }}
              />
            </div>
          ) : null;
        let c2 =
          data2.length - 1 ? (
            <div
              key={"1" + team}
              style={{
                display: "inline-block",
                width: (window.screen.width - 300) / 3 + 50
              }}
            >
              <Chart
                width={(window.screen.width - 300) / 3}
                height={"300px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={data2}
                options={{
                  isStacked: true,
                  // Material design options
                  chart: {
                    title: "Team " + this.state.charts_shown[team] + " Times"
                  }
                }}
              />
            </div>
          ) : null;
        let c3 =
          data3.length - 1 ? (
            <div
              key={"2" + team}
              style={{
                display: "inline-block",
                width: (window.screen.width - 300) / 3 + 50
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      {data3[0][1] +
                        ": " +
                        (typeof +data3[1][1] == "number" && !isNaN(data3[1][1])
                          ? data3[1][1]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {data3[0][2] +
                        ": " +
                        (typeof +data3[1][2] == "number" && !isNaN(data3[1][2])
                          ? data3[1][2]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {data3[0][3] +
                        ": " +
                        (typeof +data3[1][3] == "number" && !isNaN(data3[1][3])
                          ? data3[1][3]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {data3[0][4] +
                        ": " +
                        (typeof +data3[1][4] == "number" && !isNaN(data3[1][4])
                          ? data3[1][4]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {data3[0][5] +
                        ": " +
                        (typeof +data3[1][5] == "number" && !isNaN(data3[1][5])
                          ? data3[1][5]
                          : "No data")}
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <Chart
                width={(window.screen.width - 300) / 3}
                height={"300px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={data3}
                options={{
                  isStacked: true,
                  // Material design options
                  chart: {
                    title: "Team " + this.state.charts_shown[team] + " Averages"
                  }
                }}
              /> */}
            </div>
          ) : null;
        charts[charts.length - 1].push(c1);
        charts[charts.length - 1].push(c2);
        charts[charts.length - 1].push(c3);
      }
      return (
        <div>
          {this.buttons}
          <table>
            <tbody>
              <tr>
                {charts.map(x => {
                  return <td style={{ border: "1px solid black" }}>{x[0]}</td>;
                })}
              </tr>
              <tr>
                {charts.map(x => {
                  return <td style={{ border: "1px solid black" }}>{x[1]}</td>;
                })}
              </tr>
              <tr>
                {charts.map(x => {
                  return <td style={{ border: "1px solid black" }}>{x[2]}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <p>not werking</p>;
    }
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
