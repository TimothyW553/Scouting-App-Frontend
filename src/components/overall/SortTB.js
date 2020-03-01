import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./style.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import firebase from "../../config/fbConfig.js";

function rowStyleFormat(row, rowIdx) {
  return {
    backgroundColor: rowIdx % 2 === 0 ? "#F7F7F7" : "#EAEAEA"
  };
}

class SortTB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      real_data: [],
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
              trStyle={rowStyleFormat}
              wrapperClasses="table-responsive"
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
