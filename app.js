const

express = require('express'),

path = require('path'),

cookieParser = require('cookie-parser'),

logger = require('morgan'),


indexRouter = require('./routes/index'),

usersRouter = require('./routes/users'),

sess = { 

genid: function(req) {

return genuuid() // use UUIDs for session IDs

},

secret: 'keyboard cat',

cookie: { maxAge: (60*10) }

},

app = express();

//app.use(session(sess));


if (app.get('env') === 'production') {


app.set('trust proxy', 1)

// trust first proxy

sess.cookie.secure = true

// serve secure cookies

}

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', indexRouter);

app.use('/users', usersRouter);


module.exports = app;