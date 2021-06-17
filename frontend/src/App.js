import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './core/components/routes';
import { authService } from './core/services/auth';

import NavbarComponent from './core/components/navbar';

function App() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = authService.getUserToken();
    if (userToken) {
      authService.getUserDetail().then(
        (res) => {
          console.log('res', res);
          if (res.status === 200) {
            setUser(res.data);
          }
        },
        (err) => {
          console.log('err', err);
        }
      );
    }
    setLoading(false);
  }, []);

  return (
    <Router>
      <NavbarComponent user={user} />
      <div>
        {loading && 'Loading ...'}
        <Routes user={user}></Routes>
      </div>
    </Router>
  );
}

export default App;
