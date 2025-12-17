export async function signupHandler(e) {
    e.preventDefault();

    const formInput = e.target;
    const JSON_SERVER = 'http://localhost:3000/users';
    
    // check if the user password repeated matches
    if (formInput.password.value !== formInput.repeatPassword.value) {
        alert("Passwords do not match :(");
        return;
    }

    //create user object with form input
    const user = {
            name: formInput.name.value,
            email: formInput.email.value,
            password: formInput.password.value
        };

    try {
        const response = await fetch(`${JSON_SERVER}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        

        if (!response.ok) {
            throw new Error("Failed to create the user");
        }

        const data = await response.json();
        console.log("Created user:", data);

        formInput.reset();
        window.location.href = "login.html";
    } catch (error) {
        console.error("Signup error:", error);
    }
}





//   export function signupHandler(evt) {
//     evt.preventDefault();
//     const nameEl = $('#signup-name');
//     const emailEl = $('#signup-email');
//     const passEl = $('#signup-password');
//     const name = nameEl && nameEl.value.trim();
//     const email = emailEl && emailEl.value.trim().toLowerCase();
//     const pass = passEl && passEl.value;
//     if (!name || !email || !pass || pass.length < 6) {
//       return alert('Please fill name, email and a password (min 6 chars).');
//     }
//     const users = loadUsers();
//     if (users[email]) return alert('Account already exists for that email.');
//     users[email] = { name: name, password: btoa(pass) };
//     saveUsers(users);
//     setCurrent(email);
//     // redirect to next if provided
//     const params = new URLSearchParams(window.location.search);
//     const next = params.get('next') || localStorage.getItem('returnTo');
//     if (next) {
//       localStorage.removeItem('returnTo');
//       window.location.href = decodeURIComponent(next);
//     } else {
//       window.location.href = 'index.html';
//     }
//   }