import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import WebFontLoader from 'webfontloader';

import './index.css';
import App from './App';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';

import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="page-1" component={Page1} />
      <Route path="page-2" component={Page2} />
    </Route>
  </Router>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
