import React from 'react';

import { Navbar, Nav, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { authService } from '../../services/auth';
import './style.css';

export default function NavbarComponent(props) {
  const { user } = props;

  const handleSignout = () => {
    authService.logout();
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        className="navbar-icon-top"
      >
        <Navbar.Brand href={routes.HOME}>React-Notification</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              exact
              to={routes.HOME}
              className="nav-link"
              activeClassName="active"
            >
              Home
            </NavLink>
            <NavLink
              exact
              to={routes.ABOUT}
              className="nav-link"
              activeClassName="active"
            >
              About
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            {user && (
              <NavLink
                exact
                to={routes.NOTIFICATIONS_LIST}
                className="nav-link"
                activeClassName="active"
              >
                Notifications
                <Badge className="bg-danger notification-count" text="primary">
                  15
                </Badge>
              </NavLink>
            )}
            {user && (
              <Nav.Link eventKey={12} onClick={handleSignout}>
                Logout
              </Nav.Link>
            )}
            {!user && (
              <NavLink
                exact
                to={routes.LOGIN}
                className="nav-link"
                activeClassName="active"
              >
                Sign in
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
