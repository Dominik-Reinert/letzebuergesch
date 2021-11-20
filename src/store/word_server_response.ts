export module WordResponse {

    export interface Properties {
        title: string;
        locale: string;
        autoRecalc: string;
        timeZone: string;
    }

    export interface GridProperties {
        rowCount: number;
        columnCount: number;
    }

    export interface SheetProperties {
        sheetId: number;
        title: string;
        index: number;
        sheetType: string;
        gridProperties: GridProperties;
    }

    export interface Sheet {
        properties: SheetProperties;
    }

    export interface Root {
        spreadsheetId: string;
        properties: Properties;
        sheets: Sheet[];
        spreadsheetUrl: string;
    }

}

