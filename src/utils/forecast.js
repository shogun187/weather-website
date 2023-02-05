const request = require('request')
function forecast(latitude, longitude, callback) {

    const url = `http://api.weatherstack.com/current?access_key=69670609816d66c670dd088846e39ef1&query=`+
    `${latitude},${longitude}`

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback("Unable to connect to network", undefined)
        } else if (body.error) {
            callback("Invalid coordinates",undefined)
        } else {

            const temperature = body.current.temperature
            const apparent_temp = body.current.feelslike
            const precip = body.current.precip

            callback(undefined, `It is currently ${temperature} degrees out. It feels like ${apparent_temp} ` +
            `degrees out.There is a ${precip}% chance of rain.`)
        }
    })
}

module.exports = forecast