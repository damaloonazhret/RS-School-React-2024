import { Component } from "react";
import { Card } from "../card";
import { IState } from "../../types";

export class Content extends Component<Omit<IState, "error" | "inputValue">> {
  render() {
    return (
      <>
        {this.props.requestError ? (
          <span>{this.props.requestError}</span>
        ) : this.props.isLoading ? (
          <span>Loading...</span>
        ) : (
          this.props.cards &&
          this.props.cards.map((card) => (
            <Card key={card.id} card={card}></Card>
          ))
        )}
      </>
    );
  }
}
