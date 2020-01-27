import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import TeamList from './components/overall/TeamList'
import Form from './components/form/Form'
import Teams from './components/teams/Teams'
import InitTeams from './components/configs/InitTeams'
import '../node_modules/bootstrap-css-only/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/overall' component={TeamList} />
            <Route path='/pit-scouting' component={CreateProject} />
            <Route path='/form' component={Form} />
            <Route path='/teams' component={Teams} />
            <Route path='/create-event' component={InitTeams} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
