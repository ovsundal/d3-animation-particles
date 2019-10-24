import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from "./containers/AppContainer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {resizeScreen} from "./actions";
import { select as d3Select } from "d3";
import particlesApp from "./reducers";

let store = createStore(particlesApp);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root'));

let onResize = function() {
    store.dispatch(resizeScreen(window.innerWidth, window.innerHeight));
};
onResize();

d3Select(window).on("resize", onResize);
