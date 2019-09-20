import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const PageNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand>High Card Draw</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <Nav.Link href="https://aaronmassey.pro">Home</Nav.Link>
        <Nav.Link href="https://medium.com/@aaronmassey45">Blog</Nav.Link>
        <Nav.Link href="https://github.com/aaronmassey45">Github</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default PageNavbar;
