const clair = document.querySelector('.fa-refresh');
const date = document.getElementById('date');
const element_list = document.getElementById('list');
const addBtn = document.querySelector('.fa-plus-circle');
const inputTextValue = document.getElementById('input');
const element_warnning = document.getElementById("warning");
const element_date = document.getElementById('date');
const today = new Date();
const dateOptions= {weekday:"long",month:"short",day:"numeric"};
element_date.innerHTML = today.toLocaleDateString('en-US',dateOptions);
const URL = 'http://localhost:8000'

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE = "lineThrough";
const JOB_COMLETE = "complete";
const JOB_DELETE ="delete";

let id = 0;
let todoList= [];
const todo ={
    id:0,
    description:"Walk",
    complete:false
}


function addToDo(e){
    id +=1;
    let todo_obj = Object.assign({},todo)
    let element = inputTextValue
 
    if(inputTextValue.value === ""){
        element_warnning.removeAttribute('hidden')
        inputTextValue.parentNode.style.height ="50px" 
        inputTextValue.style.border = "1px solid red"

    }else{
        element_warnning.setAttribute('hidden','')
        inputTextValue.parentNode.style.height ="40px" 
        inputTextValue.style.border = ""

        todo_obj.id = id;
   
        todo_obj.description = element.value;
        todo_obj.complete = false;
       
        
       
        element.value = ""
        addItemTodo(todo_obj)
        saveTolocal()
    }
  
    
}
async function addItemTodo(_todo){

    const item = `<li class="item">
    <i class="fa fa-circle-thin co" job="complete" id="${_todo.id}" onclick="complete(this)"></i>
    <p class="text">${_todo.description}</p>
    <i class="fa fa-trash-o de" job="delete" id="${_todo.id}" onclick="deleteTodo(this)"></i> 
</li> 
    `
    todoList.push(_todo)
    console.log(JSON.stringify(_todo))
    
    const post =  await fetch(URL,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            
        },
        body:JSON.stringify(_todo),
        
    }).then((response)=>response.json())
    .then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log(error)
    })
   

    element_list.insertAdjacentHTML('beforeend',item)
   
}

addBtn.addEventListener('click',addToDo)
inputTextValue.addEventListener('keypress',function (e){
 if(e.key =='Enter'){
    addToDo(e)
 }
})

function complete(_element){
    let _id = parseInt( _element.getAttribute('id'));

    const element = getTodoById(_id)['todo'];

    if(element){


    if(element['id'] === _id){
       
        if(!element['complete']){
        _element.classList.remove("fa-circle-thin");
        _element.classList.add("fa-check-circle");;
        _element.nextElementSibling.classList.add('lineThrough')
        element['complete'] = true;
        } else {
            _element.classList.add("fa-circle-thin");
        _element.classList.remove("fa-check-circle");
        _element.nextElementSibling.classList.remove('lineThrough')
        element['complete'] = false;
        }

    } 
} else{
    console.log("Item not found")
}
    
}

function getTodoById(_id){
    for (let index = 0; index < todoList.length; index++) {
        const element = todoList[index];
        if(element['id'] === _id){
           
           return {
            todo :element,
            index:index
           }
        } 
        
    }
    
}
// hard way to crea item list
function createIElement(_item){
    const li = document.createElement('li')
    li.classList.add('item');
    const i = document.createElement('i')
    i.classList.add('fa');
    i.classList.add('fa-circle-thin');
    i.classList.add('co');
    i.setAttribute('job','complete')
    i.setAttribute('id',`${_item.id}`)
    i.setAttribute('onclick','complete(this)')
    li.appendChild(i);
    const p = document.createElement('p');
    p.classList.add('text')
    p.innerText = _item.description
    li.appendChild(p)
    const _i = document.createElement('i');
    _i.classList.add('fa')
    _i.classList.add('fa-trash-o')
    _i.classList.add('de')
    _i.setAttribute('job','delete')
    _i.setAttribute('id',`${_item.id}`)
    _i.setAttribute('onclick','complete(this)')
    li.appendChild(_i);
    element_list.appendChild(li)
}


function deleteTodo(_element){
    let _id = parseInt( _element.getAttribute('id'));
    const _todo = getTodoById(_id)
    if(_todo){
        _element.parentNode.parentNode.removeChild(_element.parentNode)

        todoList.splice(_todo['index'],1)
        saveTolocal()
        
    }else {
        console.log("Item not found")
    }


}
function saveTolocal(){
    const local = localStorage.getItem('todo');
    if(local){
        localStorage.removeItem('todo')
        localStorage.setItem('todo',JSON.stringify(todoList))

    }else {
        localStorage.setItem('todo',JSON.stringify(todoList))
    }
}

function loadDataFromLocal(){
    const local = localStorage.getItem('todo');
    if(local){
     
       JSON.parse(local).forEach(element => {
        addItemTodo(element)
       });

    }
}
window.onload =()=>{
    inputTextValue.value =""
   loadDataFromLocal()
}

async function potTodo(_todo){
   
}




