import { createSlice } from "@reduxjs/toolkit";

// question reducer
export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
    examId: null,
    examTitle: "",
  },
  reducers: {
    startExamAction: (state, action) => {
      let { question, answers } = action.payload;
      return {
        ...state,
        queue: question,
        answers,
      };
    },
    moveNextAction: (state, action) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrevAction: (state, action) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    resetAllAction: (state, action) => {
      return {
        queue: [],
        answers: [],
        trace: 0,
        examId: null,
        examTitle: "",
      };
    },
    setExamIdAction: (state, action) => {
      return {
        ...state,
        examId: action.payload,
      };
    },
    setExamTitleAction : (state, action) => {
        return {
            ...state,
            examTitle: action.payload,
        }
    }
  },
});

export const {startExamAction, moveNextAction, movePrevAction, resetAllAction, setExamIdAction, setExamTitleAction} = questionReducer.actions
export default questionReducer.reducer;