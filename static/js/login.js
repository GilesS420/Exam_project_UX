document.querySelector("#login-form").addEventListener("submit", loginHandler);
async function loginHandler(e) {
  e.preventDefault();
  const JSON_SERVER = 'http://localhost:3000/users';

  const form = e.target;
  const email = form.querySelector("#login-email").value.trim().toLowerCase();
  const password = form.querySelector("#login-password").value;

  if (!email || !password) return alert("Please enter email and password.");
  try {
    // Fetch user by email
    const response = await fetch(`${JSON_SERVER}?email=${encodeURIComponent(email)}`);
    const [user] = await response.json(); // json-server returns an array

    if (!user || user.password !== password) {
      return alert("Invalid email or password.");
    }

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify({ email: user.email, name: user.name }));

    // Redirect
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
