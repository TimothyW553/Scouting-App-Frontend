import React, { Component } from "react";
import TeamsList from "./TeamsList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Chart from "react-google-charts";

let json = [];
const field = "./field.png";
const circlered = "./circlered.png";
const circleblue = "./circleblue.png";

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
  // console.log(json);
};

fetchAndLog();

if (window.location.href.substring(7, 16) == "localhost") {
  json.unshift(99999);
}

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = { charts_shown: [], refresh: false };
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
              for (let item = 0; item < chartscopy.length; item++) {
                if (chartscopy[item] == x) {
                  chartscopy.splice(item, 1);
                  break;
                }
              }
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

    let refresh = function() {
      this.setState({ refresh: !this.state.refresh });
    };

    if (rawData && jsonData) {
      let charts = [];
      let allmaps = [];
      for (let team = 0; team < this.state.charts_shown.length; team++) {
        charts.push([]);
        let data1 = [["Match", "Upper", "Lower", "Missed"]];
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i].team_num == this.state.charts_shown[team]) {
            let rawDatai = rawData[i];
            data1.push([
              "Match " + rawDatai.match_num,
              +rawDatai["top"],
              +rawDatai["bot"],
              +rawDatai["miss"]
            ]);
          }
        }

        let data2 = [["Match", "Upper", "Lower", "Missed"]];
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i].team_num === this.state.charts_shown[team]) {
            let rawDatai = rawData[i];
            data2.push([
              "Match " + rawDatai.match_num,
              +rawDatai["tele_top"],
              +rawDatai["tele_bot"],
              +rawDatai["tele_miss"]
            ]);
          }
        }

        let data3 = [["Match", "Cycle", "Defence", "Climb"]];
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i].team_num == this.state.charts_shown[team]) {
            let rawDatai = rawData[i];
            data3.push([
              "Match " + rawDatai.match_num,
              +rawDatai["average_cycle_time"],
              +rawDatai["defence_time"],
              +rawDatai["climb_time"]
            ]);
          }
        }

        let overall = [
          [
            "Stat",
            "Teleop Cycle Time",
            "Auto Cycle Time",
            "Auto Balls Upper",
            "Auto Balls Lower",
            "Auto Balls Missed",
            "Teleop Balls Upper",
            "Teleop Balls Lower",
            "Teleop Balls Missed",
            "Climb Time",
            "Defence",
            "Stage 2 Prob",
            "Stage 3 Prob",
            "Climb Prob."
          ]
        ];
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i].TeamNumber === this.state.charts_shown[team]) {
            let jsonDatai = jsonData[i];
            overall.push([
              "Team " + jsonDatai.team_num,
              +jsonDatai["Tele Cycle Time"],
              +jsonDatai["Auto Cycle Time"],
              +jsonDatai["Auto Balls Upper"],
              +jsonDatai["Auto Balls Lower"],
              +jsonDatai["Auto Balls Missed"],
              +jsonDatai["Teleop Balls Upper"],
              +jsonDatai["Teleop Balls Lower"],
              +jsonDatai["Teleop Balls Missed"],
              +jsonDatai["Climb Time"],
              +jsonDatai["Defence Time"],
              +jsonDatai["Stage 2 Prob."],
              +jsonDatai["Stage 3 Prob."],
              +jsonDatai["Climb Prob."]
            ]);
          }
        }
        console.log(overall);
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
                loader={<div id="chartstillloading">Loading Chart</div>}
                data={data1}
                options={{
                  isStacked: true,
                  // Material design options
                  chart: {
                    title:
                      "Team " + this.state.charts_shown[team] + " Auto Shots",

                    legend: "none"
                  }
                }}
              />
            </div>
          ) : null;
        let c4 =
          data2.length - 1 ? (
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
                loader={<div id="chartstillloading">Loading Chart</div>}
                data={data2}
                options={{
                  isStacked: true,
                  // Material design options
                  chart: {
                    legend: "none",
                    title:
                      "Team " + this.state.charts_shown[team] + " Teleop Shots"
                  }
                }}
              />
            </div>
          ) : null;
        let c2 =
          data3.length - 1 ? (
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
                loader={<div id="chartstillloading">Loading Chart</div>}
                data={data3}
                options={{
                  isStacked: true,
                  // Material design options
                  chart: {
                    legend: "none",
                    title: "Team " + this.state.charts_shown[team] + " Times"
                  }
                }}
              />
            </div>
          ) : null;
        let c3 =
          overall.length - 1 ? (
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
                      {overall[0][1] +
                        ": " +
                        (typeof +overall[1][1] == "number" &&
                        !isNaN(overall[1][1])
                          ? overall[1][1]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][2] +
                        ": " +
                        (typeof +overall[1][2] == "number" &&
                        !isNaN(overall[1][2])
                          ? overall[1][2]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][3] +
                        ": " +
                        (typeof +overall[1][3] == "number" &&
                        !isNaN(overall[1][3])
                          ? overall[1][3]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][4] +
                        ": " +
                        (typeof +overall[1][4] == "number" &&
                        !isNaN(overall[1][4])
                          ? overall[1][4]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][5] +
                        ": " +
                        (typeof +overall[1][5] == "number" &&
                        !isNaN(overall[1][5])
                          ? overall[1][5]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][5] +
                        ": " +
                        (typeof +overall[1][5] == "number" &&
                        !isNaN(overall[1][5])
                          ? overall[1][5]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][6] +
                        ": " +
                        (typeof +overall[1][6] == "number" &&
                        !isNaN(overall[1][6])
                          ? overall[1][6]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][7] +
                        ": " +
                        (typeof +overall[1][7] == "number" &&
                        !isNaN(overall[1][7])
                          ? overall[1][7]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][8] +
                        ": " +
                        (typeof +overall[1][8] == "number" &&
                        !isNaN(overall[1][8])
                          ? overall[1][8]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][9] +
                        ": " +
                        (typeof +overall[1][9] == "number" &&
                        !isNaN(overall[1][9])
                          ? overall[1][9]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][10] +
                        ": " +
                        (typeof +overall[1][10] == "number" &&
                        !isNaN(overall[1][10])
                          ? overall[1][10]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][11] +
                        ": " +
                        (typeof +overall[1][11] == "number" &&
                        !isNaN(overall[1][11])
                          ? overall[1][11]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][12] +
                        ": " +
                        (typeof +overall[1][12] == "number" &&
                        !isNaN(overall[1][12])
                          ? overall[1][12]
                          : "No data")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {overall[0][13] +
                        ": " +
                        (typeof +overall[1][13] == "number" &&
                        !isNaN(overall[1][13])
                          ? overall[1][13]
                          : "No data")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null;

        function heatmap(team) {
          let shot_list = [];
          let shot_list_auto = [];
          let teamcount = 0;
          // console.log(rawData);
          rawData.map(state => {
            if (state.team_num == team) {
              state.shooting_pos_auto.forEach(ashot => {
                shot_list_auto.push([ashot.x, ashot.y]);
              });
              state.shooting_pos
                // .splice(shot_list_auto.length, state.shooting_pos.length)
                .forEach(ashot => {
                  shot_list.push([ashot.x, ashot.y]);
                });
              teamcount += 1;
            }
          });

          let display = (
            <div>
              <img
                src={require(`${field}`)}
                id={"match_field_image" + team}
                style={{ width: (window.screen.width - 300) / 3 }}
              />
              {shot_list_auto.map(coords => {
                try {
                  //console.log(coords[1] / rawData[0].field_size / 62);
                  return (
                    <img
                      src={require(`${circleblue}`)}
                      width={rawData[0].circle_size / 2}
                      height={rawData[0].circle_size / 2}
                      style={{
                        opacity: teamcount == 1 ? 100 : 100 / teamcount + 30,
                        position: "absolute",
                        left:
                          ((coords[0] / rawData[0].field_size) *
                            ((window.screen.width - 300) / 3)) /
                            112 + // magic const1
                          document
                            .getElementById("match_field_image" + team)
                            .getBoundingClientRect().left -
                          rawData[0].circle_size / 4,
                        top:
                          ((coords[1] / rawData[0].field_size) *
                            ((window.screen.width - 300) / 3)) /
                            117 + // magic const2
                          document
                            .getElementById("match_field_image" + team)
                            .getBoundingClientRect().top -
                          rawData[0].circle_size / 4
                      }}
                    />
                  );
                } catch (error) {
                  console.log(error);
                  return null;
                }
              })}
              {shot_list.map(coords => {
                try {
                  //console.log(coords[1] / rawData[0].field_size / 62);
                  return (
                    <img
                      src={require(`${circlered}`)}
                      width={rawData[0].circle_size / 2}
                      height={rawData[0].circle_size / 2}
                      style={{
                        opacity: teamcount == 1 ? 100 : 100 / teamcount + 30,
                        position: "absolute",
                        left:
                          ((coords[0] / rawData[0].field_size) *
                            ((window.screen.width - 300) / 3)) /
                            112 + // magic const1
                          document
                            .getElementById("match_field_image" + team)
                            .getBoundingClientRect().left -
                          rawData[0].circle_size / 4,
                        top:
                          ((coords[1] / rawData[0].field_size) *
                            ((window.screen.width - 300) / 3)) /
                            117 + // magic const2
                          document
                            .getElementById("match_field_image" + team)
                            .getBoundingClientRect().top -
                          rawData[0].circle_size / 4
                      }}
                    />
                  );
                } catch (error) {
                  console.log(error);
                  return null;
                }
              })}
            </div>
          );
          // console.log(shot_list);
          return display;
        }

        allmaps.push(heatmap(this.state.charts_shown[team]));
        charts[charts.length - 1].push(c1);
        charts[charts.length - 1].push(c4);
        charts[charts.length - 1].push(c2);
        charts[charts.length - 1].push(c3);
      }
      return (
        <div>
          <br />
          <button
            style={{ width: "100%" }}
            className="btn btn-danger grey darken-3"
            onClick={() => {
              this.setState({ refresh: !this.state.refresh });
            }}
          >
            Load Images
          </button>
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
              <tr>
                {charts.map(x => {
                  return <td style={{ border: "1px solid black" }}>{x[3]}</td>;
                })}
              </tr>
              <tr>
                {allmaps.map(x => {
                  return <td style={{ border: "1px solid black" }}>{x}</td>;
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
