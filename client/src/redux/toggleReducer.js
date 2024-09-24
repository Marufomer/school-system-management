import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const toggleReducer = createSlice({
    name: "toggle",
    initialState: {
        alert: '',
        login: true,
        password: false,
        exam: true,
        loginStudent: true,
        loginTeacher: false
    },
    reducers: {
        toggleRegisterAction : (state) => {
            return {
                ...state,
                login: false
            }
        },
        toggleLoginAction : (state) => {
            return {
                ...state,
                login: true
            }
        },
        showAlertAction : (state, action) => {
            return {
                ...state,
                alert: action.payload
            }
        },
        toggleExamAction : (state) => {
            return{
                ...state,
                exam: false
            }
        },
        toggleLoginStudent: (state) => {
            return {
              ...state,
              loginTeacher: false,
              loginStudent: true,
            };
        },
        toggleLoginTeacher: (state) => {
            return {
              ...state,
              loginTeacher: true,
              loginStudent: false
            };
        },
        togglePasswordAction : (state) => {
            let temp = false;
            if (state.password) {
                temp = false;
            } else  {
                temp = true;
            }
            return {
                ...state,
                password: temp
            }
        }
    }
})

export const {
  toggleLoginAction,
  toggleRegisterAction,
  togglePasswordAction,
  showAlertAction,
  toggleExamAction,
  toggleLoginStudent,
  toggleLoginTeacher
} = toggleReducer.actions;
export default toggleReducer.reducer;