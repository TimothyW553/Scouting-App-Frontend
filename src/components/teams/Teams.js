import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
//import CHARTS from './CHART';

// {} -> dict
// [] -> array
let json = [];

const fetchAndLog = async() => {
  const response = await fetch(`https://www.thebluealliance.com/api/v3/event/2020onosh/teams`, {
    headers: {
      'X-TBA-Auth-Key': `rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7`
    }
  });
  const json_temp = await response.json();
  for(let i = 0; i < json_temp.length; i++) {
    json.push(json_temp[i].team_number);
  }
  console.log(json);
}

function teamList() {
  return (
    <button type="button" className="btn btn-secondary">Left</button>
  )
}

fetchAndLog();
class Teams extends Component {
  constructor(props){
    super(props);
    this.state={
//      chartVisible:[{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},]
      chartVisible:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
    }
  }    


  render() {

    let BUTTONS=[];

    for(let i = 0; i <19; i++) {
      BUTTONS.push(json[i]);
    }
    let BUTTONS1=[];
    for(let i = 19; i <json.length; i++) {
      BUTTONS1.push(json[i]);
    }


    let i=0, j=0, k=0, l=0, o=0;
    return (
      <div className="card text-center">
        <div className="card-header">
          Teams
        </div>
        <div className="card-body">
          <div className="btn-group" role="group" aria-label="Basic example">
    {BUTTONS.map((currElement, index)=>(<button onClick={()=> this.onClicked(currElement, index)} key={BUTTONS[k++]}>{BUTTONS[i++]}{this.state.chartVisible[index]?this.charts(currElement):null}</button>))}

          </div> 
          <div>            
            {BUTTONS1.map((currElement)=>(<button onClick={()=>console.log("team: " +currElement)} key={BUTTONS1[l++]}>{BUTTONS1[j++]}</button>))}
            </div>
        </div>
        {/* <div>
          <button onClick={()=> this.onClicked()}>
            click me to do something
          </button>{this.state.chartVisible?CHARTS():null}
        </div> */}
      </div>
    );

  }
  onClicked(element,indexofele){
    this.setState(prevState=>(this.state.chartVisible[indexofele]=!this.state.chartVisible[indexofele]));
    console.log("team: "+element);
  }
  charts(x){
    return(
      <div>Info about the team: {x}</div>
    );
  }

}
export default Teams;