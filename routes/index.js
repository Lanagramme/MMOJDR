var express = require('express');
var router = express.Router();
var key =  "keyqeqOpgiyzfCnBF"
var users = "appJWArXjHA0HGf4K"

var bodyParser = require('body-parser')

var Airtable = require('airtable')
var base = new Airtable({apiKey: key}).base(users)

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
  res.render(
    'login', 
    {
      groups : [
       { value:'user',      type:'text' },
       { value: 'password', type: 'password'}  
      ], 
      state:'Enter login and password'
    }
  )
});

/* GET game page. */
router.get('/game', function(req, res, next) {
  res.render('game', { });
});

/* POST connection page. */
router.post('/log', (req, res)=>{
  console.log(req.body.user)  
  base('users-list').select({
    view: "Grid view",
    filterByFormula: `({Name} = '${req.body.user}' )`
  }).eachPage(function page(records, fetchNextPage) { 
   records.forEach(function(record) { 
     if(record.get('pass') == req.body.password)
       res.render('index', { title: 'Express' });
     else {
       res.render(
       'login', 
         {
           groups : [
            { value: 'user',     type:'text' },
            { value: 'password', type: 'password'}
           ],
           state: 'Wrong user name or password'}
       )
     }
   });
    
   fetchNextPage(); 
  }, function done(err) { 
    if (err) { console.error(err); return; } 
  });
})

module.exports = router;
