export declare module WordCellResponse {
  export interface Root {
    range: string;
    majorDimension: string;
    values: [Sex, string, string][];
  }

  export enum Sex {
    maennlech = "maennlech",
    weiblech = "weiblech",
    neutrum = "neutrum",
  }
}
