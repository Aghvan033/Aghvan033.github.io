import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import ContactsPage from "./Components/ContactsPage";
import ContactForm from "./Components/ContactForm";
import NavBar from "./Components/NavBar";
function App() {
 
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contacts/page"} />} />
        <Route path={"/contacts/page"} element={<ContactsPage />} />
        <Route
          path={"/contacts/updateContact/:contactId"}
          element={<ContactForm title={"Update Contact"} btnValue={"Update"} />}
        />
        <Route
          path={"/contacts/addContact"}
          element={<ContactForm title={"Add Contact"} btnValue={"Add"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
