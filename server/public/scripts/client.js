$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");

  //click listener
  $("#submit-button").on("click", handleSubmit);
}

function handleSubmit() {
  console.log("In handle submit");

  let newGuesses = {
    player1: $("#jamesIn").val(),
    player2: $("#dillonIn").val(),
    player3: $("#owenIn").val(),
    player4: $("#ianIn").val(),
  };

  // add to array
  // push it /guesses
  // MAKE A POST REQUEST with newGuesses
  // Data should always be an Object

  $.ajax({
    method: "POST",
    url: "/guesses",
    // send data
    data: newGuesses,
  }).then((response) => {
    console.log(response);
    // need to clear inputs
    $("#jamesIn").val("");
    $("#dillonIn").val("");
    $("#owenIn").val("");
    $("#ianIn").val("");
  });
}
