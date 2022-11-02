import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ContextProvider} from './contexts/ContextProvider'
import { Provider } from 'react-redux';
import store from './store';


window.store = store;

ReactDOM.render(

<Provider store={store}>
    <ContextProvider>
        <App />  



    </ContextProvider>
 </Provider>

, 


document.getElementById('root'))