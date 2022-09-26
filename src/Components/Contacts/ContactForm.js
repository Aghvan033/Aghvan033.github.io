import React, { useEffect, useState } from "react";
import { Form, Container, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { contactsService } from "../../services/Service";
function ContactForm({ title, btnValue }) {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contact, setContact] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (
          window.location.pathname === `/contacts/updateContact/${contactId}`
        ) {
          let res = await contactsService.getSingle(contactId);
          setContact(res.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMessage(err.message);
        console.log(errorMessage);
      }
    })();
  }, [contactId, errorMessage]);
  function newValues(evt) {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    });
  }
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response =
        window.location.pathname === "/contacts/addContact"
          ? contactsService.create(contact)
          : contactsService.update(contact, contactId);
      setLoading(false);
      if (response) navigate("/contacts/page", { replace: true });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
      alert(errorMessage);

      navigate("/contacts/page", { replace: true });
    }
  };
  return (
    <React.Fragment>
      <Container className="text-center my-4">
        <h2>{title}</h2>
      </Container>
      {!loading ? (
        <Form
          className="col-md-6 bg-dark py-4 px-5"
          onSubmit={submitForm}
          style={{ display: "block", margin: "0 auto" }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              required={true}
              name="name"
              value={contact.name}
              onChange={newValues}
              type={"text"}
              placeholder="Contact name"
              className="my-4"
            />
            <Form.Control
              required={true}
              name="mobile"
              value={contact.mobile}
              onChange={newValues}
              type={"tel"}
              placeholder="Contact mobile"
              className="my-4"
            />
            <Form.Control
              required={true}
              name="email"
              value={contact.email}
              onChange={newValues}
              type={"email"}
              placeholder="Contact email"
              className="my-4"
            />
          </Form.Group>
          <Row>
            <Form.Control
              className="col btn btn-outline-light my-4 mx-1"
              type={"submit"}
              value={btnValue}
            />
            <LinkContainer to={"/contacts/page"} className="col my-4">
              <Button variant="light">Cancel</Button>
            </LinkContainer>
          </Row>
        </Form>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default ContactForm;
