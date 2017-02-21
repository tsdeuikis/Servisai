var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( "public/index.html", {root: __dirname} );
})

app.get('/register', function (req, res) {
   res.sendFile( "public/register.html", {root: __dirname} );
})

app.listen(3000, function() {
    console.log('Listening to port:  ' + 3000);
});