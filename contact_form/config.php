<?php
define('_to_name', 'Upkar Sex Hospital');
define('_to_email', 'info@upkarsexhospital.com');

define('_from_name', $_POST["first_name"]); //optional, if not set _to_name will be used
define('_from_email',  $_POST["email"]); //optional, if not set _to_email will be used

define('_smtp_host', 'upkarsexhospital.com');
define('_smtp_username', 'info@upkarsexhospital.com');
define('_smtp_password', 'Test@123');
define('_smtp_port', '465');
define('_smtp_secure', 'ssl'); //ssl or tls

define('_subject_email', 'UpkarSexHospital: Contact from WWW');

define('_msg_invalid_data_first_name', 'Please enter your first name.');
define('_msg_invalid_data_last_name', 'Please enter your last name.');
define('_msg_invalid_data_email', 'Please enter valid e-mail.');
define('_msg_invalid_data_message', 'Please enter your message.');


define('_msg_send_ok', 'Thank you for contacting us.');
define('_msg_send_error', 'Sorry, we can\'t send this message.');
?>
