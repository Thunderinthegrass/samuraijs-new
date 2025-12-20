import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import {BrowserRouter} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from './state/store';
import reduxStore from "./redux/redux-store";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App reduxStore={reduxStore} />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
