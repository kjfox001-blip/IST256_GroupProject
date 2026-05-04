import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.png';
import './navbar.css';

export default function MyNav() {
  return (
    <Navbar expand="lg" sticky="top" className="navbar-whole">
      <LinkContainer to="/">
        <Navbar.Brand className="brand-parent">
          <img src={logo}  className="brand-logo" />
          <div className="words">
            <h1 className="words-top">BLACK STEEL</h1>
            <h1 className="words-bottom">MARKET</h1>
          </div>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="main-nav" />

      <Navbar.Collapse id="main-nav">
        <div></div>

        <Nav className="center-nav">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/shop">
            <Nav.Link>Shop</Nav.Link>
          </LinkContainer>

          <NavDropdown title="Collections" id="collections-dropdown">
            <LinkContainer to="/armor">
              <NavDropdown.Item>Armor</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="/shields">
              <NavDropdown.Item>Shields</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="/arms">
              <NavDropdown.Item>Arms</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>

        <Nav className="right-side-nav">
          <LinkContainer to="/cart">
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}