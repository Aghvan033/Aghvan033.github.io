import React, { useEffect, useState } from "react";
import { usersService } from "../../services/Service";
import UserCard from "./UserCard";
import Spinner from "../Spinner";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function UserPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await usersService.get();
        setUsers(res.data);
      } catch (err) {
        setErrorMessage(err.message);
        console.log(errorMessage);
      }
    })();
  }, [errorMessage]);
  const removeUser = async (userId) => {
    const confirmation = window.confirm("Are you sure");
    if (confirmation === true) {
      try {
        let res = await usersService.delete(userId);
        if (res) {
          setLoading(true);
          let res = await usersService.get();
          setLoading(false);
          setUsers(res.data);
        }
      } catch (err) {
        setLoading(false);
        setErrorMessage(err.message);
      }
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <Container className="mb-5 mt-3">
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(evt) => setSearch(evt.target.value)}
                type={"text"}
                placeholder={"Search User..."}
                className="mx-2"
              />
              <LinkContainer to="/users/addUser">
                <Button variant="primary">Add User</Button>
              </LinkContainer>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          {loading ? (
            <Spinner />
          ) : (
            users.length > 0 &&
            users.map((user, index) =>
              user.username.toUpperCase().includes(search.toUpperCase()) ? (
                <UserCard
                  key={index}
                  id={user.id}
                  username={user.username}
                  contact={user.contact}
                  photo={user.photo}
                  removeUser={removeUser}
                  setErrorMessage={setErrorMessage}
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
export default UserPage;
