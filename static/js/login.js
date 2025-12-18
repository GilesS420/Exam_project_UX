export async function loginHandler(e) {
  e.preventDefault();
  const JSON_SERVER = 'http://localhost:3000/users';

  const form = e.target;
  const email = form.querySelector("#login-email").value.trim().toLowerCase();
  const password = form.querySelector("#login-password").value;

    if (!form.checkValidity()) {
        form.reportValidity(); 
        return;
    }

  if (!email || !password) return alert("Please enter email and password.");
  try {
    // get user by their email
    const response = await fetch(`${JSON_SERVER}?email=${encodeURIComponent(email)}`);
    // json-server returns an array
    const [user] = await response.json(); 

    if (!user || user.password !== password) {
      return alert("Invalid email or password.");
    }

    // save user to localStorage
    localStorage.setItem("currentUser", JSON.stringify({ email: user.email, name: user.name }));

    // send back, chatgpt helped here
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || localStorage.getItem("returnTo");
    if (next) {
      localStorage.removeItem("returnTo");
      window.location.href = decodeURIComponent(next);
    } else {
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
}
