import "../global.css";
import "./style.css";
import { handleLogin } from "./Api/Login/handleLogin";

const Login = document.querySelector("#login");

if (Login) {
	Login.innerHTML = `
    <h1>Welcome, Log into you account</h1>
    <div class="login-container">
      <p>It is our great pleasure to have you on board!</p>
      <form id="loginForm">
        <input type="text" id="email" placeholder="Enter Email" required />
        <input type="password" id="password" placeholder="Enter Password" required />
        <button type="submit">Login</button>
      </form>
      <div id="error"></div>
    </div>
  `;

	handleLogin();
}
