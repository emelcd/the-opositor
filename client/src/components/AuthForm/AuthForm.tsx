import { useEffect, useState } from "react";
import "./AuthForm.scss";

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
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>
      <div className="submit-wrapper">
        <button onClick={onSubmit}>Submit</button>
      </div>
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
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>
      <div className="submit-wrapper">
        <button onClick={onSubmit}>Submit</button>
      </div>
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

    const optionsR = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch(total_url, optionsR)
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

  const insertGoogleLibrary = () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };
  useEffect(insertGoogleLibrary, []);

  return (
    <div>
      <div className="auth-wrapper">
        <div className="switch-container">
          <button
            className="auth-form__switch-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
        <div className="auth-form">
          <div className="auth-header">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          </div>
          <hr />
          <div className="auth-body">
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
            <hr
              style={{
                border: "1px solid #ccc",
                width: "100%",
                margin: "0 auto",
                marginTop: "20px",
              }}
            />
            <div className="google-container">
              <div
                id="g_id_onload"
                data-client_id="559293673854-9nc9u8ml9jeie373g1mg62it3q2r0bdv.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="http://localhost:4000/verify-google"
              ></div>

              <div
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
