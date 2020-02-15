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
    this.state = { test: 11114801721417421028107810127341432, refresh: false };

    // this.TeamList = <TeamList that3={this} />;
    // console.log(this.TeamList);
  }

  dataArrived = () => {
    this.setState({ refresh: !this.state.refresh });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <GetFirebase that={this} onRefresh={this.dataArrived} />
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/teams" component={Teams} />
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
