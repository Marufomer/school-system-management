import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../axiosConfig2.js";

// redux action
import * as Action from '../redux/questionReducer';

// fetch question hook to fetch api data and set value to store 
export const useFetchQuestion = (id) => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({isLoading: false, apiData: [], serverErorr: null})

    useEffect(() => {
      setGetData((prev) => ({ ...prev, isLoading: true }));

      // async function fetch backend data
      async function get_data() {
        
        try {
            let questions = await axios.get(
              `/question/all_question/${id}`
            );
            let question = questions.data.questions;
            let answers = questions.data.answers;

            if (question.length>0) {
                setGetData((prev) => ({ ...prev, isLoading: false }));
                setGetData((prev) => ({
                  ...prev,
                  apiData: { question, answers },
                }));

                // dispatch an action
                dispatch(Action.startExamAction({ question, answers }));
            }

        } catch (error) {
            setGetData((prev) => ({ ...prev, isLoading: false }));
            setGetData((prev) => ({ ...prev, serverErorr: error }));
        }
      }
      get_data();
    }, [dispatch])

    return [getData, setGetData];
}

// moveAction dispatch
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /**increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
      dispatch(Action.movePrevAction()); /**decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}