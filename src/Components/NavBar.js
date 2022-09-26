import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <Navbar bg="light">
      <Container>
        <LinkContainer to={"/"} style={{ cursor: "pointer" }}>
          <i className="fas fa-home" />
        </LinkContainer>
        <Navbar.Collapse className="justify-content-end">
          <LinkContainer
            to={"/contacts/page"}
            className="mx-5"
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="fas fa-mobile p-2 text-warning" />
              Contacts
            </span>
          </LinkContainer>
          <LinkContainer
            to={"/users/page"}
            className="mx-5"
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="fas fa-users p-2 text-success" />
              Users
            </span>
          </LinkContainer>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
