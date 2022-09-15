import axios from "axios";

export class Service {
  serverUrl = `http://localhost:9000/contacts`;

  getContacts() {
    let dataUrl = `${this.serverUrl}`;
    return axios.get(dataUrl);
  }
  createContact(contact) {
    let dataUrl = `${this.serverUrl}`;
    return axios.post(dataUrl, contact);
  }
  getSingleContact(contactId) {
    let dataUrl = `${this.serverUrl}/${contactId}`;
    return axios.get(dataUrl);
  }
  updateContact(contact, contactId) {
    let dataUrl = `${this.serverUrl}/${contactId}`;
    return axios.put(dataUrl, contact);
  }
  deleteContact(contactId) {
    let dataUrl = `${this.serverUrl}/${contactId}`;
    return axios.delete(dataUrl);
  }
}

export const service = new Service();
