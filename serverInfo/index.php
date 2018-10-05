<?php 


	// ini_set("mbstring.internal_encoding","UTF-8");
	// ini_set("mbstring.func_overload",7);

	require_once ("swiftmailer/vendor/autoload.php");
  	ini_set('max_execution_time', 300);



	$con=mysqli_connect('localhost','traxprintasia_digital','5QtpxC#mvhVL','traxprintasia_dmc_au');


	// $con=mysqli_connect("localhost","root","",'digital-mining-corp-au');
		
		
	if ($con->connect_error) {
		die("Connection failed: " . $con->connect_error);
	}
	

	if (isset($_SERVER['HTTP_ORIGIN'])) {
		header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Max-Age: 86400');    // cache for 1 day
	}

	// Access-Control headers are received during OPTIONS requests
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
			header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
			header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

		exit(0);
	}

	// echo "asjdfalsjkdfhl";
	// exit;


	// $currentTimestamp = new DateTime();
	// $currentTimestamp = $currentTimestamp->format('U');
	// echo $currentTimestamp; exit;
	

	$postdata = file_get_contents("php://input");

	// print_r("Here");
	// print_r($postdata);exit;

	if(isset($postdata)){
		// print_r($postdata);exit;
		$request = json_decode($postdata);

		$apistate = $request->apiState;
		if($apistate == "signup"){
			$firstName = $request->firstName;
			$lastName = $request->lastName;
			$email = $request->email;
			$DOB = $request->DOB;
			$address = $request->address;
			$city = $request->city;
			$state = $request->state;
			$country = $request->country;
			$postalCode = $request->postalCode;
			$uniqueField = $request->uniqueField;
			$password = $request->password;
			$pincode = $request->pincode;

			$changedPassword = md5($password);

			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);

			$existUser = 2;

			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'empty database']);
				exit;
			} else {
				while($row=mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$existUser = 1;
					}
				}

				if($existUser == 2){
					$insertUser = "INSERT INTO `userinfo` (`user_fname`, `user_lname`, `user_email`, `user_dob`, `user_address`, `user_city`, `user_state`, `user_country`, `user_postcode`, `user_unique`, `user_password`, `user_pincode`) VALUES ('$firstName', '$lastName', '$email', '$DOB', '$address', '$city', '$state', '$country', '$postalCode', '$uniqueField', '$changedPassword', '$pincode')";

					if(mysqli_query($con, $insertUser)){
						echo json_encode(['status'=>'success', 'email'=>$email]);
						exit;
					}
					else{
						echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
						exit;
					}
				} else {
					echo json_encode(['status'=>'fail', 'detail'=>'Already exist user']);
					exit;
				}
			}	
		} 
		else if($apistate == "initialLogin"){
			$email = $request->email;
			$password = $request->password;
			
// 			$user_lastLogin = "asdfasdfasdfas";

			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email && $row['user_password'] == md5($password)){
						echo json_encode(['status'=>'success', 'email'=>$email]);
						exit;
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'Invalid email or password']);
				exit;
			}
		}
		else if($apistate == "pinlogin"){
			$email = $request->email;
			$pincode = $request->pinCode;
			
			$user_lastLogin = $request->lastLoginTime;
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_pincode'] == $pincode && $row['user_email'] == $email){
					    
					    $update="UPDATE userinfo SET `user_lastLogin` = '$user_lastLogin' WHERE user_email = '$email'";
				    	if(mysqli_query($con, $update)){
    						echo json_encode(['status'=>'success', 'email'=>$email, 'username'=>$row['user_fname'].' '.$row['user_lname'], 'lastLoginTime'=>$user_lastLogin, 'userVerified'=> $row['user_verified']]);
    						exit;
				    	} else {
    						echo json_encode(['status'=>'fail', 'detail'=>'Can not update database.']);
    						exit;
    					}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'Invalide PIN code']);
			}
		}
		else if($apistate == "fingerlogin"){
			$email = $request->email;
			$user_lastLogin = $request->lastLoginTime;
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
					    
					    $update="UPDATE userinfo SET `user_lastLogin` = '$user_lastLogin' WHERE user_email = '$email'";
				    	if(mysqli_query($con,$update)){
    						echo json_encode(['status'=>'success', 'email'=>$email, 'username'=>$row['user_fname'].' '.$row['user_lname'], 'lastLoginTime'=>$user_lastLogin, 'userVerified'=> $row['user_verified']]);
    						exit;
				    	} else {
    						echo json_encode(['status'=>'fail', 'detail'=>'Can not update database.']);
    						exit;
    					}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'Invalide information']);
				exit;
			}
		}
		else if($apistate == "forgotPass"){
			$email = $request->email;
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);

			$existUser = 2;

			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				$confirm_code = rand(100000,999999);
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$existUser = 1;
					}
				}
				if($existUser == 1)
				{
					$update="UPDATE userinfo SET `user_forget` = '$confirm_code' WHERE user_email = '$email'";
					if(mysqli_query($con,$update)){
	
						$transport = (new Swift_SmtpTransport('mail.traxprint.asia', 465))
						->setUsername('dmcaserver@traxprint.asia')
						->setPassword('Cn+tQKG&4M1-')
						->setEncryption('ssl')
						;
	
						$mailer = new Swift_Mailer($transport);
	
						$message = (new Swift_Message('Digital Mining Corp Australia'))
						->setFrom(['dmcaserver@traxprint.asia' => 'Digital Mining Corp Australia'])
						->setTo([$email, 'other@domain.org' => 'Confirm Code for forgor password'])
						->setBody('The Message detail is :  <br /><br />'.$confirm_code, 'text/html');
	
	
						$result = $mailer->send($message);
	
						echo json_encode(['status'=>'success']);
						exit;
					} else {
						echo json_encode(['status'=>'fail', 'detail'=>'Can not update database.']);
						exit;
					}
				}
				else {
					echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
					exit;
				}
			}
		}
		else if($apistate == "sendConfirm"){
			$email = $request->email;
			$confirmCode = $request->confirm;
			$password = $request->password;
			
			$changedpassword = md5($password);
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email && $row['user_forget'] == $confirmCode){
					    
    					$update="UPDATE userinfo SET `user_password` = '$changedpassword' WHERE user_email = '$email'";
    					if(mysqli_query($con,$update)){
    						echo json_encode(['status'=>'success', 'email'=>$email]);
    						exit;
    					}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'Invalide PIN code']);
				exit;
			}
		}
		else if($apistate == "verifyID"){
			$email = $request->email;
			$sel = "SELECT * FROM real_estate";
			$query = mysqli_query($con, $sel);

			$returnArray = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					$oneArray['idName']= $row['re_name'];
					$oneArray['idAddress']= $row['re_address'];
					$oneArray['idPhone']= $row['re_phone'];

					array_push($returnArray, $oneArray);
				}
				echo json_encode(['status'=>'success', 'email'=>$email, 'realEstateList'=>$returnArray]);
				exit;
			}
		}
		else if($apistate == "liveFeed"){
			$email = $request->email;
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);

			$currentTimestamp = new DateTime();
			$currentTimestamp = $currentTimestamp->format('U');

			$returnArray = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$userId = $row['user_id'];
						$selLiveFeed = "SELECT * FROM customer_investment";
						$queryLiveFeed = mysqli_query($con,  $selLiveFeed);
						if(!$queryLiveFeed){
							echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
							exit;
						} else {
							while($rowLiveFeed = mysqli_fetch_array($queryLiveFeed)){
								if($rowLiveFeed['customer_id'] == $userId){
									echo json_encode(['status'=>'success', 'email'=>$email, 'liveFeed'=>$rowLiveFeed, 'currentTimestamp'=> $currentTimestamp]);
									exit;
								}
							}
							echo json_encode(['status'=>'fail', 'detail'=>'There is no live feed data']);
							exit;
						}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}
		else if($apistate == "realEstateApi"){
			$email = $request->email;
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);

			$returnArray = [];
			$returnPending = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$userId = $row['user_id'];
						$selLiveFeed = "SELECT * FROM property_information";
						$queryLiveFeed = mysqli_query($con,  $selLiveFeed);
						if(!$queryLiveFeed){
							echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
							exit;
						} else {
							
							while($rowLiveFeed = mysqli_fetch_array($queryLiveFeed)){
								if($rowLiveFeed['customer_id'] == $userId){
									array_push($returnArray, $rowLiveFeed);
								}
							}

							$propertyId = $rowLiveFeed['id'];
							$selPending = "SELECT * FROM pending_transactions";
							$queryPending = mysqli_query($con,  $selPending);

							while($rowPending = mysqli_fetch_array($queryPending)){
								if($rowPending['customer_id'] == $userId){
									array_push($returnPending, $rowPending);
								}
							}					
							echo json_encode(['status'=>'success', 'email'=>$email, 'realEstate'=>$returnArray, 'pendingList'=>$returnPending]);
							exit;
						}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}
		else if($apistate == "gerUserDetail"){
			$email = $request->email;
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
					    $userVerified = true;
					    if($row['user_verified'] == 0){
					        $userVerified = false;
					    } else {
					        $userVerified = true;
					    }
						echo json_encode(['status'=>'success', 'email'=>$email, 'lastLoginName'=>$row['user_fname'].' '.$row['user_lname'], 'lastLoginTime'=>$row['user_lastLogin'], 'userVerified'=> $userVerified]);
						exit;
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}
		else if($apistate == "getTransactionList"){
			$email = $request->email;
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			$transactionList = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$selTransaction = "SELECT * FROM transaction_details";
						$queryTransaction = mysqli_query($con, $selTransaction);						
						if(!$queryTransaction){
							echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
							exit;
						} else {
							while($rowTransaction = mysqli_fetch_array($queryTransaction)){
								if($rowTransaction['customer_id'] == $row['user_id']){
									array_push($transactionList, $rowTransaction);
								}
							}
							if(sizeof($transactionList) > 0){
								echo json_encode(['status'=>'success', 'email'=>$email, 'transactionList'=>$transactionList]);
								exit;
							}else{
								echo json_encode(['status'=>'fail', 'detail'=>'There is no any data for you']);
								exit;
							}
						}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}
		else if($apistate == "sendPDFFile"){
			$email = $request->email;
			$pdfURL = $request->pdfURL;
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);

			$transport = (new Swift_SmtpTransport('mail.traxprint.asia', 465))
			->setUsername('dmcaserver@traxprint.asia')
			->setPassword('Cn+tQKG&4M1-')
			->setEncryption('ssl')
			;

			$mailer = new Swift_Mailer($transport);

			$message = (new Swift_Message('Digital Mining Corp Australia'))
			->setFrom(['dmcaserver@traxprint.asia' => 'Digital Mining Corp Australia'])
			->setTo([$email, 'other@domain.org' => 'Link for pdf file'])
			->setBody('The Message detail is :  <br /><br />'.$pdfURL, 'text/html');


			$result = $mailer->send($message);

			echo json_encode(['status'=>'success', 'detail'=>'You will get one message via your email','email'=>$email, 'result'=>$result]);
			exit;
		}
		else if($apistate == "getPendingList"){
			$email = $request->email;
			$propertyID = $request->propertyID;
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			$pendingList = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$selPending = "SELECT * FROM pending_transactions";
						$queryPending = mysqli_query($con, $selPending);						
						if(!$queryPending){
							echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
							exit;
						} else {
							while($rowPending = mysqli_fetch_array($queryPending)){
								if($rowPending['customer_id'] == $row['user_id'] && $rowPending['property_id'] == $propertyID){
									array_push($pendingList, $rowPending);
								}
							}
							if(sizeof($pendingList) > 0){
								echo json_encode(['status'=>'success', 'email'=>$email, 'pendingList'=>$pendingList]);
								exit;
							}else{
								echo json_encode(['status'=>'fail', 'detail'=>'There is no any data for you']);
								exit;
							}
						}
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}

		else if($apistate == "getEscrow"){
			$email = $request->email;
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			$userController = [];
			$escrowList = [];
			$contollerList = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){

						$selController= "SELECT * FROM controller_user";
						$queryController = mysqli_query($con, $selController);						
						if(!$queryController){
							$contollerList = [];
						} else {
							while($rowController = mysqli_fetch_array($queryController)){
								if($rowController['user_id'] == $row['user_id']) {
									array_push($contollerList, $rowController);

									$selEscrow= "SELECT * FROM dmc_escrow";
									$queryEscrow = mysqli_query($con, $selEscrow);			
									while($rowEscrow = mysqli_fetch_array($queryEscrow)){
										if($rowEscrow['controller_id'] == $rowController['id']){
											array_push($escrowList, $rowEscrow);
										}
									}
									
								}
							}
						}
						echo json_encode(['status'=>'success', 'escrowList'=>$escrowList, 'contollerList'=>$contollerList]);
						exit;
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}

		else if($apistate == "addProAddress"){
			$email = $request->email;
			$proAddress1 = $request->proAddress1;
			$proAddress2 = $request->proAddress2;
			$proCity = $request->proCity;
			$proState = $request->proState;
			$proPost = $request->proPost;
			$proCounty = $request->proCountry;
			$proTimeStamp = $request->proTimeStamp;
			
			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$selEscrowPro23 = "SELECT * FROM escrow_property_information";
						$queryEscrowPro = mysqli_query($con, $selEscrowPro23);

						// echo json_encode($con);

						if(!$queryEscrowPro){
							$insertUser = "INSERT INTO `escrow_property_information` (`property_address1`, `property_address2`, `property_city`, `property_state`, `property_postcode`, `property_country`, `added_timestamp`) VALUES ('$proAddress1', '$proAddress2', '$proCity', '$proState', '$proPost', '$proCounty', '$proTimeStamp')";
		
							if(mysqli_query($con, $insertUser)){
								$proID = "";
								$selEscrowPro1 = "SELECT * FROM escrow_property_information";
								$queryEscrowPro1 = mysqli_query($con, $selEscrowPro1);
								while($rowUpdatePro1 = mysqli_fetch_array($queryEscrowPro1)){
									if($rowUpdatePro1['added_timestamp'] == $proTimeStamp){
										$proID = $rowUpdatePro1['id'];
									}
								}
								echo json_encode(['status'=>'success', 'email'=>$email, 'propertyID' => $proID]);
								exit;
							}
							else{
								echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
								exit;
							}
						} else {
							while($rowEscrowPro = mysqli_fetch_array($queryEscrowPro)){
								if($rowEscrowPro['property_address1'] == $proAddress1 && $rowEscrowPro['property_address2'] == $proAddress2 && $rowEscrowPro['property_city'] == $proCity && $rowEscrowPro['property_state'] == $proState && $rowEscrowPro['property_postcode'] == $proPost && $rowEscrowPro['property_country'] == $proCounty && ($proTimeStamp - $rowEscrowPro['added_timestamp']) < 864000){
									echo json_encode(['status'=>'fail', 'detail'=>'This property is currently transacting']);
									exit;
								} 
							}
							$insertUser = "INSERT INTO `escrow_property_information` (`property_address1`, `property_address2`, `property_city`, `property_state`, `property_postcode`, `property_country`, `added_timestamp`) VALUES ('$proAddress1', '$proAddress2', '$proCity', '$proState', '$proPost', '$proCounty', '$proTimeStamp')";
		
							if(mysqli_query($con, $insertUser)){
								$proID = "";
								$selEscrowPro2 = "SELECT * FROM escrow_property_information";
								$queryEscrowPro2 = mysqli_query($con, $selEscrowPro2);
								while($rowUpdatePro2 = mysqli_fetch_array($queryEscrowPro2)){
									if($rowUpdatePro2['added_timestamp'] == $proTimeStamp){
										$proID = $rowUpdatePro2['id'];
									}
								}
								echo json_encode(['status'=>'success', 'email'=>$email, 'propertyID' => $proID]);
								exit;
							}
							else{
								echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
								exit;
							}
						}
						// echo json_encode(['status'=>'success', 'escrowList'=>$escrowList, 'contollerList'=>$contollerList]);
						// exit;
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}
		else if($apistate == "addProSale"){
			$email = $request->email;
			$propertyID = $request->propertyID;
			$proTimeStamp = $request->proTimeStamp;
			$proValue = $request->proValue;

			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$insertUser = "INSERT INTO `property_sale_price` (`property_id`, `property_value`, `timestamp`) VALUES ('$propertyID', '$proValue', '$proTimeStamp')";
	
						if(mysqli_query($con, $insertUser)){
							echo json_encode(['status'=>'success', 'email'=>$email]);
							exit;
						} else {
							echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
							exit;
						}
					}
				}
			}
		}
		else if($apistate == "searchSaleEmail"){
			$email = $request->email;

			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					if($row['user_email'] == $email){

						echo json_encode(['status'=>'success', 'userData'=>$row]);
						exit;
					}
				}
				echo json_encode(['status'=>'fail', 'detail'=>'You are not registered yet']);
				exit;
			}
		}
		else if($apistate == "addSell"){
			$email = $request->email;
			$userID = $request->userID;
			$propertyID = $request->propertyID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$insertUser = "INSERT INTO `seller_information` (`user_id`, `property_id`, `controller_id`, `timestamp`) VALUES ('$userID', '$propertyID', '$controllerID', '$timestamp')";
			
			if(mysqli_query($con, $insertUser)){
				echo json_encode(['status'=>'success', 'email'=>$email]);
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}
		}
		if($apistate == "addNewSeller"){
			$firstName = $request->firstName;
			$lastName = $request->lastName;
			$email = $request->email;
			$DOB = $request->dob;
			$address = $request->address;
			$city = $request->city;
			$state = $request->state;
			$country = $request->country;
			$postalCode = $request->postcode;
			$uniqueField = $request->unique;

			$proID = $request->proID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$changedPassword = md5("");

			$sel = "SELECT * FROM userinfo";
			$query = mysqli_query($con, $sel);

			$existUser = 2;

			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'empty database']);
				exit;
			} else {
				while($row=mysqli_fetch_array($query)){
					if($row['user_email'] == $email){
						$existUser = 1;
					}
				}

				if($existUser == 2){
					$insertUser = "INSERT INTO `userinfo` (`user_fname`, `user_lname`, `user_email`, `user_dob`, `user_address`, `user_city`, `user_state`, `user_country`, `user_postcode`, `user_unique`, `user_password`, `user_pincode`) VALUES ('$firstName', '$lastName', '$email', '$DOB', '$address', '$city', '$state', '$country', '$postalCode', '$uniqueField', '', '')";

					if(mysqli_query($con, $insertUser)){
					}
					else{
					}
				} else {
					echo json_encode(['status'=>'fail', 'detail'=>'Already exist user']);
					exit;
				}

				$selUser = "SELECT * FROM userinfo WHERE user_email = '$email'";
				$queryUser = mysqli_query($con, $selUser);
				$rowUser = mysqli_fetch_array($queryUser);
				$userID = $rowUser['user_id'];
				$insertUser = "INSERT INTO `seller_information` (`user_id`, `property_id`, `controller_id`, `timestamp`) VALUES ('$userID', '$proID', '$controllerID', '$timestamp')";
				
				if(mysqli_query($con, $insertUser)){

					$transport = (new Swift_SmtpTransport('mail.traxprint.asia', 465))
					->setUsername('dmcaserver@traxprint.asia')
					->setPassword('Cn+tQKG&4M1-')
					->setEncryption('ssl')
					;
		
					$mailer = new Swift_Mailer($transport);
		
					$message = (new Swift_Message('Digital Mining Corp Australia'))
					->setFrom(['dmcaserver@traxprint.asia' => 'Digital Mining Corp Australia'])
					->setTo([$email, 'other@domain.org' => 'Link for pdf file'])
					->setBody('You are registered on Digital Mining Corp Australlia App.<br> Please creat password for this account.', 'text/html');

					$result = $mailer->send($message);

					echo json_encode(['status'=>'success', 'email'=>$email]);
					exit;
				} else {
					echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
					exit;
				}
			}	
		} 
		else if($apistate == "searchBuyEmail"){
			$email = $request->email;

			$sel = "SELECT * FROM userinfo WHERE user_email = '$email'";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				$row = mysqli_fetch_array($query);

				echo json_encode(['status'=>'success', 'userData'=>$row]);
				exit;
			}
		}
		else if($apistate == "addBuy"){
			$email = $request->email;
			$userID = $request->userID;
			$propertyID = $request->propertyID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$insertUser = "INSERT INTO `buyer_information` (`user_id`, `property_id`, `controller_id`, `timestamp`) VALUES ('$userID', '$propertyID', '$controllerID', '$timestamp')";
			
			if(mysqli_query($con, $insertUser)){
				echo json_encode(['status'=>'success', 'email'=>$email]);
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}
		}
		if($apistate == "addNewBuyer"){
			$firstName = $request->firstName;
			$lastName = $request->lastName;
			$email = $request->email;
			$DOB = $request->dob;
			$address = $request->address;
			$city = $request->city;
			$state = $request->state;
			$country = $request->country;
			$postalCode = $request->postcode;
			$uniqueField = $request->unique;

			$proID = $request->proID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$sel = "SELECT * FROM userinfo WHERE user_email = '$email'";
			$query = mysqli_query($con, $sel);

			$existUser = 2;

			if(!$query){
				$insertUser = "INSERT INTO `userinfo` (`user_fname`, `user_lname`, `user_email`, `user_dob`, `user_address`, `user_city`, `user_state`, `user_country`, `user_postcode`, `user_unique`, `user_password`, `user_pincode`) VALUES ('$firstName', '$lastName', '$email', '$DOB', '$address', '$city', '$state', '$country', '$postalCode', '$uniqueField', '', '')";

				if(mysqli_query($con, $insertUser)){
				}
				else{
				}

				$selUser = "SELECT * FROM userinfo WHERE user_email = '$email'";
				$queryUser = mysqli_query($con, $selUser);
				$rowUser = mysqli_fetch_array($queryUser);
				$userID = $rowUser['user_id'];
				$insertUser = "INSERT INTO `buyer_information` (`user_id`, `property_id`, `controller_id`, `timestamp`) VALUES ('$userID', '$proID', '$controllerID', '$timestamp')";
				
				if(mysqli_query($con, $insertUser)){

					$transport = (new Swift_SmtpTransport('mail.traxprint.asia', 465))
					->setUsername('dmcaserver@traxprint.asia')
					->setPassword('Cn+tQKG&4M1-')
					->setEncryption('ssl')
					;
		
					$mailer = new Swift_Mailer($transport);
		
					$message = (new Swift_Message('Digital Mining Corp Australia'))
					->setFrom(['dmcaserver@traxprint.asia' => 'Digital Mining Corp Australia'])
					->setTo([$email, 'other@domain.org' => 'Link for pdf file'])
					->setBody('You are registered on Digital Mining Corp Australlia App.<br> Please creat password for this account.', 'text/html');

					$result = $mailer->send($message);

					echo json_encode(['status'=>'success', 'email'=>$email]);
					exit;

				} else {
					echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
					exit;
				}
			} else {

				echo json_encode(['status'=>'fail', 'detail'=>'Already exist user']);
				exit;

			}	
		} 
		else if($apistate == "searchDisEmail"){
			$email = $request->email;

			$sel = "SELECT * FROM userinfo WHERE user_email = '$email'";
			$query = mysqli_query($con, $sel);
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'Database is not exist']);
				exit;
			} else {
				$row = mysqli_fetch_array($query);

				echo json_encode(['status'=>'success', 'userData'=>$row]);
				exit;
			}
		}
		else if($apistate == "addDis"){
			$email = $request->email;
			$userID = $request->userID;
			$propertyID = $request->propertyID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$insertUser = "INSERT INTO `disbursement_information` (`user_id`, `property_id`, `controller_id`, `timestamp`) VALUES ('$userID', '$propertyID', '$controllerID', '$timestamp')";
			
			if(mysqli_query($con, $insertUser)){
				echo json_encode(['status'=>'success', 'email'=>$email]);
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}
		}
		if($apistate == "addNewDis"){
			$firstName = $request->firstName;
			$lastName = $request->lastName;
			$email = $request->email;
			$DOB = $request->dob;
			$address = $request->address;
			$city = $request->city;
			$state = $request->state;
			$country = $request->country;
			$postalCode = $request->postcode;
			$uniqueField = $request->unique;

			$proID = $request->proID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$sel = "SELECT * FROM userinfo WHERE user_email = '$email'";
			$query = mysqli_query($con, $sel);

			$existUser = 2;

			if(!$query){
				$insertUser = "INSERT INTO `userinfo` (`user_fname`, `user_lname`, `user_email`, `user_dob`, `user_address`, `user_city`, `user_state`, `user_country`, `user_postcode`, `user_unique`, `user_password`, `user_pincode`) VALUES ('$firstName', '$lastName', '$email', '$DOB', '$address', '$city', '$state', '$country', '$postalCode', '$uniqueField', '', '')";

				if(mysqli_query($con, $insertUser)){
				}
				else{
				}

				$selUser = "SELECT * FROM userinfo WHERE user_email = '$email'";
				$queryUser = mysqli_query($con, $selUser);
				$rowUser = mysqli_fetch_array($queryUser);
				$userID = $rowUser['user_id'];
				$insertUser = "INSERT INTO `disbursement_information` (`user_id`, `property_id`, `controller_id`, `timestamp`) VALUES ('$userID', '$proID', '$controllerID', '$timestamp')";
				
				if(mysqli_query($con, $insertUser)){

					$transport = (new Swift_SmtpTransport('mail.traxprint.asia', 465))
					->setUsername('dmcaserver@traxprint.asia')
					->setPassword('Cn+tQKG&4M1-')
					->setEncryption('ssl')
					;
		
					$mailer = new Swift_Mailer($transport);
		
					$message = (new Swift_Message('Digital Mining Corp Australia'))
					->setFrom(['dmcaserver@traxprint.asia' => 'Digital Mining Corp Australia'])
					->setTo([$email, 'other@domain.org' => 'Link for pdf file'])
					->setBody('You are registered on Digital Mining Corp Australlia App.<br> Please creat password for this account.', 'text/html');

					$result = $mailer->send($message);

					echo json_encode(['status'=>'success', 'email'=>$email]);
					exit;

				} else {
					echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
					exit;
				}
			} else {

				echo json_encode(['status'=>'fail', 'detail'=>'Already exist user']);
				exit;

			}	
		} 
		else if($apistate == "addTransaction"){
			$propertyID = $request->propertyID;
			$controllerID = $request->controllerID;
			$timestamp = $request->timestamp;

			$insertUser = "INSERT INTO `escrow_transaction` (`property_id`, `controller_id`, `transaction_started_timestamp`) VALUES ('$propertyID', '$controllerID', '$timestamp')";
			
			if(mysqli_query($con, $insertUser)){
				echo json_encode(['status'=>'success']);
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}
		}
		else if($apistate == "getEscrowPendingList"){
			$email = $request->email;
			$controllerID = $request->controllerID;
			$sel = "SELECT * FROM dmc_escrow WHERE controller_id = '$controllerID' AND transaction_completed = '0'";
			$query = mysqli_query($con, $sel);

			$escrowPendingList = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'There is no any pending data']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					array_push($escrowPendingList, $row);
				}
				$selUser = "SELECT * FROM userinfo WHERE user_email = '$email'";
				$queryUser = mysqli_query($con, $selUser);
				$rowUser = mysqli_fetch_array($queryUser);
				echo json_encode(['status'=>'success', 'pendingList'=>$escrowPendingList, 'userDetail'=>$rowUser]);
				exit;
			}
		}
		else if($apistate == "bankDetail"){
			$email = $request->email;
			$userId = $request->userId;
			$backName = $request->backName;
			$accName = $request->accName;
			$bsb = $request->bsb;
			$accNumber = $request->accNumber;
			$verified = $request->verified;
			
			$backInsert = "INSERT INTO `financial_info` (`customer_id`, `bank_name`, `account_name`, `bsb_number`, `account_number`, `account_verified`) VALUES ('$userId', '$backName', '$accName', '$bsb', '$accNumber', '$verified')";
			
			if(mysqli_query($con, $backInsert)){
				$sel = "SELECT * FROM financial_info WHERE customer_id = '$userId' AND bank_name = '$backName' AND account_name = '$accName' AND bsb_number = '$bsb' AND account_number = '$accNumber' AND account_verified = '$verified'";
				$queryUser = mysqli_query($con, $sel);
				if(!$queryUser){
					echo json_encode(['status'=>'fail', 'detail'=>'Can not find data']);
				} else {
					$rowquery = mysqli_fetch_array($queryUser);
					echo json_encode(['status'=>'success', 'bankID'=>$rowquery['id']]);
				}
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}

		}
		else if($apistate == "bankDetailUpdate"){
			$email = $request->email;
			$bankID = $request->bankID;
			$userId = $request->userId;
			$backName = $request->backName;
			$accName = $request->accName;
			$bsb = $request->bsb;
			$accNumber = $request->accNumber;
			$verified = $request->verified;
			
			$bankUpdate = "UPDATE financial_info SET `customer_id` = '$userId', `bank_name` = '$backName', `account_name` = '$accName', `bsb_number` = '$bsb', `account_number` = '$accNumber', `account_verified` = '$verified' WHERE id = '$bankID'";
			
			if(mysqli_query($con, $bankUpdate)){
				$sel = "SELECT * FROM financial_info WHERE customer_id = '$userId' AND bank_name = '$backName' AND account_name = '$accName' AND bsb_number = '$bsb' AND account_number = '$accNumber' AND account_verified = '$verified'";
				$queryUser = mysqli_query($con, $sel);
				$rowquery = mysqli_fetch_array($queryUser);
				echo json_encode(['status'=>'success', 'bankID'=>$rowquery['id']]);
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}

		}
		else if($apistate == "backVerify"){
			$email = $request->email;
			$bankID = $request->bankID;
			$amount1 = $request->amount1;
			$amount2 = $request->amount2;
			$verify = $request->verify;
			
			$backInsert = "INSERT INTO `bank_verify` (`bank_id`, `amount_one`, `amount_two`, `account_verified`) VALUES ('$bankID', '$amount1', '$amount2', '1')";
			
			if(mysqli_query($con, $backInsert)){
				echo json_encode(['status'=>'success']);
				exit;
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not insert data to database']);
				exit;
			}

		}
		else if($apistate == "verifyBankEscrow"){
			$email = $request->email;
			$penBuyID = $request->penBuyID;
			$penSelID = $request->penSelID;
			$penDisID = $request->penDisID;
			$penDes = $request->penDes;
			$penValue = $request->penValue;
			$penTimestamp = $request->penTimestamp;
			$controllerID = $request->controllerID;
					    
			$update="UPDATE dmc_escrow SET `transaction_completed` = '1' WHERE controller_id = '$controllerID' AND distribution_date = '$penTimestamp' AND distribution_description = '$penDes' AND distribution_id = '$penDisID' AND seller_id = '$penSelID' AND buyer_id = '$penBuyID' ";

			if(mysqli_query($con, $update)){
				$sel = "SELECT * FROM dmc_escrow WHERE controller_id = '$controllerID' AND transaction_completed = '0'";
				$query = mysqli_query($con, $sel);
	
				$escrowPendingList = [];
				if(!$query){
					echo json_encode(['status'=>'fail', 'detail'=>'There is no any pending data']);
					exit;
				} else {
					while($row = mysqli_fetch_array($query)){
						array_push($escrowPendingList, $row);
					}
					$selUser = "SELECT * FROM userinfo WHERE user_email = '$email'";
					$queryUser = mysqli_query($con, $selUser);
					$rowUser = mysqli_fetch_array($queryUser);
					echo json_encode(['status'=>'success', 'pendingList'=>$escrowPendingList, 'userDetail'=>$rowUser]);
					exit;
				}
			} else {
				echo json_encode(['status'=>'fail', 'detail'=>'Can not update database.']);
				exit;
			}

		}
		else if($apistate == "getCompleteList"){
			$email = $request->email;
			$controllerID = $request->controllerID;
			$sel = "SELECT * FROM dmc_escrow WHERE controller_id = '$controllerID' AND transaction_completed = '1'";
			$query = mysqli_query($con, $sel);

			$escrowPendingList = [];
			if(!$query){
				echo json_encode(['status'=>'fail', 'detail'=>'There is no any pending data']);
				exit;
			} else {
				while($row = mysqli_fetch_array($query)){
					array_push($escrowPendingList, $row);
				}
				$selUser = "SELECT * FROM userinfo WHERE user_email = '$email'";
				$queryUser = mysqli_query($con, $selUser);
				$rowUser = mysqli_fetch_array($queryUser);
				echo json_encode(['status'=>'success', 'completeList'=>$escrowPendingList, 'userDetail'=>$rowUser]);
				exit;
			}
		}
	}












?>
