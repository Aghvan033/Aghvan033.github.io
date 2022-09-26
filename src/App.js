import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import ContactsPage from "./Components/Contacts/ContactsPage";
import ContactForm from "./Components/Contacts/ContactForm";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home"
import UserPage from "./Components/Users/UserPage";
import UserForm from "./Components/Users/UserForm";
function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/home"} />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/contacts/page"} element={<ContactsPage />} />
        <Route path={"/users/page"} element={<UserPage />} />
        <Route
          path={"/contacts/updateContact/:contactId"}
          element={<ContactForm title={"Update Contact"} btnValue={"Update"} />}
        />
        <Route
          path={"/users/updateUser/:userId"}
          element={<UserForm title={"Update User"} btnValue={"Update"} />}
        />
        <Route
          path={"/contacts/addContact"}
          element={<ContactForm title={"Add Contact"} btnValue={"Add"} />}
        />
        <Route
          path={"/users/addUser"}
          element={<UserForm title={"Add User"} btnValue={"Add"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
