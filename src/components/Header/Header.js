import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <DropdownButton id="performances" className="mr-2 mb-2" title="Performances" alignRight>
      <Dropdown.Item href="#performances">See All</Dropdown.Item>
      <Dropdown.Item href="#create-performance">Add A Performance</Dropdown.Item>
    </DropdownButton>

    <DropdownButton id="repertoire" className="mr-2 mb-2" title="Repertoire" alignRight>
      <Dropdown.Item href="#pieces">See All</Dropdown.Item>
      <Dropdown.Item href="#create-piece">Add A Piece</Dropdown.Item>
    </DropdownButton>

    <DropdownButton id="settings" className="mr-2 mb-2" title="Sign Out" alignRight>
      <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
      <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
    </DropdownButton>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link class="auth" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link class="auth" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar class="hamburger" variant="light" expand="md" collapseOnSelect>
    <Navbar.Brand>Music Buddy</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {/* // { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>} */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
