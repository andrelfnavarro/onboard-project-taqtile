import { ApolloClient } from 'apollo-boost';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import LoginPage from './components/Login';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UserDetails from './components/UserDetails'



const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
})


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth-token');
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/userdetails/:id" component={UserDetails}/>
        <Route path="/adduser" component={AddUser} />
        <Route path="/users" component={UserList} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
