import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './navbar.css';

export default class MyNav extends Component {
    render() {
        return (
            <Navbar expand="lg" sticky="top" className="navbar-whole">

                <Navbar.Brand href="/" className="brand-parent">
                    <img src={logo} className="brand-logo" />
                    <div className="words">
                        <span className="words-top">BLACK STEEL</span>
                        <span className="words-bottom">MARKET</span>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-nav" />

                <Navbar.Collapse id="main-nav">
                    <div></div>
                        <Nav className="center-nav">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/shop">Shop</Nav.Link>

                            <NavDropdown title="Collections" id="collections-dropdown">
                                <NavDropdown.Item href="/armor">Armor</NavDropdown.Item>
                                <NavDropdown.Item href="/shields">Shields</NavDropdown.Item>
                                <NavDropdown.Item href="/arms">Arms</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav className="right-side-nav">
                            <Nav.Link href="/search">Search</Nav.Link>
                            <Nav.Link href="/cart">Cart</Nav.Link>
                        </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
        );
    }
}