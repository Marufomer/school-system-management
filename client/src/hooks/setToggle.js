import * as Action from '../redux/toggleReducer';

export const toggleRrgister = () => async (dispatch) => {
    try {
        dispatch(Action.toggleRegisterAction()); /** change login to false */
    } catch (error) {
        console.log(error)
    }
}
export const toggleLogin = () => async (dispatch) => {
    try {
        dispatch(Action.toggleLoginAction()); /** change login to true */
    } catch (error) {
        console.log(error)
    }
}
export const togglePassword = () => async (dispatch) => {
    try {
        dispatch(Action.togglePasswordAction())
    } catch (error) {
        console.log(error)
    }
}
export const showAlert = (danger) => async (dispatch) => {
  try {
    dispatch(Action.showAlertAction(danger));
  } catch (error) {
    console.log(error);
  }
};
