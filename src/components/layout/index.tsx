import { Component } from "react";
import { Card } from "../card";
import axios from "axios";
import "./index.css";

export interface ICard {
  id: 1;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export class Layout extends Component<
  NonNullable<unknown>,
  { inputValue: string; cards: ICard[] | undefined }
> {
  constructor(props: NonNullable<unknown>) {
    super(props);

    this.state = {
      inputValue: "",
      cards: undefined,
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
        axios
          .get("https://rickandmortyapi.com/api/character")
          .then((response) => {
            const data = response.data;
            localStorage.setItem("data", JSON.stringify(data.results));
            this.setState({ cards: data });
            console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } else {
        const data = JSON.parse(localData);
        console.log(data);
        this.setState({ cards: data });
      }
    }
  }

  console = () => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${this.state.inputValue.trim()}`,
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("searchInputValue", this.state.inputValue);
        localStorage.setItem("searchData", JSON.stringify(data.results));
        this.setState({ cards: data.results });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  setSearchValue = (value: string) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      this.setState({ inputValue: value });
    }
  };

  render() {
    return (
      <>
        <header>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.setSearchValue(e.target.value)}
            placeholder="Search"
          />
          <button onClick={this.console} type="button">
            Search
          </button>
        </header>
        <main className="content">
          {this.state.cards &&
            this.state.cards.map((card) => (
              <Card key={card.id} card={card}></Card>
            ))}
        </main>
      </>
    );
  }
}
