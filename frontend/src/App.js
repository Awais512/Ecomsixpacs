import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import { Route } from 'react-router-dom';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);
  return (
    <>
      <Header />

      <Route exact path='/' component={Home} />
      <Route exact path='/products/:id' component={ProductDetails} />
      <Route exact path='/products' component={Products} />
      <Route path='/product/:keyword' component={Products} />

      <Route exact path='/search' component={Search} />

      <Footer />
    </>
  );
}

export default App;
