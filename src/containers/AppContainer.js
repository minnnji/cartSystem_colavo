import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CartContainer from './CartContainer';
import GlobalStyle from '../components/layout/GlobalStyles';

const AppContainer = () => (
  <>
    <GlobalStyle />
    <Switch>
      <Route path='/cart' component={CartContainer} />
      <Route render={() => <Redirect to='/cart' />} />
    </Switch>
  </>
);

export default AppContainer;
