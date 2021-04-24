import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import {Provider} from "react-redux";
import { ClassRoom } from "./Components/ClassRoom/ClassRoom";
import { DrawingBoard } from "./Components/DrawingBoard";
import {store} from "./redux/store";
import "./Styles/index.scss";
import thunk from "redux-thunk";


function App(){
    
    return (
        <Provider store={store}>
            <ClassRoom/>
        </Provider>
    )
}

render(<App/>, document.getElementById("root"));