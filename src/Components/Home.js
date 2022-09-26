import { Card, Container,Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Home() {
  return (
    <Container className="d-flex justify-content-evenly my-5">
        <LinkContainer to={"/contacts/page"} style={{ cursor: "pointer" }} >
          <Card className="col-md-4">
            <Row className="my-4">
              <Card.Img
                src="http://cdn.onlinewebfonts.com/svg/img_147380.png"
                className="routImg"
              />
            </Row>
            <Card className="my-4 py-2 text-center">Contacts</Card>
          </Card>
        </LinkContainer>
        <LinkContainer to={"/users/page"} style={{ cursor: "pointer" }}>
          <Card className="col-md-4">
            <Row className="my-4">
              <Card.Img
                src="https://iconape.com/wp-content/png_logo_vector/users.png"
                className="routImg"
              />
            </Row>
            <Card className="my-4 py-2 text-center">Users</Card>
          </Card>
        </LinkContainer>
      </Container>
  );
}

export default Home;
