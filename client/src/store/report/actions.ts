// actions.ts
import { Action } from "redux";

export const SET_REPORT = "SET_REPORT";
export const REMOVE_REPORT = "REMOVE_REPORT";
export const UPDATE_REPORT = "UPDATE_REPORT";

export interface IReport {
  id?: string;
  hash: string;
  ip: string;
  tags: string[];
  detections: number;
  firstReport: string;
  lastReport: string;
  submitters: string[];
  icon: string;

  // Optional fields
  yara_results?: YaraResults[];
}

export interface YaraResults {
  description: string;
  source: string;
  author: string;
  ruleset_name: string;
  rule_name: string;
  ruleset_id: string;
}

export interface AddReportAction extends Action<typeof SET_REPORT> {
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

export const setReport = (report: IReport): AddReportAction => ({
  type: SET_REPORT,
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
