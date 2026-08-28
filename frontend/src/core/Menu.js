import React, { Fragment } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import {itemTotal} from "./cartHelpers"
import "./nav.css";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#7FFF00" };
    } else {
        return { color: "white" };
    }
};

const Menu = ({ history }) => (
    <div>
		<Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
			<Container>
				<Navbar.Toggle aria-controls='responseive-navbar-nav' />
				<Navbar.Collapse id='responsice-navbar-nav'>
					<Link className="navbar-brand" to={"/"}>Kisaan Mitra</Link>
					<Nav className="mine">
						<Nav.Link as={Link} style={isActive(history, "/")} to="/">Home</Nav.Link>

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
						<Nav.Link as={Link} style={isActive(history, "/buy")} to="/buy">BuyNow</Nav.Link>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<Nav.Link as={Link} style={isActive(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Nav.Link>
						)}
	
						{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<Nav.Link as={Link} style={isActive(history, "/farmer/dashboard")} to="/farmer/dashboard">Dashboard</Nav.Link>
						)}

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
						<Nav.Link as={Link} style={isActive(history, "/cart")} to="/cart">Cart{""}
                            <sup>
                                <small className="cart-badge">{itemTotal()}</small>
                            </sup>
                        </Nav.Link>
						)}

						{!isAuthenticated() && (
                    <Fragment>
                        <Nav.Link as={Link} style={isActive(history, "/signin")} to="/signin">Signin</Nav.Link>
						<Nav.Link as={Link} style={isActive(history, "/signup")} to="/signup">Signup</Nav.Link>
                    </Fragment>
                )}
				
					{isAuthenticated() && (
                    <Nav.Link as="span">
                        <span
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/");
                                })
                            }
                        >
                        Signout
                        </span>
                    </Nav.Link>
                )}
						
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
    </div>
);

export default withRouter(Menu);
