var express 	 	= require('express');
var mongoose   	= require('mongoose');
var morgan     	= require('morgan');
var bodyParser 	= require('body-parser');

var bookingController 	= require('./controllers/booking');

var api = express();

var port = 3000;
mongoose.connect('mongodb://localhost:27017/hostelBookings');
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(morgan('dev'));

var router = express.Router();

router.route('/booking')
	.post(bookingController.createBooking);

api.use('/api', router);
api.listen(port);
console.log('The server is now running and can be accessed at http://localhost:3000/api');