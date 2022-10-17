function addItems() {
	const addItemForm = document.getElementById("todo-form");
	addItemForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		var toDo = document.getElementById("todo-input");
		db.collection("todo-list").add({
			description: toDo.value,
			status: "active"
		});
		toDo.value = "";
	});
}

function getItems(option) {
	db.collection("todo-list").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                //This a spread operator
                ...doc.data()
            });
        });

        displayItems(items, option);
    });
}
//option would either be active, completed or all and will diplay tasks based on option
function displayItems(items, option) {
    const todoItems = document.querySelector(".todo-items");
	var myItems = "";
    const itemsLeft = document.querySelector(".items-left");
    var activeItems = 0;
    items.forEach((eachItem) => {
            if(eachItem.status == "active"){
                activeItems+=1;
            }

            if(option == "all"){
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
            } else if(eachItem.status == option){
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
            }
	});

    itemsLeft.innerHTML = activeItems + " items left";
	todoItems.innerHTML = myItems;

    completeTaskListner();

}

function markCompleteItem(id) {
	let item = db.collection("todo-list").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                });
            } else {
                item.update({
                    status: "active"
                });
            }
        }
    });
}

function clearCompletedItems(){

    db.collection("todo-list").onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
            if(doc.data().status == "completed"){
                db.collection("todo-list").doc(doc.id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        });
    });
}

function completeTaskListner(){
    const checkMarks = document.querySelectorAll(".check-mark");
    checkMarks.forEach( checkMark => {
        checkMark.addEventListener("click", (event) => {
            markCompleteItem(checkMark.dataset.id);
        } );
    } );
}

function setUpOptions(){
    const activeItemsBtn = document.getElementById("active-items");
    const allItemsBtn = document.getElementById("all-items");
    const completedItemsBtn = document.getElementById("completed-items");
    const clearCompletedItemsBtn= document.getElementById("clear-completed-items");
    
    activeItemsBtn.addEventListener("click", () => {
        const activeBtn = document.querySelector(".active");
        activeBtn.className = "";
        activeItemsBtn.className = "active";
        getItems("active");
    });

    allItemsBtn.addEventListener("click", () => {
        const activeBtn = document.querySelector(".active");
        activeBtn.className = "";
        allItemsBtn.className = "active";
        getItems("all");
    });

    completedItemsBtn.addEventListener("click", () => {
        const activeBtn = document.querySelector(".active");
        activeBtn.className = "";
        completedItemsBtn.className = "active";
        getItems("completed");
    });

    clearCompletedItemsBtn.addEventListener("click", () => {
        clearCompletedItems();
    });
}


window.addEventListener("load", () => {
	addItems();
	getItems("all");
    setUpOptions();
});