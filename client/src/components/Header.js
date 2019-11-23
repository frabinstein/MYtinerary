import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const defaultUserIcon = require('../images/icons-logos/default-user-icon.png')


class Header extends React.Component {
  render() {
    return (
      <Navbar light id="header">
        <img src={defaultUserIcon} alt="" id="userIcon"/>
        <NavbarToggler id="hamburgerButton"/>
      </Navbar>
    );
  }
}

export default Header;
