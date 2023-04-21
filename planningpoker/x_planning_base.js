
// common functions
// Slim extensions

var connected_flag;
if (connected_flag == null) {
  //alert("null found");
  connected_flag = 0;
}
console.log("top of JS file... set connected_flag init?? ... connected_flag value is: " + connected_flag);

var mqtt;
var reconnectTimeout = 2000;
var server;
var mqtthost = "192.168.3.172";
var port = 8081; //port 8081 is 'web sockets' with MQTT, 1883 is default MQTT port.
var clean_sessions = true;

//===========================================================
// get 'random' to generate a string of x chars based on the input
//   example: random(14); //returns a random mix of alph and numeric
//===========================================================
const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};


//===========================================================
//      myLogger()
//      check the log level to determine what to show in the console.log 
//      the bigger the lineLogLevel, the more likely to log (must be bigger than defLogLevel)
//      ex: lineLogLevel = 0; almost never display log
//      ex: lineLogLevel = 3; display log sometimes... when defLogLevel is less than 3 (ie, 2 or below)
//   NOTE: to suppress display of all logs, set the defLogLevel to a large number... ex: 100... 
//   sample:  myLogger(3, "myFunction()", "log this sample string");
//===========================================================
var debug = true; //true to push console.log  OR false to suppress
var defLogLevel = 4; //smaller = more things logged, bigger = fewer things logged

function myLogger(lineLogLevel, message, called_from) {

  my_message = "" + message;
  my_called_from = "" + called_from;
  if (defLogLevel < lineLogLevel) {
    console.log(getPrettyDateTime() + " " + lineLogLevel + " | " + my_called_from + " | " + message);
    //if (debug) console.log(getPrettyDateTime() + " logLevel(" + lineLogLevel + ", " + called_from + ")-- defLogLevel = " + defLogLevel);
    return true;
  }
  return false;
}

function logLevel(lineLogLevel, called_from) {

  if (defLogLevel < lineLogLevel) {
    //if (debug) console.log(getPrettyDateTime() + " logLevel(" + lineLogLevel + ", " + called_from + ")-- defLogLevel = " + defLogLevel);
    return true;
  }
  return false;
}

//===========================================================
//      getPrettyTime()
//===========================================================
function getPrettyTime() {

  var testDate = new Date();
  var testHours = parseInt(testDate.getHours());
  var testMins = parseInt(testDate.getMinutes());
  var testSecs = parseInt(testDate.getSeconds());

  if (testHours < 10)
    testHours = "0" + testHours;
  if (testMins < 10)
    testMins = "0" + testMins;
  if (testSecs < 10)
    testSecs = "0" + testSecs;

  return testHours + ":" + testMins + ":" + testSecs;
}

//===========================================================
//      getPrettyTimeMin()
//        get the formatted time in hh:mm
//        example 08:46
//===========================================================
function getPrettyTimeMin() {


  var testDate = new Date();
  var testHours = parseInt(testDate.getHours());
  var testMins = parseInt(testDate.getMinutes());
  var testSecs = parseInt(testDate.getSeconds());

  if (testHours < 10)
    testHours = "0" + testHours;
  if (testMins < 10)
    testMins = "0" + testMins;

  return testHours + ":" + testMins;
}

//===========================================================
//      getMills()
//        get a millisecond response including minutes & seconds to help make it unique
//        example 4234534
//===========================================================
function getMills() {
  var testDate = new Date();
  return testDate.getMinutes() + "" + testDate.getSeconds() + "" + testDate.getMilliseconds();
}

function getUglyTime() {
  var testDate = new Date();
  testDate.getHours();
  testDate.getMinutes();

  return testDate.getSeconds() + testDate.getMilliseconds();
}

function getPrettyDate() {
  var testDate = new Date();
  var testMons = 1 + parseInt(testDate.getMonth());
  var testDays = parseInt(testDate.getDate());

  if (testMons < 10)
    testMons = "0" + testMons;
  if (testDays < 10)
    testDays = "0" + testDays;

  return testMons + "/" + testDays;
}

