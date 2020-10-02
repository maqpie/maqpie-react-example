import React from 'react';
import Maqpie from './maqpie';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // clean up resources when user leave page (component umnount)
    return () => {
      window.MP.unsubscribe();
      window.MP.destroyLargeView();
    };
  });

  return (
    <div className="App">
      <div>Unread messages count: {count}</div>
      <Maqpie
        appId="5f64b302c389e9005ab1d0ea"
        user={{
          username: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@demo.com',
          userId: 'testUser1',
        }}
        onMessageCountChange={setCount}
      />
    </div>
  );
}

export default App;
