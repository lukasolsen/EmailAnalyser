// actions.ts
import { Action } from "redux";

export const ADD_REPORT = "ADD_REPORT";
export const REMOVE_REPORT = "REMOVE_REPORT";
export const UPDATE_REPORT = "UPDATE_REPORT";





export interface AddReportAction extends Action<typeof ADD_REPORT> {
  payload: IReport;
}

export interface RemoveReportAction extends Action<typeof REMOVE_REPORT> {
  payload: string; // reportId
}

export interface UpdateReportAction extends Action<typeof UPDATE_REPORT> {
  payload: IReport;
}

export type ReportActionTypes =
  | AddReportAction
  | RemoveReportAction
  | UpdateReportAction;

export const addReport = (report: IReport): AddReportAction => ({
  type: ADD_REPORT,
  payload: report,
});

export const removeReport = (reportId: string): RemoveReportAction => ({
  type: REMOVE_REPORT,
  payload: reportId,
});

export const updateReport = (report: IReport): UpdateReportAction => ({
  type: UPDATE_REPORT,
  payload: report,
});
