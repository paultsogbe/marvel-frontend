import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const SignUp = ({ setError, errorMessage, setUser }) => {
  let history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        username,
        email,
        password,
      };
      const response = await axios.post(
        "https://marvel-backend-paul.herokuapp.com/signup",
        data
      );
      console.log("RATE");
      console.log(response);
      const token = response.data.token;
      setUser(token);
      history.push("/");
    } catch (event) {
      setError(event.message);
    }
  };

  const handlePass = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleUserName = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  return (
    <div className="signup">
      {errorMessage && errorMessage}
      <form>
        <input
          name="username"
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleUserName}
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleEmail}
        />
        <div>
          <input
            type="password"
            name="password"
            className="pass"
            // type={view ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={handlePass}
          />
          <i class="fas fa-eye"></i>
        </div>
        <input
          onClick={handleSubmit}
          className="bleu"
          type="submit"
          value="S'inscrire"
        />
      </form>
    </div>
  );
};

export default SignUp;
