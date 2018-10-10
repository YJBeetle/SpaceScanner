import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WebFontLoader from 'webfontloader';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

registerServiceWorker();
