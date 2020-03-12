const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');
const viewsDirectory= path.join(__dirname,'../templates/views');
const publicPath= path.join(__dirname, '../public');
const partialsPath= path.join(__dirname, '../templates/partials');

app.set('views', viewsDirectory )
app.set('view engine', 'hbs')
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Eitan'
    })
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Eitan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'help',
        message: 'this is your help',
        name: 'Eitan'
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.adress){
        return res.send({
            error: 'You must provide an adress'
        })
    }
    geocode(req.query.adress, (error,{latitude:lat, longitude:lon, location}={}) => {
        if(error){
           return res.send({
                error: error
            })
        }
        forecast(lat, lon, (error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forcast: forcastData,
                adress: req.query.adress
            })
        })
    })
})



app.get('/*', (req, res) =>{
    res.send('my 404 page')
})

app.listen(3000, () =>{
    console.log('server is up on port 3000')
}) 