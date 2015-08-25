var mongoose   = require('mongoose');
var validate   = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 100],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters long'
  }),
  validate({
  	validator: 'isAlpha',
  	message: 'The name can only have letters'
  })
];

var alphaNumValidator = [
	validate({
		validator: 'isAlphaNumericSpaces',
		message: 'The accomodation name can only have letters and digits'
	})
];

var dateValidator = [
	validate({
		validator: 'isAfter',
		argumets: Date.now(),
		message: 'The date must be after today'
	})
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'A valid email is requested'
  })
];

var phoneValidator = [
	validate({
		validator: 'isNumeric',
		message: 'The phone number should only contain digits'
	}),
	validate({ // Confirm this validation
		validator: 'isLength',
		arguments: [11]
	})
];

var BookingSchema = new mongoose.Schema({
	contact_name: {
		type: String,
		required: true,
		validate: nameValidator
	},
	email: {
		type: String,
		validate: emailValidator
	},
	phone: {
		type: String,
		validate: phoneValidator
	},
	accom_name: {
		type: String,
		required: true,
		validate: alphaNumValidator
	},
	start_date: {
		type: Date,
		unique: true,
		required: true,
		validate: dateValidator
	},
	end_date: {
		type: Date
	},
	message: {
		type: String,
		validate: alphaNumValidator
	},
	created_date: {
		type: Date,
		default: Date.now(),
		required: true
	}
});

BookingSchema.pre('save', function(callback) {
  var booking = this;

  if (booking.end_date >= booking.start_date)
  	callback();
  else {
  	var err = new Error('The end date must be after the start date');
  	callback(err);
  }
});

module.exports = mongoose.model('Booking', BookingSchema);