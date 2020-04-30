const woofForm = document.querySelector('#woof-form');
const getWoofsBtn = document.querySelector('#get-woofs-btn')
const API_URL = 'https://us-central1-woofer-v01.cloudfunctions.net/api/'


// Event Listener for Form Submission
woofForm.addEventListener('submit', (event) => {
    // console.log('Form submission working')
    event.preventDefault()
    // FormData is built in. Pass in reference to the form
    const woofFormData = new FormData(woofForm);
    const userHandle = woofFormData.get('name');
    const body = woofFormData.get('content');
    // woof is an object with name a content being inserted
    const woof = { userHandle, body };
    // reset woof form
    woofForm.reset();

    // POST request to API
    fetch(API_URL + 'woof', {
        method: 'POST',
        body: JSON.stringify(woof),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
})


// Get Woofs Button - Temporary
getWoofsBtn.addEventListener('click', () => {
    getWoofs();
})

// GET Woofs
function getWoofs() {
    fetch(API_URL + 'woofs', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => renderAllWoofs(data));
}

function clearWoofs() {
    console.log("clearWoofs running")
}

function renderNewWoof() {
    console.log("renderNewWoof running")
}

function renderAllWoofs(woofsArray) {
    woofsArray.forEach((woof) => {
        const woofsContainer = document.querySelector('.woofs-container');
        const woofDiv = document.createElement('div');
        const woofUserDiv = document.createElement('div');
        const woofBodyDiv = document.createElement('div');
        const woofUserText = document.createElement('h5');
        const woofBodyText = document.createElement('h3');
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


