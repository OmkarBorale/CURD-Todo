const cl = console.log;
const todoForm = document.getElementById("todoForm");
const todoControl = document.getElementById("todo");
const todoContainer = document.getElementById("todoContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let todoArr = [];

const onEdit = (ele) => {
    let getEditId = ele.closest("li").id;
    localStorage.setItem("editId", getEditId)
    cl(getEditId)
    // cl(todoArr)
    let getObj = todoArr.find(todo => {
        return todo.todoId === getEditId
    })
    cl(getObj)
    todoControl.value = getObj.todoItem;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    
}

const onDelete = (ele) => {
    let getCoinfirmation = confirm(`Are you want to DELETE ?`)
    cl(getCoinfirmation)

    if(getCoinfirmation){
        let getDeleteId = ele.closest("li").id;
        cl(getDeleteId);
        let getDeleteIndex = todoArr.findIndex(todo => {
            return todo.todoId === getDeleteId
        })
        cl(getDeleteIndex)
        todoArr.splice(getDeleteIndex, 1);
        localStorage.setItem("todoArray", JSON.stringify(todoArr))
        document.getElementById(getDeleteId).remove()
    }else{
        return
    }

}

const todoTemplating = (arr) => {
    let result = '<ul class="list-group">';
    arr.forEach(ele => {
        result += `
                       <li class="list-group-item d-flex justify-content-between" id="${ele.todoId}">
                          <span>${ele.todoItem}</span>
                          <span>
                              <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                              <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                          </span>
                       </li>`
    })
    result += '</ul>'
    todoContainer.innerHTML = result;
}

if(localStorage.getItem('todoArray')){
    todoArr = JSON.parse(localStorage.getItem('todoArray'))
}
todoTemplating(todoArr)

const onTodoHandler = (eve) => {
    eve.preventDefault();
    let todoObj = {
        todoItem : todoControl.value,
        todoId : generateUUID()
    }
    todoArr.push(todoObj);
    Swal.fire({
        icon: 'success',
        title: 'New Todo Item is Added',
        timer: 2000
      })
    localStorage.setItem('todoArray', JSON.stringify(todoArr))
    eve.target.reset()
    cl(todoArr)
    todoTemplating(todoArr)
}

const onUpdateHandler = () => {
    let updatedVal = todoControl.value;
    cl(updatedVal)
    let updatedId = localStorage.getItem("editId")
    cl(updatedId)
    
    let getIndex = todoArr.findIndex(todo => {
        return todo.todoId === updatedId
    })
    cl(getIndex);
    todoArr[getIndex].todoItem = updatedVal;
    localStorage.setItem("todoArray", JSON.stringify(todoArr));
    let li = document.getElementById(updatedId);
    cl(li.firstElementChild);
    li.firstElementChild.innerHTML = updatedVal;
    todoForm.reset()
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
}



todoForm.addEventListener("submit", onTodoHandler);
updateBtn.addEventListener("click", onUpdateHandler);



function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}


// const onUpdateHandler = () => {
//     let updatedVal = todoControl.value;
//     cl(updatedVal)
//     let updatedId = localStorage.getItem("editId")
//     cl(updatedId)

//     todoArr.forEach(todo => {
//         if(todo.todoId === updatedId){
//             todo.todoItem = updatedVal
//             todoForm.reset();
//         }
//     })
// }