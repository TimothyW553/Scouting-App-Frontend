import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const json = [];
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
      CycleTime: i,
      Points: i+1,
      Mistakes: i+2,
      ScoreDist: i+3,
      ClimbTime: i+4,
      Overall: i+5
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
              <TableHeaderColumn width='150' dataField='TeamNumber' isKey={ true } dataSort={ true }>Team #</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='CycleTime' dataSort={ true }>Cycle Time</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='Points' dataSort={ true }>Points</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='Mistakes' dataSort={ true }>Balls Dropped</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='ScoreDist' dataSort={ true }>Score Distribution</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='Overall' dataSort={ true }>Overall</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default SortTB;