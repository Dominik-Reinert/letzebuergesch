import { AbstractStore } from "./abstract_store";
import { ServerData } from "./server_data";
import { WordCellResponse } from "./word_server_cell_response";
import { WordResponse } from "./word_server_response";

export interface AdaptedWords {
  words: Word[];
}

interface Word {
  sex: Sex;
  singular: string;
  translation: string;
  book: string;
  chapter: string;
}

export enum Sex {
  WEIBLECH = "WEIBLECH",
  MAENNLECH = "MAENNLECH",
  SAECHLECH = "SAECHLECH",
}

interface WordStoreData {
  spreadSheetRoot: ServerData<WordResponse.Root>;
  spreadSheetCellRoot?: ServerData<WordCellResponse.Root>;
}
const baseUrl: string = "https://sheets.googleapis.com/v4/spreadsheets/";
const spreadsheetId: string = "1XmFamG1heiKzXAw1mAy4sYz4-RHTXCCbyQ7kSGKXKD8";
const apiKey: string = "key=AIzaSyCT_QOJe1zwRcSQUpFMFwSsxNqfOS_nRs4";

class WordStore extends AbstractStore<WordStoreData, AdaptedWords> {
  private readonly cellFetchCallback: () => void = () => {
    this.produceNewData((currentData) => ({
      spreadSheetRoot: currentData.spreadSheetRoot,
      spreadSheetCellRoot: new ServerData<any>({
        fetch: () =>
          fetch(
            `${baseUrl}${spreadsheetId}/values/A2:D${
              currentData.spreadSheetRoot.get().sheets[0].properties
                .gridProperties.rowCount
            }?${apiKey}`
          ).then((res) => res.json()),
      }),
    }));
    setTimeout(() => this.removeOnUpdateCallback(this.cellFetchCallback), 0);
  };

  constructor(initialData: WordStoreData) {
    super(initialData);
    initialData.spreadSheetRoot.registerOnUpdateCallback(
      this.cellFetchCallback
    );
  }

  protected adaptData(data: WordStoreData): AdaptedWords {
    return {
      words:
        data.spreadSheetCellRoot
          ?.get()
          .values.map(([serverSex, singular, translation, book, chapter]) => ({
            sex: this.adaptSex(serverSex as any),
            singular,
            translation,
            book,
            chapter,
          })) ?? [],
    };
  }

  private adaptSex(sex: "maennlech" | "weiblech" | "saechlech"): Sex {
    switch (sex) {
      case "maennlech":
        return Sex.MAENNLECH;
      case "weiblech":
        return Sex.WEIBLECH;
      case "saechlech":
        return Sex.SAECHLECH;
    }
  }
}

export const wordStore = new WordStore({
  spreadSheetRoot: new ServerData<WordResponse.Root>({
    fetch: () =>
      fetch(`${baseUrl}${spreadsheetId}?${apiKey}`).then((res) => res.json()),
  }),
});
