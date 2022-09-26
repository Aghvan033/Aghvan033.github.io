import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { contactsService, usersService } from "../../services/Service";
import ContactCard from "./ContactCard"
import Spinner from "../Spinner";

function ContactsPage() {
  const [search, setSearch] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState({});
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    (async () => {
      try {
        let res = await contactsService.get();
        setContacts(res.data);
      } catch (err) {
        setErrorMessage(err.message);
        console.log(errorMessage);
      }
    })();
  }, [errorMessage]);
  const removeContact = async (contactId) => {
    const confirmation = window.confirm("Are you sure");
    if (confirmation === true) {
      try {
        let res = await contactsService.delete(contactId);
        if (res) {
          setLoading(true);
          let res = await contactsService.get();
          setLoading(false);
          setContacts(res.data);
        }
      } catch (err) {
        setLoading(false);
        setErrorMessage(err.message);
      }
    } else {
      return false;
    }
  };
  const removeSelected = async () => {
    try {
      for (const contact of contacts) {
        if (contact.isCompleted === true) {
          await contactsService.delete(contact.id);
        }
      }
      const res = await contactsService.get();
      setContacts(res.data);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleCompleteChange = (contactId, isCompleted) => {
    setContacts(
      contacts.map((contact) => {
        if (contact.id === contactId) {
          contact.isCompleted = isCompleted;
        }

        return { ...contact };
      })
    );
  };
  return (
    <React.Fragment>
    <Container className="col text-center mb-5 mt-3">
      <Row>
        <Col>
          <Form.Control
            onChange={(evt) => setSearch(evt.target.value)}
            type={"text"}
            placeholder={"Search Contact"}
          />
          <LinkContainer to={"/contacts/addContact"} className="mt-2">
            <Button variant="primary">
              Add Contact
              <i className="fas fa-plus-circle mx-2" />
            </Button>
          </LinkContainer>
        </Col>
        <Col>
          {showDelete ? (
            <Button variant="outline-danger" onClick={removeSelected}>
              Delete Selected
            </Button>
          ) : (
            ""
          )}
          <Button
            variant="outline-secondary"
            className="mx-2"
            onClick={() => setShowDelete(!showDelete)}
          >
            {!showDelete ? "Select" : "Cancel"}
          </Button>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="justify-content-center">
        {loading ? (
          <Spinner />
        ) : (
          contacts.length > 0 &&
          contacts.map((contact, index) =>
            contact.name.toUpperCase().includes(search.toUpperCase()) ? (
              <ContactCard
                key={index}
                contact={contact}
                name={contact.name}
                mobile={contact.mobile}
                email={contact.email}
                setLoading={setLoading}
                setContacts={setContacts}
                onCompleteChange={(isCompleted) =>
                  handleCompleteChange(contact.id, isCompleted)
                }
                removeContact={removeContact}
                setErrorMessage={setErrorMessage}
                showDelete={showDelete}
              />
            ) : (
              ""
            )
          )
        )}
      </Row>
    </Container>
  </React.Fragment>
  );
}
export default ContactsPage;
