const firebaseConfig = {

  apiKey: "AIzaSyB6npmjKlByroUKxu9uHuiKrL3AUEXu7dk",

  authDomain: "todo-app-dd67f.firebaseapp.com",

  projectId: "todo-app-dd67f",

  storageBucket: "todo-app-dd67f.appspot.com",

  messagingSenderId: "711305155928",

  appId: "1:711305155928:web:1315950bd71d993365c12d",

  measurementId: "G-PLPZ9K1EPC"

};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();


function displaItems(items) {
	const todoItems = document.querySelector("todoItems");
	items.forEach((eachItem) => {
		let item = "Empty div";
		if (eachItem.status == "completed") {
			item = 
            `<div class="todo-item">
                <div class="check">
                    <div class="check-mark checked">
                        <img src="./assets/icon-check.svg" alt="">
                    </div>
                </div>
                <div class="todo-text checked">`+
                    eachItem.description
                `</div>
            </div>`;
		} else {
			item = item = 
            `<div class="todo-item">
                <div class="check">
                    <div class="check-mark">
                        <img src="./assets/icon-check.svg" alt="">
                    </div>
                </div>
                <div class="todo-text">`+
                    eachItem.description
                `</div>
            </div>`;
		}
		todoItems.appendChild(item)
	});

	todoItems.appendChild();
}