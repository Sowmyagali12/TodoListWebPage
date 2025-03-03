


const listContainer=document.getElementById("list-container");

// Retrive the todoList from Local Storage
function getTodoListFromLocalStorage(){
    const stringifiedTodoList= localStorage.getItem("todoList");
    const parsedTodoList= JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null){
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList= getTodoListFromLocalStorage();
let todosCount=todoList.length;


// Save the TodoList to the Local Storage
function saveBtn(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


// Adding a newTodo
function onAddTodo(){
    const inputBox=document.getElementById("input-box");
    const userInputValue= inputBox.value.trim();

    if(userInputValue ===''){
        alert("You must write something!!");
        return;
    }

    todosCount+=1;

    let newTodo={
        text: userInputValue,
        uniqueNo: todosCount,
        completed: false 
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    inputBox.value='';
    clearsuggestions();

}


// Adding todo to the todoList
function addTask(){
    onAddTodo();
};


// Deleteing todo 
function onDeleteTodo(todoId){

    const li=document.getElementById(todoId);
    listContainer.removeChild(li);

    const deleteTodoIndex= todoList.findIndex(function(eachTodo){
        const eachTodoId="todo"+eachTodo.uniqueNo;
        if (eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });

    todoList.splice(deleteTodoIndex, 1);

    
}



// Create and Append Todo
function createAndAppendTodo(todo){
   

    let todoId="todo"+todo.uniqueNo;
    let checkBoxId="checkbox"+todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;

    const li =document.createElement("li");    
    li.id=todoId; 
       
     
    if (todo.completed) {
        li.classList.add("completed");
    }

    let checkBox=document.createElement("input");
    checkBox.type="checkbox";
    checkBox.id=checkBoxId;  
    checkBox.checked= todo.completed;
    li.appendChild(checkBox);


    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkBoxId);
    labelElement.id=labelId;
    labelElement.textContent=todo.text;    
    li.appendChild(labelElement);


    let deleteIcon=document.createElement("span");  
    deleteIcon.innerHTML= '&times;';
    deleteIcon.className='delete-icon'; // Adding a class for styling
     
    deleteIcon.onclick=function() {
        onDeleteTodo(todoId);
    };    


    li.appendChild(deleteIcon);

    listContainer.appendChild(li);

    
}

// Add an event listener to toggle status of todo items
listContainer.addEventListener("click", function(e){        

    if(e.target.tagName ==="INPUT" && e.target.type === "checkbox"){
        const li= e.target.closest("li");

        if (li){
            const todoId= li.id;
            const todo= todoList.find(function(eachTodo){
                return "todo"+eachTodo.uniqueNo === todoId;
            });

            if (todo){
                todo.completed=e.target.checked;
                li.classList.toggle("completed", e.target.checked); 
                saveBtn();  
            }
                     
        }
                        
    }             

},false);

// Create and append todo
for (let todo of todoList){
    createAndAppendTodo(todo);
}

