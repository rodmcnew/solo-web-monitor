import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios';
import createLogger from 'redux-logger';
import { createSession } from 'redux-session';
import thunkMiddleware from 'redux-thunk';
import httpClient from './httpClient';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const localStorageSession = createSession({
    ns: 'ubermon-session',
    selectState(state) {
        return {
            session: state.session
        };
    }
});

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        // preloadedState, //@TODO
        applyMiddleware(
            thunkMiddleware,
            axiosMiddleware({ default: httpClient }),
            // localStorageSession, //@TODO
            // loggerMiddleware //@TODO
        )
    )
}

