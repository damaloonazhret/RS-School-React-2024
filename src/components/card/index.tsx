import { Component } from "react";
import "./index.css";
import { ICard } from "../layout";

export class Card extends Component<{ card: ICard }> {
  render() {
    return (
      <div className="card">
        <div className="card-info">
          <p>name:</p>
          <p>{this.props.card.name}</p>
        </div>
        <div className="card-info">
          <p>status:</p>
          <p>{this.props.card.status}</p>
        </div>
        <div className="card-info">
          <p>gender:</p>
          <p>{this.props.card.gender}</p>
        </div>
        <div className="card-info">
          <p>location:</p>
          <p>{this.props.card.location.name}</p>
        </div>
        <div className="card-info">
          <a
            href={this.props.card.image}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={this.props.card.image} alt="person image" />
          </a>
        </div>
      </div>
    );
  }
}
