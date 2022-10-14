
function addItems() {
	const addItemForm = document.getElementById("todo-form");
	addItemForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		var toDo = document.getElementById("todo-input");
		db.collection("todo-list").add({
			description: toDo.value,
			status: "active"
		})
		toDo.value = "";
	});
}

async function getItems() {
	db.collection("todo-list").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                //This a spread operator
                ...doc.data()
            })
        })
        displayItems(items);
    })
}

function displayItems(items) {
	const todoItems = document.querySelector(".todo-items");
	var myItems = "";
	items.forEach((eachItem) => {
			myItems += 
            `<div class="todo-item">
                <div class="check">
                    <div data-id="${eachItem.id}" class="check-mark ${eachItem.status == "completed" ? "checked":""}">
                        <img src="./assets/todo-imgs/icon-check.svg" alt="">
                    </div>
                </div>
                <div class="todo-text ${eachItem.status == "completed" ? "checked":""}">
                    ${eachItem.description}
                </div>
            </div>`;
			
	});

	const checkItemComplete = document.getElementById("checkItemAsDone");

	checkItemComplete.addEventListener('click', ()=>{
		console.log("Should work")
	})
	todoItems.innerHTML = myItems;

}

function markCompleteItem(id) {
	let item = db.collection("todo-list").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

function completeTaskListner(){
    const checkMarks = document.querySelectorAll(".check-mark");
    checkMarks.forEach( checkMark => {
        checkMark.addEventListener("click", (event) => {
            markCompleteItem(checkMark.dataset.id);
        } )
    } )
}

window.addEventListener("load", () => {
	addItems();
	getItems();

    completeTaskListner();
});
