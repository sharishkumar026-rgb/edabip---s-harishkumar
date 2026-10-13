
// ========================================
// EDABIP LOGIN - SUCCESS MESSAGE
// ========================================

const demoUser = {
    email: "demo@edabip.com",
    password: "EDABIP123"
};

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const formMessage = document.getElementById("formMessage");

// Show login status on the page
function showMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";
    formMessage.setAttribute("role", "status");
}

// Login form submission
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Reset old message
        if (formMessage) {
            formMessage.textContent = "";
            formMessage.className = "form-message";
            formMessage.style.display = "none";
        }

        // Validate empty fields
        if (!email || !password) {
            showMessage(
                "Please enter your email and password.",
                "error"
            );
            return;
        }

        // Loading state
        loginButton.disabled = true;
        loginButton.textContent = "Signing in...";

        window.setTimeout(function () {
            if (
                email.toLowerCase() === demoUser.email &&
                password === demoUser.password
            ) {
                // SUCCESS MESSAGE VISIBLE ON LOGIN PAGE
                showMessage(
                    "✓ Login Successful! Welcome to EDABIP.",
                    "success"
                );

                loginButton.textContent = "✓ Login Successful";
                loginButton.disabled = false;

                // Notify other frontend code if needed
                document.dispatchEvent(
                    new CustomEvent("edabip:login-success", {
                        detail: { email: email }
                    })
                );
            } else {
                showMessage(
                    "Invalid email or password. Please try again.",
                    "error"
                );

                loginButton.textContent = "Sign In";
                loginButton.disabled = false;
                passwordInput.focus();
            }
        }, 400);
    });
}

// Show / hide password
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";
        togglePassword.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );
        togglePassword.setAttribute(
            "title",
            isPassword ? "Hide password" : "Show password"
        );
    });
}

