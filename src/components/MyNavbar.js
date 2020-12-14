import React from 'react'

import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home" >Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to='/home'  component={Nav.Link}>Home</Link>
        <Link to='/board' component={Nav.Link}>Board</Link>
      </Nav>
    </Navbar>
  )
}
