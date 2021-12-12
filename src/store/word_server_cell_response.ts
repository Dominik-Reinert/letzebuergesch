export module WordCellResponse {
  export interface Root {
    range: string;
    majorDimension: string;
    values: [string, string, string, string, string][];
  }
}
