import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Notes</Link>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)