import React from "react";
import { Link } from "react-router-dom";
import { service } from "../services/Service";

function ContactCard({
  contact,
  name,
  mobile,
  email,
  photo,
  setLoading,
  setContacts,
  setErrorMessage,
  onCompleteChange,
  showDelete,
}) {
  const removeContact = async (contactId) => {
    const confirmation = window.confirm("Are you sure");
    if (confirmation === true) {
      try {
        let res = await service.deleteContact(contactId);
        if (res) {
          setLoading(true);
          let res = await service.getContacts();
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
  const checkIsSelected = async (e) => {
    try {
      onCompleteChange(e.target.checked);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  return (
    <React.Fragment>
      <div className="container flex-column col-md-4 border my-2 mx-4">
        <div className="col text-center">
          <img className="contact-photo" src={photo} alt="contact" />
        </div>
        <div className="col text-center">
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              Name : <span className="fw-bold">{name}</span>
            </li>
            <li className="list-group-item list-group-item-action">
              Mobile : <span className="fw-bold">{mobile}</span>
            </li>
            <li className="list-group-item list-group-item-action">
              Email : <span className="fw-bold">{email}</span>
            </li>
          </ul>
        </div>
        <div className="container d-flex justify-content-between align-items-center my-2">
          <Link
            to={`/contacts/updateContact/${contact.id}`}
            className="btn btn-primary"
          >
            <i className="fas fa-pen" />
          </Link>
          {showDelete ? (
            <input
              onChange={checkIsSelected}
              type={"checkbox"}
              checked={contact.isCompleted || false}
              className="form-check-input px-2 py-2"
            />
          ) : (
            ""
          )}
          <button
            className="btn btn-danger"
            onClick={() => removeContact(contact.id)}
          >
            <i className="fas fa-trash " />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ContactCard;
