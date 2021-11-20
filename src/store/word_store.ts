import { AbstractStore } from "./abstract_store";
import { ServerData } from "./server_data";

export interface AdaptedWords {
  words: Word[];
}

interface Word {
  sex: Sex;
  singular: string;
  plural: string;
}

export enum Sex {
  M = "M",
  W = "W",
  N = "N",
}

class WordStore extends AbstractStore<any, AdaptedWords> {
  protected adaptData(data: any): AdaptedWords {
    return {
      words: [],
    };
  }
}

export const wordStore = new WordStore({
  wordServerData: new ServerData<any>({
    fetch: () =>
      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1XmFamG1heiKzXAw1mAy4sYz4-RHTXCCbyQ7kSGKXKD8?key=AIzaSyCT_QOJe1zwRcSQUpFMFwSsxNqfOS_nRs4"
      ).then((res) => res.json()),
  }),
});
