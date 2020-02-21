import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GetFirebase from "./components/firebase/GetFirebase";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import TeamDetails from "./components/teams/TeamDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import TeamList from "./components/overall/TeamList";
import Form from "./components/form/Form";
import Teams from "./components/teams/Teams";
import InitTeams from "./components/configs/InitTeams";
import "../node_modules/bootstrap-css-only/css/bootstrap.min.css";
import ProjectList from "./components/projects/ProjectList";

class App extends Component {
  constructor() {
    super();
    this.state = { refresh: false };

    // this.TeamList = <TeamList that3={this} />;
    // console.log(this.TeamList);
  }

  dataArrived = () => {
    this.setState({ refresh: !this.state.refresh });
  };

  render() {
    let navbar =
      window.location.href.substring(
        window.location.href.length - 4,
        window.location.href.length
      ) != "form" ? (
        <Navbar />
      ) : null;
    return (
      <BrowserRouter>
        <div
          className="App"
        >
          <GetFirebase that={this} onRefresh={this.dataArrived} />
          {navbar}
          <Switch>
            <Route exact path="/home" component={Dashboard} />
            <Route
              exact
              path="/teams"
              render={props => (
                <Teams {...props} appthat={this} onRefresh={this.dataArrived} />
              )}
            />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/match_form/:id" component={TeamDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route
              path="/overall"
              render={props => (
                <TeamList
                  {...props}
                  that3={this}
                  onRefresh={this.dataArrived}
                />
              )}
            />
            <Route path="/pit-scouting" component={CreateProject} />
            <Route path="/form" component={Form} />
            <Route path="/create-event" component={InitTeams} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  // componentDidMount() {}
}

export default App;
