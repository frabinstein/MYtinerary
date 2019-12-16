import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

const defaultUserIcon = require('../images/icons-logos/default-user-icon.png')


const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar light id="header">
        <img src={defaultUserIcon} onClick={toggleNavbar} alt="" id="userIcon"/>
        <NavbarToggler className="mr-2" id="hamburgerButton"/>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="./signup">Create account</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="./login">Log in</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
