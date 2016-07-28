var express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname, '/client')))


/**
 * To Allow Cross-Origin-Access.
 **/
app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");//http://localhost:8100
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.get('/player', function (req, res) {
    
    console.log(path.join(__dirname, '/client/player/player.html'))
    res.sendFile(path.join(__dirname, '/client/player/player.html'));
})



/**
 * Get port from environment and store in Express.
 */
var port = '4000';
app.set('port', port);
app.listen(port, function (err) {
    if (err)    console.log("ERROR When listening on Port: ", port, ' ERROR: ', err);
    else    console.log('Listening on Port: ', port);
});
