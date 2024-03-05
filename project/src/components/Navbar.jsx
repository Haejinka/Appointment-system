import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>Dashboard</NavLink> 
        </li>
        <li>
          <NavLink to="/client">Client</NavLink>
        </li>
        <li>
          <NavLink to="/pet">PetInfo</NavLink>
        </li>
        <li>
          <NavLink to="/appointment">Appointment</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
