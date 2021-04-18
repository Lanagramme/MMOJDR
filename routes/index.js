var express = require('express');

var router = express.Router();


/* GET home page. */


for(page of ["home"]) {

router.get(`/${page === "home" ? "" : page}`, function(req, res, next) {

    res.render(`${page === "home" ? 'index': page}`);

});

router.post(`/${page === "home" ? "" : page}`, function(req, res, next) {


switch (page) {

case 'login':

break;

default:

break;

}

});


}



/* GET login page. */


router.get('/login', function(req, res, next) { res.render('login'); });



module.exports = router;


