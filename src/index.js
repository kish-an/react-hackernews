import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stories from './components/Stories';

const App = () => {
    return (
        <div className="container">
            <Stories type='top' />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));


