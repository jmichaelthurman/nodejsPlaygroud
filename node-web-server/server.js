var express = require('express');
var hbs = require('hbs');

var app = express();
var theCurrentYear = new Date().getFullYear();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
//Route handlers


app.get('/',(request, response)=>{
  response.render('home.hbs',{
    siteName: 'My Site',
    pageTitle: 'Home',
    currentYear: theCurrentYear,
    welcomeMessage: 'Welcome to my site.'
  })
});

app.get('/about',(request,response)=>{
  response.render('about.hbs',{
    pageTitle: 'About',
    currentYear: theCurrentYear
  })
});

app.get('/bad',(request,response)=>{
  response.send({
    status: 'Bad Request',
    status_code: 400,
    errorMessage: 'Unable to process bad request(400).'
  })
})
app.listen(3000,()=>{
  console.log('Server is listening on port 3000')
});
