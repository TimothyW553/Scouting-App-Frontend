import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];
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
    this.charts=this.charts.bind(this);
    this.state={
//      chartVisible:[{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},{isOn:false},]
      chartVisible:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
      o:0,
      p:0,
    }
  }    


  render() {

    let BUTTONS=[];

    for(let i = 0; i <json.length; i++) {
      BUTTONS.push(json[i]);
    }
    // let BUTTONS1=[];
    // for(let i = 19; i <json.length; i++) {
    //   BUTTONS1.push(json[i]);
    // }


    let i=0, j=0, k=0, l=0;
    let teamN=0;

    return (
      <div className="card text-center">
        <div className="card-header">
          Teams
        </div>
        <div className="card-body">
          <div className="align-baseline" role="group" aria-label="Basic example">
            {BUTTONS.map((currElement, index)=>(<button onClick={()=> this.onClicked(currElement, index)} key={BUTTONS[k++]}>{BUTTONS[i++]}</button>))}
            
          </div> 
          {/* <div>            
            {BUTTONS1.map((currElement1, index1)=>(<button onClick={()=>this.onClicked(currElement1, index1+19)} key={BUTTONS1[l++]}>{BUTTONS1[j++]}{this.state.chartVisible[index1+19]?this.charts(currElement1+19):null}</button>))}
            </div> */}
            {/* <div>state: {(this.state.chartVisible[this.state.p]?this.charts(this.state.o):null)}</div> */}
          <div className="align-baseline" role="group">{this.state.chartVisible.map((currElement, index)=>(<td  style={{ color:"red"}}>{this.state.chartVisible[index]?this.charts(BUTTONS[index]):null}</td>))}</div>
        </div>
      </div>

    );

  }
  
  onClicked(element,indexofele){

    this.setState(()=>(this.state.chartVisible[indexofele]=!this.state.chartVisible[indexofele]));
    console.log("team: "+element);
    this.setState({o:element});
    this.state.p=indexofele;


  }
  charts(x){
    return(

      <div>Info about the team: {x}{console.log(x)}
      
              <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      </BarChart></div>
      
    );
  }

}
export default Teams;