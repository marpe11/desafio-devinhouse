const todoInput = document.querySelector('.nova-task');
const todoBtn = document.querySelector('.adicionar');
const todoList = document.querySelector('.todo-list');


document.addEventListener('DOMContentLoaded', buscarTodos)
todoBtn.addEventListener('click', adicionarTodo)
todoList.addEventListener('click', deletarTodo)

function adicionarTodo (event){
    event.preventDefault();

    if (todoInput.value == ""){
        alert('Você não pode adicionar uma tarefa em branco!')
    }
    else{
        const divTodo = document.createElement('div');
        divTodo.classList.add('todo');

        const novoTodo = document.createElement('li');
        novoTodo.innerText = todoInput.value;
        novoTodo.classList.add('todo-item');
        divTodo.appendChild(novoTodo);

        salvarLocalStoreTodo(todoInput.value)

        //botao check
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class ="fas fa-check-circle"></i>';
        completedButton.classList.add('completed-btn');
        divTodo.appendChild(completedButton);
        
        //botoes excluir
        const botaoDescarte = document.createElement('button');
        botaoDescarte.innerHTML = '<i class ="fas fa-trash-alt"></i>';
        botaoDescarte.classList.add('trash-btn');
        divTodo.appendChild(botaoDescarte);

        todoList.appendChild(divTodo);

        todoInput.value = ""
     
    }
}
function deletarTodo(e){

  const itemClicado = e.target;

  if (itemClicado.classList[0] === 'trash-btn'){
    const todo =  itemClicado.parentElement;
    removeTodos(todo)
    todo.remove()
  }
  if (itemClicado.classList[0] === 'completed-btn'){
    const todo =  itemClicado.parentElement;
    todo.classList.toggle('completed')
  }
}

function salvarLocalStoreTodo(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))    
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function buscarTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))    
    }
    todos.forEach(function(todo){

        const divTodo = document.createElement('div');
        divTodo.classList.add('todo');

        const novoTodo = document.createElement('li');
        novoTodo.innerText = todo;
        novoTodo.classList.add('todo-item');
        divTodo.appendChild(novoTodo);

     

        //botao check
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class ="fas fa-check-circle"></i>';
        completedButton.classList.add('completed-btn');
        divTodo.appendChild(completedButton);
        
        //botoes excluir
        const botaoDescarte = document.createElement('button');
        botaoDescarte.innerHTML = '<i class ="fas fa-trash-alt"></i>';
        botaoDescarte.classList.add('trash-btn');
        divTodo.appendChild(botaoDescarte);

        todoList.appendChild(divTodo);
        
    });
}

function removeTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))    
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}