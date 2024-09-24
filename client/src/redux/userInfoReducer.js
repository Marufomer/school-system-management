import { createSlice } from "@reduxjs/toolkit";

export const userInfoReducer = createSlice({
    name: "userInfo",
    initialState: {
        firstName: "",
        middleName: "",
        regNum: ''
    },
    reducers: {
        getUserAction : (state, action) => {
            let {fName, mName, rNum} = action.payload
            return {
              firstName: fName,
              middleName: mName,
              regNum: rNum
            };

        }
    }
})

export const {getUserAction} = userInfoReducer.actions
export default userInfoReducer.reducer;