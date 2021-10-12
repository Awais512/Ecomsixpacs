import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
