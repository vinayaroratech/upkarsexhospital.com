<?php
ob_start();
?>
<html>
	<head>
	</head>
	<body>
		<div><b>First and last name</b>: <?php echo $values["first_name"] . " " . $values["last_name"]; ?></div>
		<div><b>E-mail</b>: <?php echo $values["email"]; ?></div>
		<?php 
		if($_POST["department"]!="")
		{
		?>
		<div><b>Department</b>: <?php echo $values["department"]; ?></div>
		<?php
		}
		if($_POST["date_of_birth"]!="")
		{
		?>
		<div><b>Date of Birth (dd/mm/yyyy)</b>: <?php echo $values["date_of_birth"]; ?></div>
		<?php
		}
		if($_POST["phone_number"]!="")
		{
		?>
		<div><b>Phone Number</b>: <?php echo $values["phone_number"]; ?></div>
		<?php
		}
		?>
		<div><b>Reason of Appointment</b>: <?php echo nl2br($values["message"]); ?></div>
	</body>
</html>
<?php
$content = ob_get_contents();
ob_end_clean();
return($content);
?>	