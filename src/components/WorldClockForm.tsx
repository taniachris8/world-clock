import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export type Clock = {
  id: string;
  city: string;
  timezoneOffset: number;
};

type WorldClockFormState = {
  formData: {
    city: string;
    timezoneOffset: string;
    id: string;
  };
};

type WorldClockFormProps = {
  onAddClock: (clock: Clock) => void;
  onInputFocus: () => void;
};

export class WorldClockForm extends Component<
  WorldClockFormProps,
  WorldClockFormState
> {
  state: WorldClockFormState = {
    formData: { city: "", timezoneOffset: "", id: "" },
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  addClock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newClock = {
      ...this.state.formData,
      id: uuidv4(),
      timezoneOffset: Number(this.state.formData.timezoneOffset),
    };

    this.props.onAddClock(newClock);

    this.setState({
      formData: { city: "", timezoneOffset: "", id: "" },
    });
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
              onFocus={this.props.onInputFocus}
            />
          </label>
          <label>
            Временная зона
            <input
              name="timezoneOffset"
              type="number"
              value={this.state.formData.timezoneOffset}
              onChange={this.handleChange}
              onFocus={this.props.onInputFocus}
              required
            />
          </label>
          <button className="add-btn">Добавить</button>
        </form>
      </>
    );
  }
}
