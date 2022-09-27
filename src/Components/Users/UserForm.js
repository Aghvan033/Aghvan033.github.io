import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { contactsService, usersService } from "../../services/Service";
function UserForm({ title, btnValue }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    contact: "",
    photo: "",
  });
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await contactsService.get();
        setContacts(res.data);
        if (window.location.pathname === `/users/updateUser/${userId}`) {
          const res = await usersService.getSingle(userId);
          setUser(res.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMessage(err.message);
        console.log(errorMessage);
      }
    })();
  }, [userId, errorMessage]);
  function newValues(evt) {
    setUser({
      ...user,
      [evt.target.name]: evt.target.value,
    });
  }
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let response =
        window.location.pathname === "/users/addUser"
          ? usersService.create(user)
          : usersService.update(user, userId);
      setLoading(false);
      if (response) navigate("/users/page", { replace: true });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
      alert(errorMessage);
      navigate("/users/page", { replace: true });
    }
  };
  return (
    <React.Fragment>
      <Container className="text-center my-4">
        <h2>{title}</h2>
      </Container>
      {!loading ? (
        <Form
          onSubmit={submitForm}
          className="col-md-6 bg-dark py-4 px-5"
          style={{ display: "block", margin: "0 auto" }}
        >
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  required={true}
                  name="username"
                  value={user.username}
                  onChange={newValues}
                  className="my-4"
                  type={"text"}
                  placeholder="User name"
                />
                <Form.Select
                  required
                  name="contact"
                  className="form-select"
                  id="select"
                  // HINT: use value instead of defaultValue
                  // assign a real value instead of an empty string
                  // and it can not be undefined cuz you will get an error in console when you change a contact
                  defaultValue={""}
                  onChange={(evt) => {
                    setUser({
                      ...user,
                      // HINT: use find instead of filter
                      contact: contacts.filter(
                        (contact) => evt.target.value === contact.mobile
                      )[0],
                    });
                  }}
                >
                  <option value="" disabled>
                    Contacts
                  </option>
                  {contacts.map((contact, index) => (
                    <option key={index}>{contact.mobile}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  required={true}
                  name="photo"
                  value={user.photo}
                  onChange={newValues}
                  className="my-4"
                  type={"text"}
                  placeholder="Contact photo Url"
                />
                <Image src={user.photo} className="user-photo" alt="contact" />
              </Col>
              <Row>
                <Form.Control
                  className="col btn btn-outline-light my-4 mx-1"
                  type={"submit"}
                  value={btnValue}
                />
                <LinkContainer to={"/users/page"} className="col my-4">
                  <Button variant="light">Cancel</Button>
                </LinkContainer>
              </Row>
            </Row>
          </Form.Group>
        </Form>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default UserForm;
