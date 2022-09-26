import React, { useState } from "react";
import { Button, ListGroup, Card, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function UserCard({ username, id, photo, contact, removeUser }) {
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <Card className="col-md-4 mx-2 my-2" style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          className="user-photo"
          src={photo}
          alt="user-photo"
        />
        <Card.Body>
          <ListGroup as="ul">
            <ListGroup.Item as="li">
              Id : <span className="fw-bold">{id}</span>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Username : <span className="fw-bold">@{username}</span>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                Contact : <span className="fw-bold">{contact.mobile}</span>
              </span>
              <Button variant="primary" onClick={() => setShow(!show)}>
                {show ? "Close" : "Show"}
              </Button>
            </ListGroup.Item>
          </ListGroup>
          <Container className="d-flex justify-content-between align-items-center my-2">
            <LinkContainer to={`/users/updateUser/${id}`}>
              <Button variant="primary" size="md" active>
                <i className="fas fa-pen" />
              </Button>
            </LinkContainer>
            <Button
              variant="danger"
              size="md"
              active
              onClick={() => removeUser(id)}
            >
              <i className="fas fa-trash " />
            </Button>
          </Container>
        </Card.Body>
        {show && (
          <ListGroup
            className="showBox col-md-12"
            as="ul"
            style={{ border: "none" }}
          >
            <ListGroup.Item as="li">
              Name : <span className="fw-bold">{contact.name}</span>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Mobile : <span className="fw-bold">{contact.mobile}</span>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Email : <span className="fw-bold">{contact.email}</span>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Card>
    </React.Fragment>
  );
}
export default UserCard;
