import "./App.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
