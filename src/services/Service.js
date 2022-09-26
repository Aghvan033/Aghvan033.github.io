import axios from "axios";

export class Service {
  constructor(pathname){
    this.path = pathname
    this.serverUrl = `http://localhost:9000/${this.path}`;
  }
  get() {
    let dataUrl = `${this.serverUrl}`;
    return axios.get(dataUrl);
  }
  create(contact) {
    let dataUrl = `${this.serverUrl}`;
    return axios.post(dataUrl, contact);
  }
  getSingle(contactId) {
    let dataUrl = `${this.serverUrl}/${contactId}`;
    return axios.get(dataUrl);
  }
  update(contact, contactId) {
    let dataUrl = `${this.serverUrl}/${contactId}`;
    return axios.put(dataUrl, contact);
  }
  delete(contactId) {
    let dataUrl = `${this.serverUrl}/${contactId}`;
    return axios.delete(dataUrl);
  }
}

export const contactsService = new Service("contacts");
export const usersService = new Service("users");