function getPrettyDateTimeMin() {
  return getPrettyDate() + " " + getPrettyTimeMin();
}

//===========================================================
//      getPrettyDateTime()
//        get the formatted Date Time
//        example 11/04 16:46:27
//===========================================================
function getPrettyDateTime() {
  return getPrettyDate() + " " + getPrettyTime();
}


//myLogger(11,"tabID before is: " + tabID,"base");
myLogger(11,"tabID sessionStorabe.tabID is: " + sessionStorage.tabID, "base JS init");

if (sessionStorage.tabID == null) {
  //var tabID = sessionStorage.tabID && sessionStorage.closedLastTab !== '2' ? sessionStorage.tabID : sessionStorage.tabID = Math.random();
  var tabID = sessionStorage.tabID && sessionStorage.closedLastTab !== '2' ? sessionStorage.tabID : sessionStorage.tabID = random(14);
} else {
  var tabID = sessionStorage.tabID;
}
//chrome.tabs.getCurrent(function(tab){ console.log(JSON.stringify(tab,null, 2)); })

myLogger(11,"tabID after init is: " + tabID, "base JS init");

//sessionStorage.closedLastTab = '2';
//$(window).on('unload beforeunload', function() {
//      sessionStorage.closedLastTab = '1';
//});



//==================================================================
//    onConnectionLost() 
//        show the connection has been lost 
//==================================================================
function onConnectionLost() {
  //console.log("connection lost");
  myLogger(9, "logging that we are in the onConnectionLost function", "onConnectionLost()");
  connected_flag = 0;
}

//==================================================================
//    onFailure(message)
//==================================================================
function onFailure(message) {
  myLogger(9, "Failed", "onFailure(message)");
  setTimeout(MQTTconnect, reconnectTimeout);
}



//==================================================================
// this called anytime a messaeg arrives on the queue
//==================================================================
function onMessageArrived(r_message) {

  myLogger(1, "logging this method...","onMessageArrived(r_message)");

  checkCardSelected(r_message);
  checkClearCards(r_message);
  checkNewUser(r_message);

} 


//==================================================================
//   onConnected (recon, url)
//==================================================================
function onConnected(recon, url) {
  myLogger(5, "on Connected... setting the connected_flag to:" + connected_flag, "onConnected(recon, url)");
  myLogger(5, " in onConnected " + recon, "onConnected(recon, url)");
  myLogger(5, " in onConnected " + url, "onConnected(recon, url)");
}

//==================================================================
//   onConnect 
//==================================================================
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  myLogger(5, "Connected to " + mqtthost + " on port " + port, "onConnect()");
  connected_flag = 1;
  //console.log("on Connect... setting the connected_flag to:" + connected_flag);
  myLogger(5, "on Connect... setting the connected_flag to:" + connected_flag, "onConnect()");

  auto_sub_topics();
}

//=========================================================
//    disconnect()
//=========================================================
function disconnect() {
  myLogger(5, "simple logging", "disconnect()");
  if (connected_flag == 1)
    mqtt.disconnect();
}




//===========================================================
//   MQTTconnect 
//    accepts an optional 'client_in' as a string
//===========================================================
function MQTTconnect(client_in) {
  if (null == client_in)
    client_in = "clientjs" + getUglyTime();

  myLogger(3,"connecting... with client: " + client_in,"MQTTconnect(client_in)");

  var p = port;
  if (p != "") {
    port = parseInt(p);
  }


  myLogger(3, "connecting to " + mqtthost + " " + port + " clean session=" + clean_sessions, "MQTTconnect(client_in)");
  //console.log("user "+user_name);
  myLogger(3,"connecting... ","MQTTconnect(client_in)");
  mqtt = new Paho.MQTT.Client(mqtthost, port, client_in);
  //document.write("connecting to "+ mqtthost);
  var options = {
    timeout: 3,
    cleanSession: clean_sessions,
    onSuccess: onConnect,
    onFailure: onFailure,

  };

  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
  mqtt.onConnected = onConnected;

  mqtt.connect(options);
  return false;
}

