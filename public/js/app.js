console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const locationButton = weatherForm.querySelector('#location')
const currentLocationButton = weatherForm.querySelector('#current-location')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



locationButton.addEventListener('click', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast;
            }
        })
    })
})

currentLocationButton.addEventListener('click', (e) => {
    e.preventDefault() // to prevent page from refreshing

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log(`lat is ${latitude}, long is ${longitude}`)

        fetch(`/coord?latitude=${latitude}&longitude=${longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })

    })


})