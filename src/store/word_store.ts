import { localStorageProxy } from "../localstorage/local_storage_proxy";
import { WeighedEntry } from "../weighed_random/weighed_random";
import { AbstractStore } from "./abstract_store";
import { ServerData } from "./server_data";
import { WordCellResponse } from "./word_server_cell_response";
import { WordResponse } from "./word_server_response";

export interface AdaptedWords {
  words: Word[];
}

export interface Word extends WeighedEntry {
  sex: Sex;
  singular: string;
  translation: string;
  book: string;
  chapter: string;
}

export enum Sex {
  WEIBLECH = "WEIBLECH",
  MAENNLECH = "MAENNLECH",
  SAECHLECH = "SAECHLECH"
}

interface WordStoreData {
  spreadSheetRoot: ServerData<WordResponse.Root>;
  spreadSheetCellRoot?: ServerData<WordCellResponse.Root>;
}
const baseUrl: string = "https://sheets.googleapis.com/v4/spreadsheets/";
const spreadsheetId: string = "1XmFamG1heiKzXAw1mAy4sYz4-RHTXCCbyQ7kSGKXKD8";
const apiKey: string = "key=AIzaSyCT_QOJe1zwRcSQUpFMFwSsxNqfOS_nRs4";

export const weightsFromLocalStorageState = localStorageProxy<
  {words: Pick<Word, "singular" | "weight">[]}
>("weightsBySingular", {words: []});

class WordStore extends AbstractStore<WordStoreData, AdaptedWords> {
  private readonly cellFetchCallback: () => void = () => {
    this.produceNewData((currentData) => ({
      spreadSheetRoot: currentData.spreadSheetRoot,
      spreadSheetCellRoot: new ServerData<any>({
        fetch: () =>
          fetch(
            `${baseUrl}${spreadsheetId}/values/A2:E${
              currentData.spreadSheetRoot.get().sheets[0].properties
                .gridProperties.rowCount
            }?${apiKey}`
          ).then((res) => res.json())
      })
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
    const values = data.spreadSheetCellRoot?.get().values;
    values?.forEach(([, singular]) => {
      const weightsBySingular = weightsFromLocalStorageState.words.find(
        (weight) => weight.singular === singular
      );
      if (!weightsBySingular) {
        weightsFromLocalStorageState.words.push({ singular, weight: 100 });
      }
    });
    return {
      words:
        values?.map(([serverSex, singular, translation, book, chapter]) => {
          return {
            sex: this.adaptSex(serverSex as any),
            singular,
            translation,
            book,
            chapter,
            weight: weightsFromLocalStorageState.words.find(
              (weight) => weight.singular === singular
            )?.weight as number
          };
        }) ?? []
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
      fetch(`${baseUrl}${spreadsheetId}?${apiKey}`).then((res) => res.json())
  })
});
