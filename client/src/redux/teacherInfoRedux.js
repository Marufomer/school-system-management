import { createSlice } from "@reduxjs/toolkit";

export const teacherInfoReducer = createSlice({
  name: "teacherInfo",
  initialState: {
    firstName: "",
    middleName: "",
    regNum: "",
  },
  reducers: {
    getTeacherAction: (state, action) => {
      let { fName, mName, rNum } = action.payload;
      return {
        firstName: fName,
        middleName: mName,
        regNum: rNum,
      };
    },
  },
});

export const { getTeacherAction } = teacherInfoReducer.actions;
export default teacherInfoReducer.reducer;
