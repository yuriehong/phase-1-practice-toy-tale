//initalize variables
let addToy = false;
const collection = document.getElementById("toy-collection");
const form = document.querySelector(".add-toy-form");
form.addEventListener("submit", handleForm);
let toys = {};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});

//fetch calls
fetch('http://localhost:3000/toys').then(res => res.json()).then(toys => {
    toys.forEach(renderCard);
  });
//functions
function handleForm(e){
  e.preventDefault();
  //Builds toy card
  const toyCard = {
      'name': e.target.name.value,
      'image': e.target.image.value,
      'likes': 0,
  }
  console.log(toyCard);
  createResources('http://localhost:3000/toys', toyCard)
  .then(renderCard(toyCard))
  .catch(e => console.error(e))
}

function createResources(url, body){
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
}

function renderCard(toyData){
  newToy = document.createElement("div");
  newToy.className = "card";
  let name = document.createElement("h2");
  name.textContent = toyData.name;
  let image = document.createElement("img");
  console.log(toyData);
  image.src = toyData.image;
  image.className= "toy-avatar";
  let likes = document.createElement("p");
  likes.textContent = toyData.likes + " likes"
  let bttn = document.createElement("button");
  bttn.class = "like-btn";
  //bttn.id = toyData.id;

  //like button function
  bttn.textContent = "Like ❤️";
  bttn.addEventListener("click", (e) => {
    //console.log(toyData.id);
    toyData.likes += 1;
    //console.log(toyData.likes)
    fetch(`http://localhost:3000/toys/${toyData.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "likes": toyData.likes,
      }),
    })
    .then(res => res.json())
    .then(data => {
      likes.textContent = data.likes + " likes";
    })
    .catch(e => console.error(e))

  })

  newToy.append(name,image,likes,bttn);
  
  collection.append(newToy);
  
}

