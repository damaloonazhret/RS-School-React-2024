import React, { Component } from "react";
import axios from "axios";
import "./index.css";
import { Header } from "../header";
import { ICard, IState } from "../../types";
import { Content } from "../content";

export class Layout extends Component<NonNullable<unknown>, IState> {
  constructor(props: NonNullable<unknown>) {
    super(props);

    this.state = {
      inputValue: "",
      cards: undefined,
      error: false,
      requestError: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    const localData = localStorage.getItem("data");
    const localSearchData = localStorage.getItem("searchData");
    const inputValue = localStorage.getItem("searchInputValue");

    if (inputValue) {
      this.setState({ inputValue });
      if (localSearchData) {
        this.setState({ cards: JSON.parse(localSearchData) });
      }
    } else {
      if (!localData) {
        this.setState({ isLoading: true });
        axios
          .get("https://rickandmortyapi.com/api/character")
          .then((response) => {
            const data = response.data;
            localStorage.setItem("data", JSON.stringify(data.results));
            this.setState({ cards: data.results, isLoading: false });
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } else {
        const data = JSON.parse(localData);
        this.setState({ cards: data });
      }
    }
  }

  setInputValue = (value: string) => {
    this.setState({ inputValue: value });
  };

  setError = () => {
    this.setState({ error: true });
  };

  setErrorMessage = (message: string) => {
    this.setState({ requestError: message });
  };

  resetErrorAndSetData = (data: ICard[]) => {
    this.setState({ cards: data, requestError: "" });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  render() {
    if (this.state.error) {
      throw new Error("Error.");
    }
    return (
      <>
        <Header
          inputValue={this.state.inputValue}
          setInputValue={this.setInputValue}
          setError={this.setError}
          setErrorMessage={this.setErrorMessage}
          resetErrorAndSetData={this.resetErrorAndSetData}
          setIsLoading={this.setIsLoading}
        />
        <main className="content">
          <Content
            requestError={this.state.requestError}
            cards={this.state.cards}
            isLoading={this.state.isLoading}
          />
        </main>
      </>
    );
  }
}
