import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default class MyNav extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top" variant="light">
                <Container fluid>
                    <Navbar.Brand href="/">STM</Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-nav" />

                    <Navbar.Collapse id="main-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/shop">Shop</Nav.Link>

                            <NavDropdown title="Collections" id="collections-dropdown">
                                <NavDropdown.Item href="/armor">Armor</NavDropdown.Item>
                                <NavDropdown.Item href="/shields">Shields</NavDropdown.Item>
                                <NavDropdown.Item href="/arms">Arms</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <Nav.Link href="/search">Search</Nav.Link>
                            <Nav.Link href="/cart">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}