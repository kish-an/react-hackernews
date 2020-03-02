import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Stories from './components/Stories';
import Nav from './components/Nav';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Nav />

                <Switch>
                    <Route
                        exact
                        path='/'
                        render={props => <Stories {...props} type='top' />}
                    />
                    <Route
                        path='/new'
                        render={props => <Stories {...props} type='new' />}
                    />
                    <Route render={() => <h1 style={{ textAlign: 'center', color: '#c0392b' }}>🚨 404: Page not found!</h1>} />
                </Switch>
            </div>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));


