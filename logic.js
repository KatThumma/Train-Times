


  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyD3rCts9vQmqicJvnsyYCBbaQWK9le-1Ls",
  //   authDomain: "saturday-ee9ba.firebaseapp.com",
  //   databaseURL: "https://saturday-ee9ba.firebaseio.com",
  //   projectId: "saturday-ee9ba",
  //   storageBucket: "saturday-ee9ba.appspot.com",
  //   messagingSenderId: "310365635548"
  // };
  // firebase.initializeApp(config);

var trainData = firebase.database();

  // Button for adding Trains
$("#addTrainButton").on("click",function(){

    //user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var trainFrequency = $("#frequencyInput").val().trim();

  
    // Creates local "temporary" object
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      arrival: firstTrain,    
      frequency: trainFrequency

    };

     // Uploads employee data to the database
  trainData.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;
});

trainData.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})


