<?

	$mailto = 'kathy@signum.nz' ;

	$subject = "[Website Contact]" ;

	$formurl = "http://www.signum.nz/hostelmanagement/contact.html" ;

	$uself = 1;

	// Don't touch below this line if you don't know what you're doing!!!!

	$headersep = (!isset( $uself ) || ($uself == 0)) ? "\r\n" : "\n" ;

	$name = $_POST['firstName'] . " " . $_POST['lastName'];

	$email = $_POST['contactEmail'] ;
	$Comments = $_POST['message'] ;

	if (!isset($_POST['contactEmail'])) {
		header( "Location: $formurl" . "?result=0" );
		exit ;
	}
	if (empty($name) || empty($email)) {
		header( "Location: $formurl" . "?result=0" );
		exit ;
	}
	if ( ereg( "[\r\n]", $name ) || ereg( "[\r\n]", $email ) ) {
		header( "Location: $formurl" . "?result=0" );
		exit ;
	}

	$messageproper =

		"Name of sender: $name\n" .
		"Email of sender: $email\n" .
	    "------------------------- COMMENTS -------------------------\n\n" .
		$Comments .
		"\n\n------------------------------------------------------------\n" ;

	mail($mailto, $subject, $messageproper, "From: \"$name\" <$email>" . $headersep . "Reply-To: \"$name\" <$email>" . $headersep . "X-Mailer: chfeedback.php 2.07" );

	header( "Location: $formurl" . "?result=1" );
	exit ;
?>