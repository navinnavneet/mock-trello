import "./App.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
