import "./App.css";
import React from "react";
import { WorldClockForm } from "./components/WorldClockForm";
import { WorldClockList } from "./components/WorldClockList";
import type { Clock } from "./components/WorldClockForm";

type AppState = {
  clockList: Clock[];
  cityAlreadyAdded: boolean;
};

class App extends React.Component<object, AppState> {
  state: AppState = {
    clockList: [],
    cityAlreadyAdded: false,
  };

  addClock = (clock: Clock) => {
    const cityExist = this.state.clockList.some(
      (c) => c.city.toLowerCase() === clock.city.toLowerCase()
    );

    if (cityExist) {
      this.setState({ cityAlreadyAdded: true });
      return;
    }

    this.setState((prev) => ({
      clockList: [...prev.clockList, clock],
      cityAlreadyAdded: false,
    }));
  };

  resetError = () => {
    this.setState({ cityAlreadyAdded: false });
  };

  deleteClock = (id: string) => {
    this.setState((prevState) => ({
      clockList: prevState.clockList.filter((clock) => clock.id !== id),
    }));
  };

  render() {
    return (
      <>
        <WorldClockForm
          onAddClock={this.addClock}
          onInputFocus={this.resetError}
        />
        {this.state.cityAlreadyAdded && (
          <p className="error">This city has already been added.</p>
        )}
        <WorldClockList
          clockList={this.state.clockList}
          onDelete={this.deleteClock}
        />
      </>
    );
  }
}

export default App;
