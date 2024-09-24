import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userInfoReducer from './userInfoReducer';
import toggleReducer from './toggleReducer';
import questionReducer from './questionReducer';
import resultReducer from './resultReducer';
import teacherInfoReducer from './teacherInfoRedux';

const rootReducer = combineReducers({
    userInfo : userInfoReducer,
    toggle : toggleReducer,
    questions : questionReducer,
    result : resultReducer,
    teacherInfo: teacherInfoReducer

})


// create store

export default configureStore({reducer: rootReducer})