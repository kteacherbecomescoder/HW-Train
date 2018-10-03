var database = firebase.database();


database.ref().on("child_added", function (childSnapshot) {


  var row = $("<tr>");
  row.html("<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().city + "</td><td>" + childSnapshot.val().rate + "</td><td>" + childSnapshot.val().arrival + "</td><td>" + childSnapshot.val().minutes + "</td>"
  );
  $("#table").append(row);
});


$("#submit-train").on("click", function () {

  event.preventDefault();

  var trainName = $("#name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var tFrequency = $("#frequency").val().trim();

  // First Time
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years").toString();
  console.log(firstTimeConverted);

  // // current time
  var currentTime = moment().format();

  // Difference between the times
  var diffTime = moment().diff(firstTimeConverted, "minutes");

  // Time apart
  var tRemainder = diffTime % tFrequency;

  // Minutes Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

  // Pushing values to the firebase database
  database.ref().push({
    name: trainName,
    city: destination,
    rate: tFrequency,
    arrival: nextTrain,
    minutes: tMinutesTillTrain

  });

  // after submit set the value of each input field to an empty string

  $("#name").val(" ");
  $("#destination").val(" ");
  $("#first-train").val(" ");
  $("#frequency").val(" ");

});