const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7f1a68b042cbd81b87627dfd1287f7ce/'+latitude+','+longitude+'?units=si'
    request({url: url, json: true}, (error,response) => {
        if(error){
            callback('Unable to connect to weather services !',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location. Try another search !',undefined)
        }
        else{
            //callback(undefined,'<b>'+response.body.daily.data[0].summary+'</b><br>It is currently <b><u>'+response.body.currently.temperature+'</u></b> degrees. There is a <b>'+response.body.currently.precipProbability+'%<b> chance of rain.')
            callback(undefined,'<b><span id = "data">'+response.body.currently.temperature+'&#8451; ,'+response.body.currently.precipProbability+'%</b></span> &nbsp;chances of Rain<br><br>'+response.body.daily.data[0].summary+'<br>')
        }
    })
}

module.exports = forecast