var express = require('express'),
    app     = express();

// app.use(express.static('platforms/ios/www'));
app.use(express.static(__dirname+ '/public'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.TRACK_PORT || 9100);

app.listen(app.get('port'), function(){
    console.log('track server started at port', app.get('port'));
});
