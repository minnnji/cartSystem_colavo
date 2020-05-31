import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CartContainer from './CartContainer.tsx';
import ItemListContainer from './ItemListContainer.tsx';
import DiscountListContainer from './DiscountListContainer.tsx';
import GlobalStyle from '../components/layout/GlobalStyles';

const AppContainer = () => (
  <>
    <GlobalStyle />
    <Switch>
      <Route exact path='/cart' component={CartContainer} />
      <Route path='/cart/item' component={ItemListContainer} />
      <Route path='/cart/discount' component={DiscountListContainer} />
      <Route render={() => <Redirect to='/cart' />} />
    </Switch>
  </>
);

export default AppContainer;
