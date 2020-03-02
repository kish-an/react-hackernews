import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
    color: '#d35400',
}

const Nav = () => {
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
        </nav>
    )
}

export default Nav;

