import React, { Component } from "react";
import type { Clock } from "./WorldClockForm";

type WorldClockProps = {
  clock: Clock;
  onDelete: (id: string) => void;
};

type WorldClockState = {
  time: string;
};

export class WorldClock extends Component<WorldClockProps, WorldClockState> {
  private intervalId?: number;
  constructor(props: WorldClockProps) {
    super(props);
    this.state = { time: this.calculateTime(props.clock.timezoneOffset) };
  }

  calculateTime = (timezoneOffset: number): string => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + timezoneOffset * 3600000);

    return cityTime.toLocaleTimeString("en-GB", { hour12: false });
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        time: this.calculateTime(this.props.clock.timezoneOffset),
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render(): React.ReactNode {
    const { clock, onDelete } = this.props;
    const { time } = this.state;

    return (
      <>
        <div className="clock-container">
          <h3 className="city">{clock.city}</h3>
          <div className="clock-wrapper">
            <div className="clock">{time}</div>
            <button onClick={() => onDelete(clock.id)} className="delete-btn">
              X
            </button>
          </div>
        </div>
      </>
    );
  }
}
