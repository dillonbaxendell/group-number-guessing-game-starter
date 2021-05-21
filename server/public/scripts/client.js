$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  getGuesses();
  randomNumber();
  //click listener
  $("#submit-button").on("click", handleSubmit);
}

function compareNumbers(numberToCompare) {
  // Need to store our numbers
  // to match against /guesses
  console.log(numberToCompare)
  let guessNumber = { 
    number: numberToCompare
  
  };
  setTimeout(function() {console.log(guessNumber.number);}, 1000)

  $.ajax({
    method: "GET",
    url: "/guesses"
  }).then(function (response) {
      console.log(response);
      
      


      let results = response.filter(function (entry) {
        return (
          entry.player1 == guessNumber.number ||
          entry.player2 == guessNumber.number ||
          entry.player3 == guessNumber.number ||
          entry.player4 == guessNumber.number)
      })

      let returnItem = []

      console.log(results);
      returnItem.push(results)
      console.log(returnItem)

      if (returnItem.indexOf(guessNumber.number)) {
        console.log();
        
      }
      
  })
}

function randomNumber() {
  console.log("in randomNumber");
  // Go to server route /guessRandom
  // Promise that you'll come back
  // Let's see what ajax has for us
  $.ajax({
    method: "GET",
    url: "/guessRandom",
  }).then(function (response) {
    console.log(response);
    $("#random").empty();
    $("#random").append(response);
    compareNumbers(response);
  });
  
}

function getGuesses() {
  console.log("in getGuesses");
  // Go to server route /guesses
  // Promise that you'll come back
  // Let's see what ajax has for us
  $.ajax({
    method: "GET",
    url: "/guesses",
  }).then(function (response) {
    // response is what was in the res.send()
    console.log(response);
    // Need to empty
    $("#player-choices").empty();
    // Append information about guesses to DOM
    for (let guess of response) {
      $("#player-choices").append(`
          <tr>
              <td>${guess.player1}</td>
              <td>${guess.player2}</td>
              <td>${guess.player3}</td>
              <td>${guess.player4}</td>
          </tr>
      `);
    }
  });
}

function handleSubmit() {
  console.log("In handle submit");

  let newGuesses = {
    player1: $("#player-one").val(),
    player2: $("#player-two").val(),
    player3: $("#player-three").val(),
    player4: $("#player-four").val(),
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
    $("#player-one").val("");
    $("#player-two").val("");
    $("#player-three").val("");
    $("#player-four").val("");
  });
}
