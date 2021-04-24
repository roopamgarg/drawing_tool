import { createStore, applyMiddleware, compose, Store, Action } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";
const middleware = [thunk];
const initialState = {};

function configureStore(
  initialState: IApplcationState
): Store<IApplcationState> {
  return createStore<IApplcationState, Action<any>, unknown, unknown>(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
      //  process.env.NODE_ENV === 'DEV' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}


export const store = configureStore(initialState);