const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// })

app.get('/', (req, res) => {
    //res.send('Hello Express!');
    // res.send({
    //     name: 'Badri',
    //     Age: 24
    // })
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Hello World'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle'
    });
});

app.listen(port, () => {
    console.log(`Sever is up on port ${port}`);
})