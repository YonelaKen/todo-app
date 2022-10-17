function setUpLoginBtn() {
	const login = document.getElementById("login-form");
	login.addEventListener("submit", (event) => {
		event.preventDefault();
		//Send data to firebase AND redirect to the correct page
		window.location.href = "todo.html";
	});
}

function setUpRegisterBtn() {
	const register = document.getElementById("register-form");
	register.addEventListener("submit", (event) => {
		event.preventDefault();
		//Send data to firebase AND redirect to the correct page
		window.location.href = "todo.html";
	});
}

function googleBtn() {
	const googleBtn = document.getElementById("google-auth");
	var provider = new firebase.auth.GoogleAuthProvider();
	googleBtn.addEventListener("click", () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				window.location.href = "todo.html"
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				alert(`Error code ${errorCode}\nError message:\n${errorMessage}`)
			});
	});
}

function loginForm() {
	const loginBtn = document.getElementById("login-btn");
	loginBtn.addEventListener("click", () => {
		const displayForm = document.getElementById("display-form");
		displayForm.innerHTML = `<form id="login-form" class="form-data">
                    <input type="text" name="userID" id="userID" placeholder="Enter username" required class="input-field">
                    <input type="password" name="password" id="userPassword" placeholder="Enter Password" required class="input-field">
                    <input type="checkbox" class="check-box"> <span>Remember password</span>
                    <input type="submit" value="Login" class="submit-btn">
                </form>`;
		const btn = document.getElementById("btn");
		btn.style.left = "0px";
		setUpLoginBtn();
	});
}

function registerForm() {
	const regBtn = document.getElementById("reg-btn");
	regBtn.addEventListener("click", () => {
		const displayForm = document.getElementById("display-form");
		displayForm.innerHTML = `<form id="register-form" class="form-data">
        <input type="text" name="userID" id="userID" placeholder="Enter username" required class="input-field">
        <input type="email" name="userEmail" id="userEmail" required class="input-field" placeholder="Enter email">
        <input type="password" name="password" id="userPassword" placeholder="Enter Password" required class="input-field">
        <input type="checkbox" class="check-box"> <span>I agree to the terms & conditions</span>
        <input type="submit" value="Register" class="submit-btn">
    </form>`;
		const btn = document.getElementById("btn");
		btn.style.left = "110px";
		setUpRegisterBtn();
	});
}

window.addEventListener("load", () => {
	setUpLoginBtn();
	loginForm();
	registerForm();
	googleBtn();
});
