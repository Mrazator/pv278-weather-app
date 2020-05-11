import { ITableState } from "app/components/dynamic-table/DynamicTable";

export interface ISearchState {
    from: Date;
    to: Date;
}

export interface IProcessedData {
    date: string;
    probability: Number;
}

export interface IDashBoardState {
    search: ISearchState;
    rawData: IRawDataState;
    processedData: IProcessedDataState;
    table: ITableState;
}

export interface IRawDataState {
    precipitation: any[];
    sunshine: any[];
    snow: any[];
}

export interface IProcessedDataState {
    precipitation: IProcessedData[];
    sunshine: IProcessedData[];
    snow: IProcessedData[];
}