//===========================================================
//   auto_sub_topics
//     auto subscribe to topics
//===========================================================
function auto_sub_topics() {
  if (connected_flag == 0) {
    myLogger(9, "Not Connected so can't subscribe", "auto_sub_topics()");
    return false;
  }
  var stopic = "#";
  var sqos = 0;
  myLogger(9, "Subscribing to topic: " + stopic + " QOS: " + sqos, "auto_sub_topics()");
  //document.getElementById("status_messages").innerHTML = "Subscribing to topic =" + stopic;
  var soptions = {
    qos: sqos,
  };
  mqtt.subscribe(stopic, soptions);
  return true;
}



//Reconnect Manually
function reconnectManually() {
  if (logLevel(10, "reconnectManually()")) console.log(getPrettyDateTime() + " reconnectManually() ");
  //motion_collection = false;
  //reset_msg_motion = true;
  forceGateCheck();
  MQTTconnect();
 // init_motion_items()
}



var checkConnectedStatusIntervalID = window.setInterval(myRefreshOnLostConnection, 60000);//60,000 = 1 min..180,000=3 min..600,000=10 min 

//===========================================================
function myRefreshOnLostConnection() {
  if (connected_flag == 0) {
    console.log(getPrettyTime() + " *************************************************");
    console.log(getPrettyTime() + " ***  DISCONNECTED ... ***************************");
    attempt_reconnect("myRefreshOnLostConnection()");
  }
}


//===========================================================
function attempt_reconnect(called_from) {
  console.log(getPrettyTime() + " connected_flag is: " + connected_flag);
  console.log(getPrettyTime() + " *************************************************");
  console.log(getPrettyTime() + " called from: " + called_from);
  console.log(getPrettyTime() + " *************************************************");
  console.log(getPrettyTime() + " ***  DISCONNECTED ... ***************************");
  console.log(getPrettyTime() + " *************************************************");
  console.log(getPrettyTime() + " ***  RECONNECTING ... **********attempt_reconnect");
  console.log(getPrettyTime() + " *************************************************");
  MQTTconnect("auto_try");
  //parent.load_root(); //from parent-- index.html JS
}



//================================================================================================
//================================================================================================
//================================================================================================
//================================================================================================
//================================================================================================


const users = [];

//===========================================================
//   Check for a Card Selected Message
//===========================================================
function checkCardSelected(r_message) {
  if (null == r_message)
    return;
    try {
      if (r_message.destinationName.indexOf("scrum") > -1) {
        myLogger(1, "======== checkCardSelected index =========== ", "checkCardSelected(r_message)");
        //document.getElementById("forecast_tempf").innerHTML = r_message.payloadString.trim();
      }
    if (r_message.destinationName == "scrum/cardselect" ) {
      myLogger(1, "======== checkCardSelected = =========== ", "checkCardSelected(r_message)");
      myLogger(17, "payload:" + r_message.payloadString, "checkCardSelected(r_message)");
      manageUsers(r_message);
    }
  } catch (err) {
     console.log("mqtt error" + err);
  }

  if (r_message.destinationName == "scrum/showcards" ) {
    showResults();
  }
}

