import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const json = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const fetchAndLog = async() => {
  const response = await fetch(`https://www.thebluealliance.com/api/v3/event/2020onosh/teams`, {
    headers: {
      'X-TBA-Auth-Key': `rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7`
    }
  });
  const json_temp = await response.json();
  for(let i = 0; i < json_temp.length; i++) {
    json.push({
      TeamNumber: json_temp[i].team_number,
      CycleTime: getRandomInt(100),
      CycleTime: getRandomInt(100),
      Upper: getRandomInt(100),
      Lower: getRandomInt(100),
      Miss: getRandomInt(100),
      ClimbTime: getRandomInt(100),
      Preloads: getRandomInt(100)
    });
  }
  console.log(json);
}

fetchAndLog();

class SortTB extends Component {
  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          Overall Table
        </div>
        <div className="card-body">
          <BootstrapTable ref='table' data={ json } multiColumnSort={ 2 }>
              <TableHeaderColumn width='120' dataField='TeamNumber' isKey={ true } dataSort={ true }>Team #</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='CycleTime' dataSort={ true }>Avg. Cycle Time</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='Upper' dataSort={ true }>Avg. Balls Upper</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='Lower' dataSort={ true }>Avg. Balls Lower</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='Miss' dataSort={ true }>Avg. Balls Missed</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='ClimbTime' dataSort={ true }>Avg. Climb Time</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='ClimbTime' dataSort={ true }>Avg. Defence Time</TableHeaderColumn>
              <TableHeaderColumn width='120' dataField='Preloads' dataSort={ true }>Avg. Preloads</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default SortTB;