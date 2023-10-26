import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="">
        <ul className="flex flex-row flex-wrap justify-between">
          <li>
            <Link to="/portal">Portal</Link>
          </li>
          <li>
            <Link to="/clients">Clients</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/stock">Stock</Link>
          </li>
          <li>
            <Link to="/profileAdmin">ProfileAdmin</Link>
          </li>
          <li>
            <Link to="/profileManager">ProfileManager</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
