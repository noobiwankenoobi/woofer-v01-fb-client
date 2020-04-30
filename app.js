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

    // Send POST request to API
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

getWoofsBtn.addEventListener('click', () => {
    getWoofs();
})



function getWoofs() {
    fetch(API_URL + 'woofs', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}
