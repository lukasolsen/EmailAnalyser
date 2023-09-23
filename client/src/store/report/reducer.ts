import { IReport, ReportActionTypes, SET_REPORT } from "./actions";

interface State {
  report: IReport;
}

const initialState: State = {
  report: {
    hash: "",
    ip: "",
    tags: [],
    detections: 0,
    firstReport: "",
    lastReport: "",
    submitters: [],
    icon: "",

    yara_results: [],
  },
};

const reportReducer = (
  state: State = initialState,
  action: ReportActionTypes
): State => {
  switch (action.type) {
    case SET_REPORT:
      if (typeof action.payload === "string") {
        return {
          ...state,
          report: {
            ...state.report,
            hash: action.payload,
          },
        };
      }
      return {
        ...state,
        report: action.payload,
      } as State; // Add this line to explicitly cast the return value to State

    default:
      return state;
  }
};

export default reportReducer;
