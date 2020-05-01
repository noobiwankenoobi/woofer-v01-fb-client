const woofForm = document.querySelector('#woof-form');
const getWoofsBtn = document.querySelector('#get-woofs-btn')
const API_URL = 'https://us-central1-woofer-v01.cloudfunctions.net/api/'

const woofsContainer = document.querySelector('.woofs-container');
const localWoofs = [];
let localCreatedWoof;


// POST WOOF EVENT LISTENER
woofForm.addEventListener('submit', (event) => {
    postWoof(event)
})

// GET ALL WOOFS EVENT LISTENER
getWoofsBtn.addEventListener('click', () => {
    getAllWoofs();
})

////////////////
// POST WOOF //
function postWoof(event) {
    event.preventDefault()
    // FormData is built in. Pass in reference to the form
    const woofFormData = new FormData(woofForm);
    const userHandle = woofFormData.get('name');
    const body = woofFormData.get('content');
    // woof is an object with name a content being inserted
    const woof = { userHandle, body };
    localCreatedWoof = woof;
    // Fetch
    fetch(API_URL + 'woof', {
        method: 'POST',
        body: JSON.stringify(woof),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            localCreatedWoof.id = data.createdWoofId
        })
        .then(() => {
            renderNewestWoof()
        })
        .catch(err => console.error(err))

}

////////////////
// GET Woofs //
function getAllWoofs() {
    localWoofs.splice(0, localWoofs.length)
    fetch(API_URL + 'woofs', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((data) => {
            data.forEach(woof => localWoofs.push(woof))
        })
        .then(() => {
            renderAllWoofs(localWoofs)
            console.log(localWoofs)
        })
}

function clearWoofs() {
    woofsContainer.innerHTML = '';
}

function renderNewestWoof() {
    localWoofs.unshift(localCreatedWoof);
    renderAllWoofs(localWoofs);
    console.log(localCreatedWoof)
    woofForm.reset();
}

/////////////
// RENDER //
function renderAllWoofs(woofsArray) {
    // clear the container first
    clearWoofs();
    // iterate through and create html elements for woof properties
    woofsArray.forEach((woof) => {
        const woofDiv = document.createElement('div');
        const woofUserDiv = document.createElement('div');
        const woofBodyDiv = document.createElement('div');
        const woofUserText = document.createElement('h6');
        const woofBodyText = document.createElement('h5');
        woofUserText.innerText = "🐶 " + woof.userHandle + " says:";
        woofBodyText.innerText = woof.body;
        woofUserDiv.appendChild(woofUserText);
        woofBodyDiv.appendChild(woofBodyText);
        woofDiv.appendChild(woofUserDiv);
        woofDiv.appendChild(woofBodyDiv);
        woofUserDiv.classList.add("woof-user-div");
        woofBodyDiv.classList.add("woof-body-div");
        woofDiv.classList.add("woof-div");
        woofsContainer.appendChild(woofDiv)
    })
}

// // DONT TURN ON DURING DEVELOPMENT
// window.onload = function () {
//     getAllWoofs()
// }

