import React from "react";
import { pageRoutes, themeConfig } from "@/configs";
import { Icon } from "@iconify/react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	return (
		<section className="header--section">
			<Navbar expand="lg">
				<Container fluid>
					<Navbar.Brand as="img" src={themeConfig.images.Logo} className="me-0 logo--img p-0" />
					<Nav as="div" className="w-100">
						<NavDropdown title="oprations" className="text-capitalize p-0 menu--list text-decoration-none"></NavDropdown>
						<NavDropdown
							as="div"
							title="Smart Query"
							className="text-capitalize p-0 menu--list text-decoration-none"
							onClick={() => navigate(pageRoutes.smart_query)}
						></NavDropdown>
					</Nav>
					<NavDropdown title={<Icon icon="mingcute:user-4-fill" className="d-block text-white-primary" />} className="account--dropdown">
						<NavDropdown.Item href="#!">sign in</NavDropdown.Item>
					</NavDropdown>
				</Container>
			</Navbar>
			<div className="divider bg-light-black"></div>
		</section>
	);
}
