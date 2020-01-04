const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)

//app.com
//app.com/help 
//app.com/about

const publicDirectoryPath = path.join(__dirname,'../public')


////Define paths for Express config
const viewsPath = path.join(__dirname,'../templates/views') ///////////If name of vies directpry is changed to templates
app.set('views',viewsPath)
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath) 

//Setup handlebars engine and views location
app.set('view engine','hbs')

//Setup statc directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Yashika Aggarwal'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Yashika Aggarwal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Yashika Aggarwal'
    })
})

// app.get('/help',(req,res) => {
//     res.send({
//         name: 'Yashika Aggarwal',
//         age: 19
//     })
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About page !</h1>')
// })


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    const address = req.query.address
    geocode(address, (error,data) => {
        if(error)
        {
            return res.send({
                error: error
            })

        }

        forecast(data.latitude,data.longitude,(error,forecastData) => {
            if(error)
            {
                return res.send({
                    error: error
                })

            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

// app.get('/products',(req,res) => {
//     if(!req.query.search){
//           return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404 Error',
        name: 'Yashika Aggarwal',
        error: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404 Error',
        name: 'Yashika Aggarwal',
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+".")
})
