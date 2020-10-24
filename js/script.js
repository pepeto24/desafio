'use strict'

let countInterval = 0;

let loading = null;
let form = null;
let inputFind = null;
let btnFind = null;

let usersInfo = [];
let tabUsers = null;

let countUsers = 0; 

let numberFormat = null;


window.addEventListener('load', () => {

    const interval = setInterval(() => {
      countInterval++
  
      if (countInterval === 3) {
        loading = document.querySelector("#loading")
        loading.style.display = 'none'
  
        inputFind.disabled = false
  
        this.clearInterval(interval)
        return
      }
  
}, 1000)

form = document.querySelector("form");
form.addEventListener('submit', () => { event.preventDefault() });

btnFind = document.querySelector("#btnFind");
btnFind.addEventListener('submit', () => {event.preventDefault()});

inputFind = document.querySelector("#inputFind");
input.addEventListener('keyup', onInputOrButton);

countUsers = document.querySelector("#countUsers");

})

async function fetchUsers(){
    const res = await fetch("https://api.randomuser.me/?results=10");
    const json = await res.json();

    usersInfo = json.results.map(user =>{
        const {name, picture, registered, city} = user;

        return{
            name: `${name.first} ${name.last}`,
            picture: picture.thumbnail,
            registered: registered.age,
            city
        }
    })

    
    render();

}

function onInputOrButton() {
    // função para alterar botão conforme value do input
    buttonDisabled(event);
  
    if(event.type === 'click' || event.key === 'Enter') {
      render();
      fetchUsers();
    }
}


function formatNumber(number) {
    return numberFormat.format(number);
}

function render() {
    renderUsers();
    renderSummary();
}

function buttonDisabled(event) {
    const valueInput = event.target.value
  
    if (valueInput !== '') {
      btnFind.disabled = false
    } else {
      btnFind.disabled = true
    }
  }

function renderUsers() {

    const nameInput = inputFind.value;
  
    let usersHTML = '<div>'
  
    const findName = usersInfo.filter(user => user.name.toLowerCase().match(nameInput.toLowerCase()));
  
    usersInfo = [...findName];
  
    usersInfo.sort((a, b) => {
      return a.name.localeCompare(b.name);
})
  
    usersInfo.forEach(user => {
      const { name, picture, registered} = user
  
      const userHTML = `
        <div class="user">
          <div class="picture">
            <img src="${picture}" alt="${name}">
          </div>
          <div class="user-description">
            <p>${name}, ${registered}, ${city}</p>
          </div>
        </div>
      `
    
      usersHTML += userHTML
    })

    usersHTML += '</div>'
    tabUsers.innerHTML = usersHTML
    
}


function renderSummary() {
    countUsers.textContent = usersInfo.length + ' usuário(s) encontrado(s)'
}



