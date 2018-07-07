import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import {connectSocketServer} from "./plugins/socket";
import auth from "./plugins/auth";
import { Provider } from "react-redux";

connectSocketServer();
auth.initializeGoogleAuth();
const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
