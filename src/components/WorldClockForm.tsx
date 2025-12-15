import React, { Component } from "react";
import { WorldClockList } from "./WorldClockList";
import { v4 as uuidv4 } from "uuid";

export type Clock = {
  id: string;
  city: string;
  timezoneOffset: number;
};

type WorldClockFormState = {
  formData: Clock;
  clockList: Clock[];
};

export class WorldClockForm extends Component<object, WorldClockFormState> {
  constructor(props: object) {
    super(props);
    this.state = {
      formData: { city: "", timezoneOffset: 0, id: "" },
      clockList: [],
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: type === "number" ? Number(value) : value,
      },
    }));
  };

  addClock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newClock = {
      ...this.state.formData,
      id: uuidv4(),
    };

    this.setState((prevState) => ({
      clockList: [...prevState.clockList, newClock],
      formData: { city: "", timezoneOffset: 0, id: "" },
    }));

    console.log(this.state.clockList);
    console.log("form submitted");
  };

  deleteClock = (id: string) => {
    this.setState((prevState) => ({
      clockList: prevState.clockList.filter((clock) => clock.id !== id),
    }));
  };

  render(): React.ReactNode {
    return (
      <>
        <form onSubmit={this.addClock}>
          <label>
            Название
            <input
              name="city"
              type="text"
              value={this.state.formData.city}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Временная зона
            <input
              name="timezoneOffset"
              type="number"
              value={this.state.formData.timezoneOffset}
              onChange={this.handleChange}
              required
            />
          </label>
          <button className="add-btn">Добавить</button>
        </form>
        <WorldClockList
          clockList={this.state.clockList}
          onDelete={this.deleteClock}
        />
      </>
    );
  }
}
