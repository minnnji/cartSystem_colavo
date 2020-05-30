import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <RecoilRoot>
    <HashRouter>
      <AppContainer />
    </HashRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
