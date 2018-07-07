var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
console.log(`port: ${port}`);

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

app.set('view engine','hbs');
//Middleware


app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.ip} ${req.method} ${req.url} ${req.protocol}`

  console.log(log);
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
    console.log('Unable to write to server.log.');
  }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// });
app.use(express.static(__dirname + '/public'));
//Route handlers


app.get('/',(req, res)=>{
  res.render('home.hbs',{
    siteName: 'My Site',
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my site.'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About',
  })
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle: 'Projects',
  })
});

app.get('/bad',(req,res)=>{
  res.send({
    status: 'Bad Request',
    status_code: 400,
    errorMessage: 'Unable to process bad request(400).'
  })
})
app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`)
});
