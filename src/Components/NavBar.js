import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <div className="container justify-content-end">
        <Link to={"/"} className="navbar-brand">
          <i className="fa-solid fa-mobile p-2 text-warning"></i>
          <span>Contacts</span>
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
