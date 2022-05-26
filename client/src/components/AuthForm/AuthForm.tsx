import { useState } from "react";

interface AuthProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onSubmit: () => void;
}

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
}: AuthProps) => {
  return (
    <>
      <div className="auth-form__input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
        />
      </div>
      <div className="auth-form__input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};

const SignupForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
}: AuthProps) => {
  return (
    <>
      <div className="auth-form__input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
        />
      </div>
      <div className="auth-form__input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};

interface AuthFormProps {
  setToken: (token: string) => void;
}
const AuthForm = ({ setToken }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    const base_url = "http://localhost:4000/user";
    const url = isLogin ? "/login" : "/register";
    const total_url = base_url + url;

    fetch(total_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { token } = data;
        if (!token) throw new Error("No token");
        // set a http only cookie with the token
        localStorage.setItem("token", token);
        setToken(token);
        // document.cookie = `token=${token}`;
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <div className="auth-form">
        <div className="auth-form__header">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        </div>
        <div className="auth-form__body">
          {isLogin ? (
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={onSubmit}
            />
          ) : (
            <SignupForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={onSubmit}
            />
          )}
        </div>
        <button
          className="auth-form__switch-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </div>
    </>
  );
};

export default AuthForm;
