let mangerTodo = new theTodo();

let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todo-input");
let todoBtn = document.getElementById("todo-btn");
let errorMessage = document.getElementById("error-message");
let closerTheEdit  = document.getElementById("closerTheEdit");
let divContianToEdit = document.getElementById("divContianToEdit");

render();

todoList.addEventListener("click" , (e)=>{
    let todoId =  Number(e.target.closest("li[data-todo-id]").dataset.todoId);
    let theRemoveItem = e.target.classList.contains("text-danger");
    let theAddItem =  e.target.classList.contains("bi-check-lg");
    let pencil =  e.target.classList.contains("bi-pencil");

    if(theRemoveItem){
       mangerTodo.removeFroMTodo(todoId); 
    }
    else if(theAddItem){
      mangerTodo.checkIsChange(todoId);
        mangerTodo.save(); 
    }
    else if(pencil){
        divContianToEdit.style.display = "flex"
        let div = document.createElement("div");
        div.classList.add("toEdet");

        let IElement = document.createElement("i");
        IElement.classList.add("bi-x-circle");
        IElement.setAttribute("id" , "closerTheEdit")
        IElement.setAttribute("id","closerTheEdit");

        let h1 = document.createElement("h1");
        h1.setAttribute("style" , "color:white;")
        h1.innerHTML = "change your text";
        
        let input = document.createElement("input");
        input.setAttribute("id","inpEdet");

        let btn = document.createElement("button");
        btn.innerHTML = "finished"

        div.appendChild(IElement);
        div.appendChild(h1);
        div.appendChild(input);
        div.appendChild(btn);
        divContianToEdit.appendChild(div);
        
        IElement.onclick = function(){
            divContianToEdit.style.display = "none";
            
        }

       btn.onclick = function(){
        mangerTodo.edit(todoId,input.value)
        divContianToEdit.style.display = "none";
        render();
       } 
    }
    else{
        mangerTodo.changeIsFinch(todoId);
    }

    render();
})




todoBtn.addEventListener("click" , addToTodo);

function addToTodo(){
    try{
        mangerTodo.add(todoInput.value);
        render();
        restInp();
        restErr();
    }
    catch(err){
        error(err.message);
    }
    
}

function render(){
    let manger =  mangerTodo.getTodo();
    let html = '';

    for(let todoItem of manger){
        html += `<li  data-todo-id="${todoItem.id}" class="list-group-item cursor-pointer">
        <i class="bi bi-pencil" id="PencilID"></i>
        <div class="explainWhatCheckDo"> 
        <i class="bi bi-check-lg" id="${todoItem.isCheck ? "isCheck":"check" }"}"></i>
        <span id="SpanExplainWhatCheckDo">on click you save </span> 
        </div>
       
       
       <i class="bi bi-trash-fill text-danger" id="truch"></i>
       <span  class="ms-2 ${todoItem.isFinch ? "text-muted text-decoration-line-through" : "" }">
         ${todoItem.text}
       </span>
     </li>`
    }
    todoList.innerHTML = html;
}


function restInp(){
    todoInput.value = "";
}
function error(Error){  
    errorMessage.innerHTML = `<span>${Error}</span>`;
}
function restErr(){
    errorMessage.innerHTML = "";
}


