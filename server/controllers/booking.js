var Booking = require('../model/booking');

exports.createBooking = function(req, res) {
	var booking = new Booking({
		contact_name: req.body.contact_name,
		email: req.body.email,
		phone: req.body.phone,
		accom_name: req.body.accom_name,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		message: req.body.message
	});

	booking.save(function(err) {
		if (err)
			res.json({success: false, message: 'There was an error saving the booking', data: err});
		else
			res.json({success: true, message: 'The booking was saved correctly'});
	});
};