//===========================================================
//  manageUsers 
//    check for existing user by TabID
//    If exists, 
//       update the user info
//    else ... add new user to users array
//===========================================================
function manageUsers(r_message){
  const userObj = JSON.parse(r_message.payloadString);
  myLogger(1, "parsed json data is: " + userObj.toString(), "manageUsers(r_message)");
  var u_tabID = userObj.tabID;
  var u_name = userObj.name;
  myLogger(17, "user_tabID is: " + u_tabID, "manageUsers(r_message)");
  myLogger(17, "name is: " + u_name, "manageUsers(r_message)");
  var card_value = userObj.card_value;
  var u_voted = userObj.voted;
  
  //let myUser = new User(u_tabID, u_name, card_value, voted)
  let myUser = {
    user_tabID: u_tabID,
    first_name: u_name,
    card_value: card_value,
    voted: u_voted
  };

  myLogger(15,"user ID of " + myUser.user_tabID, "manageUsers(r_message)");
  //myLogger(15,"user ID of " + users.toString(), "logging users Array");
  //users.forEach(element => console.log(element));
  
  myLogger(1,"just a log point 1", "manageUsers(r_message)");
  //myLogger(16,"getting user", "logging");

  let existing_user;
  myLogger(1,"just a log point 2", "manageUsers(r_message)");
  //let userTest = users.find(user=>u_tabID === u_tabID);
  //let userTest = users.find(user=>user_tabID === myUser.user_tabID);
  let searchIndex = users.findIndex((user) => user.user_tabID == myUser.user_tabID);
  let userTest = users[searchIndex];
  myLogger(1,"just a log point 3", "manageUsers(r_message)");
  //myLogger(16,"sample output" + users.user[searchIndex].user_tabID + users.user[searchIndex].first_name, "logging");
  if (userTest != null){
    myLogger(1,"***user tabID of " + userTest.user_tabID, "manageUsers(r_message)");
    myLogger(1,"***user first_name of " + userTest.first_name, "manageUsers(r_message)");
    myLogger(1,"***user card_value of " + userTest.card_value, "manageUsers(r_message)");

    myLogger(16,"just update values... already got a user!", "manageUsers(r_message)");
    
    userTest = myUser;
    users[searchIndex]=myUser;
    //document.getElementById(userTest.user_tabID).innerText = "This is a paragraph with id of " + userTest.user_tabID + " name: " + userTest.first_name + " and card value of: " + userTest.card_value;
    
    
    myLogger(16,"got a user from the user array with ID of" + userTest.user_tabID, "manageUsers(r_message)");
    myLogger(16,"got a user from the user array with card_value of" + userTest.card_value, "manageUsers(r_message)");

  }else{
    myLogger(15,"create new element for the user, bc we don't have TabID yet", "manageUsers(r_message)");
    //myLogger(15,"***user ID of " + user_test.toString(), "find user from users Array");
    var para = document.createElement("p");
    para.id = u_tabID;
    //para.innerText = "This is a paragraph with id of " + u_tabID + " name: " + u_name + " and card value of: " + card_value;
    document.body.appendChild(para);
    users.push(myUser);
  }
showUsers();

}

//===========================================================
//   Check for a ClearCards Message
//===========================================================
function checkClearCards(r_message) {
  //myLogger(17, "======== LOG ALL MESSAGES =========== "+r_message.payloadString, "checkClearCards(r_message)");
  if (null == r_message)
    return;
    try {
      if (r_message.destinationName.indexOf("scrum") > -1) {
        myLogger(1, "======== checkClearCards index =========== ", "checkClearCards(r_message)");
        //document.getElementById("forecast_tempf").innerHTML = r_message.payloadString.trim();
      }
      if (r_message.destinationName == "scrum/clearcards" ) {
        myLogger(12, "======== checkClearCards =========== ", "checkClearCards(r_message)");
        clear_cards();
      }
    } catch (err) {
      console.log("mqtt error" + err);
    }
  }

//===========================================================
//   Check for a Show New user
//===========================================================
function checkNewUser(r_message) {
  //myLogger(17, "======== LOG ALL MESSAGES =========== "+r_message.payloadString, "checkNewUser(r_message)");
  if (null == r_message)
    return;
    try {
      if (r_message.destinationName == "scrum/newuser" ) {
        myLogger(17, "========checkNewUser(r_message) =========== "+r_message.payloadString, "checkNewUser(r_message)");
        //Add User Parse Details
        manageUsers(r_message);
      }
    } catch (err) {
      console.log("mqtt error" + err);
    }
  }


//Define an 'Object' User
// function User(u_tabID, u_name, u_card_value) {
//   this.user_tabID = u_tabID;
//   this.first_name = u_name;   
//   this.card_value = u_card_value;
//   }

