import React, { Component } from "react";
import { WorldClock } from "./WorldClock";
import type { Clock } from "./WorldClockForm";

type WorldClockListProps = {
  clockList: Clock[];
  onDelete: (id: string) => void;
};

export class WorldClockList extends Component<WorldClockListProps> {
  render(): React.ReactNode {
    const { clockList, onDelete } = this.props;
    return (
      <>
        <div className="clocks-container">
          {clockList &&
            clockList.map((clock) => (
              <WorldClock key={clock.id} clock={clock} onDelete={onDelete}/>
            ))}
        </div>
      </>
    );
  }
}
