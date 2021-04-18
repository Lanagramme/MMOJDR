var express = require('express');

var router = express.Router();


/* GET home page. */


for(page of ["home"]) {

    router.get(`/${page === "home" ? "" : page}`, function(req, res, next) {

        res.render(`${page === "home" ? '': page}`, { title: 'MMO-JDR' });

    });

}
    
    

/* GET login page. */


router.get('/login', function(req, res, next) { res.render('login'); });



module.exports = router;


