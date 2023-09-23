import {
  ADD_REPORT,
  IReport,
  REMOVE_REPORT,
  ReportActionTypes,
  UPDATE_REPORT,
} from "./actions";

interface State {
  reports: IReport[];
}

const initialState: State = {
  reports: [],
};

const reportReducer = (
  state: State = initialState,
  action: ReportActionTypes
): State => {
  switch (action.type) {
    case ADD_REPORT:
      return {
        ...state,
        reports: [...state.reports, action.payload],
      };

    case REMOVE_REPORT:
      return {
        ...state,
        reports: state.reports.filter((report) => report.id !== action.payload),
      };

    case UPDATE_REPORT:
      return {
        ...state,
        reports: state.reports.map((report) =>
          report.id === action.payload.id ? action.payload : report
        ),
      };

    default:
      return state;
  }
};

export default reportReducer;
