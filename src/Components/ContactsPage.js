import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { service } from "../services/Service";
import ContactCard from "./ContactCard";
import Spinner from "./Spinner";

function ContactsPage() {
  const [search, setSearch] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let res = await service.getContacts();
        setContacts(res.data);
      } catch (err) {
        setErrorMessage(err.message);
        console.log(errorMessage);
      }
    })();
  }, [errorMessage]);

  const removeSelected = async () => {
    try {
      contacts.map(async (contact) => {
        if (contact.isCompleted === true) {
          await service.deleteContact(contact.id);
        }
      });
      const res = await service.getContacts();
      setContacts(res.data);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <React.Fragment>
      <div className="container col text-center mb-5 mt-3">
        <div className="row">
          <div className="col">
            <input
              onChange={(evt) => setSearch(evt.target.value)}
              type={"text"}
              placeholder={"Search Contact"}
              className="form-control text-right"
            />
            <Link to={"/contacts/addContact"} className="btn btn-primary mt-2">
              New Contact
              <i className="fas fa-plus-circle mx-2" />
            </Link>
          </div>
          <div className="col">
            {showDelete ? (
              <button
                className="btn btn-outline-danger"
                onClick={removeSelected}
              >
                Delete Selected
              </button>
            ) : (
              ""
            )}
            <button
              className="btn btn-outline-secondary mx-2"
              onClick={() => setShowDelete(!showDelete)}
            >
              {!showDelete ? "Select" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
      <section className="contacts">
        <div className="container">
          <div className="col d-flex flex-wrap justify-content-center">
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
                    photo={contact.photo}
                    setLoading={setLoading}
                    setContacts={setContacts}
                    contacts={contacts}
                    setErrorMessage={setErrorMessage}
                    showDelete={showDelete}
                  />
                ) : (
                  ""
                )
              )
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default ContactsPage;
