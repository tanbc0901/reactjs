import React, { Suspense } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/home/home';
import TransactionDetail from './components/transaction/transaction-detail';
import Createtransaction from './components/transaction/create-transaction';

const EditProfile = React.lazy(() => import('./components/user-profile/edit-profile'));

export function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
              <Link to='/edit-profile'>Edit Profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path="/edit-profile">
            <Suspense fallback={<div>Loading...</div>}>
              <EditProfile />
            </Suspense>
          </Route>

          <Route path='/create-transaction'>
            <Suspense fallback={<div>Loading...</div>}>
              <Createtransaction />
            </Suspense>
          </Route>

          <Route path='/transaction-detail/:id' render={(props) => <TransactionDetail {...props} />} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
