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
    this.state = {
      chartVisible: new Array(json.length),
      o: 0,
      p: 0,
      data : [[]],
      check:true,
      dataChartTele:[[[]]],
      dataChartAuto:[[[]]]
    };
    this.state.chartVisible.fill(false);
    for(let i=0;i<json.length;i++){
      this.state.data[i]=new Array(0);
    }
    for(let i=0;i<json.length;i++){
      this.state.dataChartTele[i]=new Array(0);
    }
    for(let i=0;i<json.length;i++){
      this.state.dataChartAuto[i]=new Array(0);
    }


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
    console.log(json);
    console.log("data: "+this.state.data);
    console.log(this.props.match_forms[0]);
    this.setState({o: element});
    this.state.p = indexOfElem;

    if(this.state.check){
      for(let j=0;j<json.length;j++){
      for(let i=0;i<this.props.match_forms.length;i++){
        if(this.props.match_forms[i].team_num==json[j]){
          console.log("yes");
          this.state.data[j].push(this.props.match_forms[i]);

        }
      }
      
    }
    for(let i=0;i<this.state.data.length;i++){
      if(!(this.state.data[i].length===0)){

        for(let j=0;j<this.state.data[i].length;j++){
          this.state.dataChartTele[i][j]=new Array(0);
          this.state.dataChartTele[i][j].push("Tele");
          for(let k=0;k<3;k++){
            console.log(this.state.data[i][j].shots[k].score);
            this.state.dataChartTele[i][j].push(this.state.data[i][j].shots[k].score);
          }
          console.log("yes");
        }
      }
    }
    for(let i=0;i<this.state.data.length;i++){
      if(!(this.state.data[i].length===0)){

        for(let j=0;j<this.state.data[i].length;j++){
          this.state.dataChartAuto[i][j]=new Array(0);
          this.state.dataChartAuto[i][j].push("Auto");
          for(let k=0;k<3;k++){
            console.log(this.state.data[i][j].auto_shots[k].score);
            this.state.dataChartAuto[i][j].push(this.state.data[i][j].auto_shots[k].score);
          }
          console.log("yes");
        }
      }
    }
      this.setState({check:false});
    }
    console.log(this.state.data, "total data");
    console.log(this.state.dataChartTele, "tele");
    console.log(this.state.dataChartAuto,"auto");

  }
  
  charts = (e, ind) => {
    return (

      <div>
        
        Info about the team: {e}
        {console.log((this.state.dataChartTele[ind].map((index)=>(index))))}
        <Chart
  width={'300px'}
  height={'300px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    ["Time", "Top", "Bottom", "Miss"],
    
     ((this.state.dataChartTele[ind].map((index)=>(index))[0]))
  ]}
  options={{
    chartArea: { width: '50%' },
    isStacked: true
  }}
  // For tests
  rootProps={{ 'data-testid': '3' }}
/>
        
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
                  (<td key={index} style={{ color: "red"}}>{this.charts(buttons[index], index)}</td>) : null
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
