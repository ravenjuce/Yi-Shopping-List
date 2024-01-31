// *Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// *database URL (1)
const appSettings = {
    databaseURL: "https://playground-19e85-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// *conncet our project with the project contains this database
const app = initializeApp(appSettings)
const database = getDatabase(app)
// *create reference (any location inside the database)
const shoppinglistInDB = ref(database, "shoppingList")
// *which database are you working with, what the reference should be called




const inputEl = document.getElementById("input-field")
const btnEl = document.getElementById("add-btn")
const listEl = document.getElementById("shopping-list")

let listArr = []

btnEl.addEventListener("click", function() {

    // give reference
    push(shoppinglistInDB, inputEl.value)
    // *where we wanna push the data, the value we wanna push
    
    inputEl.value = ""
})

// *fetch the data from database
onValue(shoppinglistInDB, function(snapshot) {
    // 列表中有元素
    if (snapshot.exists()) {
        // get data from database as an array (key, value)
        let itemsArr = Object.entries(snapshot.val())
    
        // empty the list before put updated full list
        listEl.innerHTML = ""
        
        for (let i = 0; i < itemsArr.length; i++) {
            
            // appendItemToShoppingListEl(currentItem)
            // make list content
            const li = document.createElement("li")
            // put data value in
            li.textContent = itemsArr[i][1]
            // append the list element in the ul
            listEl.append(li)

            // delete
            li.addEventListener("click", function() {
                // where you substitute something with the code that will give you the exact location of the item in question
                let exactLocationOfItemInDB = ref(database, `shoppingList/${itemsArr[i][0]}`)
                remove(exactLocationOfItemInDB)
            })

            
        }
    // 没有元素在列表中        
    } else {
        listEl.innerHTML = ""
    }
})