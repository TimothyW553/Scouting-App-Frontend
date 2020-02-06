import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";

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
class CHARTS extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
      
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

    let i=0, j=0;
    return (
  <div>{console.log(this.state.dataele)}hi</div>
    );
  }

}

export default CHARTS;