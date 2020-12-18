import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navbar.css'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <NavLink exact activeClassName='active' className="nav-link" to="/">My Favorite Videos</NavLink>
                <ul className="navbar-nav">
                    <li>
                        <NavLink exact activeClassName='active' className="nav-link" to="/new-video">Create New Video</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}