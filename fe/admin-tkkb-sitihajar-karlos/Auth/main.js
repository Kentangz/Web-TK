import "../global.css";
import { handleLogin } from "./Api/Login/handleLogin";

const Login = document.querySelector("#login");

if (Login) {
	Login.innerHTML = `
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div id="error" style="color:red;"></div>
  `;

	handleLogin();
}
