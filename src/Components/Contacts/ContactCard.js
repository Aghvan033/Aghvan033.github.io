import React from "react";
import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ContactCard({
  contact,
  name,
  mobile,
  email,
  setErrorMessage,
  onCompleteChange,
  showDelete,
  removeContact,
}) {

  const checkIsSelected = async (e) => {
    try {
      onCompleteChange(e.target.checked);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  return (
    <Card className="col-md-4 mx-2 my-2">
    <Card.Body>
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          Name : <span className="fw-bold">{name}</span>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Mobile : <span className="fw-bold">{mobile}</span>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Email : <span className="fw-bold">{email}</span>
        </ListGroup.Item>
      </ListGroup>
      <Container className="d-flex justify-content-between align-items-center my-2">
        <LinkContainer to={`/contacts/updateContact/${contact.id}`}>
          <Button variant="primary" size="md" active>
            <i className="fas fa-pen" />
          </Button>
        </LinkContainer>
        {showDelete ? (
          <Form.Check
            onChange={checkIsSelected}
            checked={contact.isCompleted || false}
            className="px-2 py-2"
          />
        ) : (
          ""
        )}
        <Button
          variant="danger"
          size="md"
          active
          onClick={() => removeContact(contact.id)}
        >
          <i className="fas fa-trash " />
        </Button>
      </Container>
    </Card.Body>
  </Card>
  );
}
export default ContactCard;
