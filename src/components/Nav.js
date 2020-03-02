import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/theme';

const styles = {
    color: '#d35400',
}

const Nav = ({ toggleTheme }) => {
    const theme = useContext(ThemeContext);

    return (
        <nav className='row space-between'>
            <ul className='row nav'>
                <li>
                    <NavLink exact to='/' activeStyle={styles} className='nav-link'>
                        Top
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/new' activeStyle={styles} className='nav-link'>
                        New
                    </NavLink>
                </li>
            </ul>
            <button
                className='btn-clear'
                onClick={toggleTheme}
                style={{fontSize: 30}}
            >
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}

Nav.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
}

export default Nav;

