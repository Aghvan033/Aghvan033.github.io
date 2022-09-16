import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { service } from "../services/Service";
function ContactForm({ title, btnValue }) {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contact, setContact] = useState({
    name: "",
    mobile: "",
    email: "",
    photo: "",
  });
  function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  }
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (
          window.location.pathname === `/contacts/updateContact/${contactId}`
        ) {
          let res = await service.getSingleContact(contactId);
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
      let response;
      isImgUrl(contact.photo).then((isImg) => {
        if (isImg) {
          response =
            window.location.pathname === "/contacts/addContact"
              ? service.createContact(contact)
              : service.updateContact(contact, contactId);
          setLoading(false);
          if (response) navigate("/contacts/page", { replace: true });
        } else setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
      alert(errorMessage);
      navigate("/contacts/page", { replace: true });
    }
  };
  return (
    <React.Fragment>
      <div className="container text-center my-4">
        <h2>{title}</h2>
      </div>
      {!loading ? (
        <div className="container col-md-6 bg-dark py-4 px-5">
          <form className="form-group" onSubmit={submitForm}>
            <div className="row">
              <div className="col">
                <input
                  required={true}
                  name="name"
                  value={contact.name}
                  onChange={newValues}
                  className="form-control my-4"
                  type={"text"}
                  placeholder="Contact name"
                />
                <input
                  required={true}
                  name="mobile"
                  value={contact.mobile}
                  onChange={newValues}
                  className="form-control my-4"
                  type={"tel"}
                  placeholder="Contact mobile"
                />
                <input
                  required={true}
                  name="email"
                  value={contact.email}
                  onChange={newValues}
                  className="form-control my-4"
                  type={"email"}
                  placeholder="Contact email"
                />
              </div>
              <div className="col">
                <input
                  required={true}
                  name="photo"
                  value={contact.photo}
                  onChange={newValues}
                  className="form-control my-4"
                  type={"text"}
                  placeholder="Contact photo Url"
                />
                <img
                  src={contact.photo}
                  className="contact-photo"
                  alt="contact"
                />
              </div>
              <div className="row">
                <input
                  className="form-control col btn btn-outline-light my-4 mx-1"
                  type={"submit"}
                  value={btnValue}
                />
                <Link
                  to={"/contacts/page"}
                  className="col form-control btn btn-light my-4"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default ContactForm;
