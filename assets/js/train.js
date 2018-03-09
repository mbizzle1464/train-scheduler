    // Play and Pause Song
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "assets/audio/jupiter.mp3");
    
    // Initialize Firebase
    /*var config = { 
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",  
};
firebase.initializeApp(config); */
    // Create a variable to reference the database
    var database = firebase.database();

// Button for adding a new train
$('#addTrainBtn').on('click', function(){

    //Grabs user input
    var trainName = $('#trainNameInput').val().trim();
    var destination = $('#destInput').val().trim();
    var firstTrain = $('#firstTrainInput').val().trim();
    var frequency = $('#freqInput').val().trim();

  /*console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency); */

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain, 
        freq: frequency
    }

    //Uploads employee data to the database
    database.ref().push(newTrain);  

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    // Clears all of the text-boxes
    $('#trainNameInput').val('');   
    $('#destInput').val('');   
    $('#firstTrainInput').val('');   
    $('#freqInput').val('');  
    
    return false;   
}); 

// Creates a Firebase event for adding trains to the database and a row in the html
database.ref().on('child_added', function(childSnapshot){
    console.log(childSnapshot.val());   

    // Store everything into a variable
    var trainName = childSnapshot.val().trim().name;
    var destination = childSnapshot.val().trim().dest;
    var firstTrain = childSnapshot.val().trim().first;
    var frequency = childSnapshot.val().trim().freq;


    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // First time
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, years);   
    console.log(firstTimeConverted);    

    // Current time
    var currentTime = moment(); 
    console.log("Current Time: " + moment(currentTime).format("HH:mm"))

    // Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");    
    console.log("Difference in Time: " +diffTime);  

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;  
    console.log(tRemainder);    

    // Mins until train
    var tMinutesTillTrain = frequency - tRemainder; 
    console.log("Minutes Until Train: " + tMinutesTillTrain);   

    // Next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm"); 
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));  

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

}); 

    // Play Song
$(".theme-button").on("click", function () {
        audioElement.play();
});
    // Pause Song
$(".pause-button").on("click", function () {
    audioElement.pause();
});