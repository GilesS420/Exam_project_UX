export async function signupHandler(e) {
    e.preventDefault();

    const formInput = e.target;
    const JSON_SERVER = 'http://localhost:3000/users';

    // Chatgpt suggested this
    if (!formInput.checkValidity()) {
        formInput.reportValidity(); 
        return;
    }
    
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