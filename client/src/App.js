import React, { useState } from "react";
import "./App.css";
import { UserContext } from "./UserContext";
import Form from "./components/Form/Form";
import Products from "./components/Products/Returnable";
import NotReturnableProds from "./components/Products/NotReturnableProds";
import ReturnDate from "./components/ReturnDate/ReturnDate";

// Use this function to get Current Date
function getCurrentDate() {
  return "2020-06-20T12:27:40 +04:00";
}

function App() {
  const [value, setValue] = useState(false);
  const [showReturn, setShowReturn] = useState(true);

  return (
    <UserContext.Provider
      value={{ value, setValue, showReturn, setShowReturn }}
    >
      <div className="App">
        <Form getDate={getCurrentDate} />
        <ReturnDate />
        <Products />
        <NotReturnableProds />
      </div>
    </UserContext.Provider>
  );
}

export default App;
