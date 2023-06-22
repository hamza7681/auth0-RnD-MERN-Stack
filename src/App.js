import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const [err, setErr] = useState(false);

  const callAPI = () => {
    axios
      .get("http://localhost:5000/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };
  const callProtectedAPI = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:5000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setErr(false);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="App">
      <h1>Auth0 Authentication</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login with Popup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Login with Redirect</button>
        </li>
        <li>
          <button onClick={logout}>logout</button>
        </li>
      </ul>
      <h3>User is {isAuthenticated ? "Logged In" : "Not Logged In"}</h3>
      <ul>
        <li>
          <button onClick={callAPI}>Call API</button>
        </li>
        <li>
          <button onClick={callProtectedAPI}>Call Protected API</button>
        </li>
      </ul>
      {err && <p style={{ color: "red" }}>Login is required*</p>}
      {isAuthenticated && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default App;
