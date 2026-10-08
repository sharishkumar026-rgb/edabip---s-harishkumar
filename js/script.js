// ========================================
// EDABIP LOGIN - DAY 2
// JavaScript Interactions
// ========================================


// ========================================
// 1. DEMO USER DATA
// ========================================

const userData = {
    email: "demo@edabip.com",
    password: "EDABIP123",
    role: "Administrator"
};


// ========================================
// 2. GET HTML ELEMENTS
// ========================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const rememberMe = document.getElementById("rememberMe");

const loginButton = document.getElementById("loginButton");

const loginMessage = document.getElementById("loginMessage");

const loginTab = document.getElementById("loginTab");

const signupTab = document.getElementById("signupTab");

const signupLink = document.getElementById("signupLink");

const forgotPassword = document.getElementById("forgotPassword");

const googleButton = document.getElementById("googleButton");

const microsoftButton = document.getElementById("microsoftButton");

const supportLink = document.getElementById("supportLink");

const floatingButton = document.querySelector(".floating-button");


// ========================================
// 3. PAGE LOAD
// ========================================

console.log("EDABIP Login page loaded successfully.");


// ========================================
// 4. EMAIL VALIDATION
// ========================================

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// ========================================
// 5. UPDATE LOGIN BUTTON
// ========================================

function updateLoginButton() {

    if (!loginButton) {
        return;
    }

    const email = emailInput.value.trim();

    const password = passwordInput.value.trim();

    if (isValidEmail(email) && password.length >= 6) {

        loginButton.disabled = false;

    } else {

        loginButton.disabled = true;
    }
}


// ========================================
// 6. EMAIL INPUT
// ========================================

if (emailInput) {

    emailInput.addEventListener("input", function () {

        updateLoginButton();

        clearMessage();
    });
}


// ========================================
// 7. PASSWORD INPUT
// ========================================

if (passwordInput) {

    passwordInput.addEventListener("input", function () {

        updateLoginButton();

        clearMessage();
    });
}


// ========================================
// 8. SHOW / HIDE PASSWORD
// ========================================

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

            togglePassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁";

            togglePassword.setAttribute(
                "aria-label",
                "Show password"
            );
        }
    });
}


// ========================================
// 9. LOGIN FORM
// ========================================

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();

        const password = passwordInput.value.trim();


        // Empty email
        if (email === "") {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            emailInput.focus();

            return;
        }


        // Invalid email
        if (!isValidEmail(email)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;
        }


        // Empty password
        if (password === "") {

            showMessage(
                "Please enter your password.",
                "error"
            );

            passwordInput.focus();

            return;
        }


        // Password too short
        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            passwordInput.focus();

            return;
        }


        // Demo login validation
        if (
            email === userData.email &&
            password === userData.password
        ) {

            showMessage(
                `Login successful. Welcome, ${userData.role}.`,
                "success"
            );


            // Remember user
            if (rememberMe && rememberMe.checked) {

                localStorage.setItem(
                    "edabipRememberedEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "edabipRememberedEmail"
                );
            }


            console.log("EDABIP demo login successful.");

        } else {

            showMessage(
                "Invalid email or password. Try the demo account.",
                "error"
            );
        }
    });
}


// ========================================
// 10. REMEMBER ME
// ========================================

const rememberedEmail =
    localStorage.getItem("edabipRememberedEmail");

if (rememberedEmail && emailInput) {

    emailInput.value = rememberedEmail;

    if (rememberMe) {
        rememberMe.checked = true;
    }

    updateLoginButton();
}


// ========================================
// 11. LOGIN TAB
// ========================================

if (loginTab) {

    loginTab.addEventListener("click", function () {

        loginTab.classList.add("active");

        signupTab.classList.remove("active");

        clearMessage();

        console.log("Login tab selected.");
    });
}


// ========================================
// 12. SIGN UP TAB
// ========================================

if (signupTab) {

    signupTab.addEventListener("click", function () {

        signupTab.classList.add("active");

        loginTab.classList.remove("active");

        showMessage(
            "Sign up screen is available in the next version.",
            "info"
        );

        console.log("Sign up tab selected.");
    });
}


// ========================================
// 13. SIGN UP LINK
// ========================================

if (signupLink) {

    signupLink.addEventListener("click", function (event) {

        event.preventDefault();

        showMessage(
            "Sign up screen is available in the next version.",
            "info"
        );

        console.log("Sign up link clicked.");
    });
}


// ========================================
// 14. FORGOT PASSWORD
// ========================================

if (forgotPassword) {

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();


        if (email === "") {

            showMessage(
                "Enter your email address to reset your password.",
                "info"
            );

            emailInput.focus();

            return;
        }


        if (!isValidEmail(email)) {

            showMessage(
                "Please enter a valid email address first.",
                "error"
            );

            emailInput.focus();

            return;
        }


        showMessage(
            `Password reset instructions would be sent to ${email}.`,
            "info"
        );

        console.log("Forgot password requested.");
    });
}


// ========================================
// 15. GOOGLE LOGIN
// ========================================

if (googleButton) {

    googleButton.addEventListener("click", function () {

        showMessage(
            "Google sign-in is a prototype interaction.",
            "info"
        );

        console.log("Google sign-in clicked.");
    });
}


// ========================================
// 16. MICROSOFT LOGIN
// ========================================

if (microsoftButton) {

    microsoftButton.addEventListener("click", function () {

        showMessage(
            "Microsoft sign-in is a prototype interaction.",
            "info"
        );

        console.log("Microsoft sign-in clicked.");
    });
}


// ========================================
// 17. CONTACT SUPPORT
// ========================================

if (supportLink) {

    supportLink.addEventListener("click", function (event) {

        event.preventDefault();

        showMessage(
            "Support contact option selected.",
            "info"
        );

        console.log("Contact support clicked.");
    });
}


// ========================================
// 18. FLOATING SUPPORT BUTTON
// ========================================

if (floatingButton) {

    floatingButton.addEventListener("click", function () {

        showMessage(
            "How can we help you?",
            "info"
        );

        console.log("Floating support button clicked.");
    });
}


// ========================================
// 19. SHOW MESSAGE
// ========================================

function showMessage(message, type) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent = message;


    if (type === "success") {

        loginMessage.style.color = "#16805c";

    } else if (type === "error") {

        loginMessage.style.color = "#c0392b";

    } else {

        loginMessage.style.color = "#666666";
    }
}


// ========================================
// 20. CLEAR MESSAGE
// ========================================

function clearMessage() {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent = "";

    loginMessage.style.color = "#666666";
}


// ========================================
// 21. ESCAPE KEY
// ========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        clearMessage();
    }
});


// ========================================
// 22. INITIAL BUTTON STATE
// ========================================

updateLoginButton();


// ========================================
// END OF DAY 2 JAVASCRIPT
// ========================================

console.log(
    "EDABIP Day 2 JavaScript interactions loaded successfully."
);