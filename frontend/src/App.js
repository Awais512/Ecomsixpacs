import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import { Route } from 'react-router-dom';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignup from './components/User/LoginSignup';
import store from './store';
import { loadUser } from './actions/userActions';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path='/' component={Home} />
      <Route exact path='/products/:id' component={ProductDetails} />
      <Route exact path='/products' component={Products} />
      <Route path='/product/:keyword' component={Products} />
      <Route path='/login' component={LoginSignup} />
      <Route path='/account' component={Profile} />

      <Route exact path='/search' component={Search} />

      <Footer />
    </>
  );
}

export default App;
