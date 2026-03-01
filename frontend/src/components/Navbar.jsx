import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <span className="nav-logo">♥</span>
                <span className="nav-title">CardioGuard</span>
            </div>

            <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
                <span /><span /><span />
            </button>

            <ul className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
                <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/predict" className={({ isActive }) => isActive ? 'active' : ''}>Predict</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
            </ul>
        </nav>
    )
}
