import { ApolloClient} from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import LoginPage from './components/Login';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom';
import UserList from './components/UserList';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path = "/users" component = {UserList} />
        <Route path = "/" component = {LoginPage} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
