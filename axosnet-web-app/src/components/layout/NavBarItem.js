import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarItem = ({ pathlink, textlink }) => {
	return (
		<Link to={pathlink} className="navbar-item has-text-weight-bold">
			{textlink}
		</Link>
	);
};

export default NavbarItem;
