const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//  Paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shaugn',

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shaugn',

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: "Help",
        name: "Shaugn",
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({error: "No address provided"})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })

})

app.get('/coord', (req, res) => {
    forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
        console.log(req.query.latitude, req.query.longitude)
        if (error) {
            return res.send({error})
        }
        res.send({forecast: forecastData})
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: "Page not found",
        name: 'Shaugn'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})