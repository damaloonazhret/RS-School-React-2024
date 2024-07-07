import { ICard } from "../components/layout";

export interface IState {
  inputValue: string;
  cards: ICard[] | undefined;
  error: boolean;
  requestError: string;
}
