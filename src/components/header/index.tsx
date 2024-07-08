import React, { Component, FormEvent } from "react";
import axios from "axios";
import "./index.css";
import { ICard } from "../../types";

interface HeaderProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  setError: () => void;
  setErrorMessage: (message: string) => void;
  resetErrorAndSetData: (data: ICard[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface HeaderState {
  requestError: string;
}

export class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      requestError: "",
    };
  }

  setSearchValue = (value: string) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      this.props.setInputValue(value);
    }
  };

  requestData = () => {
    this.props.setIsLoading(true);
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${this.props.inputValue.trim()}`,
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("searchInputValue", this.props.inputValue);
        localStorage.setItem("searchData", JSON.stringify(data.results));
        this.props.resetErrorAndSetData(data.results);
        this.props.setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        this.props.setErrorMessage(error.message);
        this.props.setIsLoading(false);
      });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.requestData();
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.props.inputValue}
            onChange={(e) => this.setSearchValue(e.target.value)}
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
        {this.state.requestError && <span>{this.state.requestError}</span>}
        <button
          onClick={() => {
            this.props.setError();
          }}
        >
          Throw error
        </button>
      </header>
    );
  }
}