function showResults() {
  myLogger(17, "======== showResults() =========== ", "showResults()");
  //user1_name = document.getElementById("assigned_name1").innerHTML;
  //user2_name = document.getElementById("assigned_name2").innerHTML;
  //user3_name = document.getElementById("assigned_name3").innerHTML;

  // var str_results = "SHOW RESULTS";
  // str_results =str_results+ "<br>User 1 - " + user1_name + "'s card is: " + user1_card_selected;
  // str_results =str_results+ "<br>User 2 - " + user2_name + "'s card is: " + user2_card_selected;
  // str_results =str_results+ "<br>User 3 - " + user3_name + "'s card is: " + user3_card_selected;
  // document.getElementById("results").innerHTML = str_results;

  //get users
  //iterate over them
  //output each result
  var str_results = "--- SHOW RESULTS ---";
  var user;
  for (let i = 0; i < users.length; i++) {
    myLogger(17, "======== log user on next line =========== ", "showResults()");
    console.log(users[i]);
    user=users[i];
    str_results =str_results+ "<br>User: " + user.first_name + "'s card is: " + user.card_value;
    //console.log(user);
  }
  document.getElementById("results").innerHTML = str_results;
  hideUsers();
}

//==========================================================
// Send a Clear cards message
//==========================================================
function pushClearCards(){
  mqtt.send('scrum/clearcards', 'clearcards');
}

//==========================================================
// Clear the cards
//==========================================================
function clear_cards() {
  myLogger(17, "======== clear_cards =========== ", "clear_cards()");
  var user;
  for (let i = 0; i < users.length; i++) {
    users[i].card_value=0;
    users[i].voted=0;
    console.log(users[i]);
  }
  document.getElementById("results").innerHTML = "";
  showUsers();
}

//==========================================================
// Hide the users div
//==========================================================
function hideUsers() {
  document.getElementById("users").hidden=true;
}

//==========================================================
// Show the users and their voting status
//==========================================================
function showUsers() {
  myLogger(17, "======== showUsers =========== ", "showUsers()");
  document.getElementById("users").hidden=false;
  document.getElementById("users").innerHTML = "";
  try{
    //console.log("11logging in showUsers ");
    for (let count = 0; count < users.length; count++) {
      //console.log("22logging in showUsers");
      var newDisplayUser = document.createElement("div");
      //console.log("33logging in showUsers");
      newDisplayUser.id = users[count].user_tabID;
      //console.log("logging in showUsers");
      var displayText;
      if (users[count].voted){
        displayText = "done!";
      } else {
        displayText = "waiting...";
      }
      newDisplayUser.innerText = users[count].first_name + " " + displayText;
      //document.getElementById("users").innerHTML = "";
      document.getElementById("users").appendChild(newDisplayUser);
    }
  } catch (err) {
    console.log("problem trying to show users: " + err);
  }
  
}






function generateCards(quantity){
  
  var cards = document.getElementById("cards");
  const countRadio = document.getElementById("countRadio");
  const fibRadio = document.getElementById("fibRadio");

  countRadio.addEventListener("change", () => {
    updateCards("count");
  });
  
  fibRadio.addEventListener("change", () => {
    updateCards("fib");
  });

  function updateCards(cardType) {
    for (let i = 0; i < cards.children.length; i++) {
      const card = cards.children[i];
      if (cardType === "count") {
        card.innerText = i;
      } else if (cardType === "fib") {
        card.innerText = fibonacci(i + 1);
      }
    }
  }
  
  // Function to calculate the fibonacci
  function fibonacci(n) {
    if (n === 1 || n === 2) {
      return 1;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }

  
  if (cards) {
    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
  }

  if (!cards) {
    cards = document.createElement("div");
    cards.id = "cards";
    document.body.appendChild(cards);
  }

  for (let count = 0; count < quantity; count++) {
    var newCard = document.createElement("div");
    newCard.id = "card"+count;
    newCard.innerText = count;
    newCard.setAttribute('onclick', 'select_card(\'' + tabID + '\',' + count + ');');
    cards.appendChild(newCard);
  }
  
  }
  function addCards() {
    const numCardsInput = document.getElementById("numCardsInput");
    const numCards = numCardsInput.value;
    generateCards(numCards);
  }