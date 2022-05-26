import logo from "./logo.svg";
import "./App.css";
import AuthForm from "./components/AuthForm/AuthForm";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const tokenInLocalStorage = () => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  };
  useEffect(tokenInLocalStorage, []);

  return (
    <div className="App">
      {token ? <></> : <AuthForm setToken={setToken} />}
    </div>
  );
}

export default App;
