// App.tsx
import React from 'react';
import SwipeApartments from './components/BoligImage';  

const App: React.FC = () => {
  return (
    <div>
      <h1>Apartment Swipe Demo</h1>
      <SwipeApartments />
    </div>
  );
};

export default App;
