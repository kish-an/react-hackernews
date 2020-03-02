import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Stories from './components/Stories';
import Nav from './components/Nav';
import { ThemeProvider } from './contexts/theme';
import User from './components/User';
import StoryComments from './components/StoryComments';

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log(theme);
    };

    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className="container">
                        <Nav toggleTheme={toggleTheme} />

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
                            <Route path='/user' component={User} />
                            <Route path='/post' component={StoryComments} />
                            <Route render={() => <h1 style={{ textAlign: 'center', color: '#c0392b' }}>🚨 404: Page not found!</h1>} />
                        </Switch>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));


