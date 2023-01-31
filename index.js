// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDE3gk7rKa5ymYc-gEqQqjKIs6m9hgT2Dc",
  authDomain: "kashiyikes.firebaseapp.com",
  databaseURL: "https://kashiyikes-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kashiyikes",
  storageBucket: "kashiyikes.appspot.com",
  messagingSenderId: "46660759919",
  appId: "1:46660759919:web:fd678a51447dc96c9f789a",
  measurementId: "G-YLN3XMQJ1Z"
  };

  firebase.initializeApp(firebaseConfig);
  

  const coin = document.querySelector('.coin');
  const flipButton = document.getElementById("flip-button");
  // Reference to the scores in the database
  var scoresRef = firebase.database().ref("scores");
  
  // Get references to HTML elements
  var kashiScoreSpan = document.getElementById("kashiscore");
  var alizaScoreSpan = document.getElementById("alizascore");
  var resetButton = document.getElementById("reset-button");
  var winnerPara = document.getElementById("winner");


  let kashiHeads = document.querySelector('input[name="kashi"][value="Heads"]');
  let kashiTails = document.querySelector('input[name="kashi"][value="Tails"]');
  let alizaHeads = document.querySelector('input[name="aliza"][value="Heads"]');
  let alizaTails = document.querySelector('input[name="aliza"][value="Tails"]');

  kashiHeads.addEventListener("change", () => {
      alizaTails.checked = true;
  });

  kashiTails.addEventListener("change", () => {
      alizaHeads.checked = true;
  });


  alizaHeads.addEventListener("change", () => {
      kashiTails.checked = true;
  });
    
  alizaTails.addEventListener("change", () => {
      kashiHeads.checked = true;
  });




// Get the initial scores from the database
scoresRef.on("value", function(snapshot) {
    kashiScoreSpan.textContent = snapshot.val().kashi;
    alizaScoreSpan.textContent = snapshot.val().aliza;
});
  


let currentFace = "heads";
let winner;
// Function to flip the coin and update scores
flipButton.addEventListener("click", function() {

    // Get the choice of each player

    var kashiChoice = document.querySelector('input[name="kashi"]:checked').value;
    var alizaChoice = document.querySelector('input[name="aliza"]:checked').value;

    if (kashiChoice === null || alizaChoice === null) {
        document.querySelector("#winner").textContent = `Please select Heads or Tails`;
    }else{
  
        // Flip the coin to determine the result
        var result = Math.random() < 0.5 ? "Heads" : "Tails";

        setTimeout(function () {
            if (currentFace === "heads") {
                coin.style.animation = "spin-tails 3s forwards";
                currentFace = "tails";
            } else {
                coin.style.animation = "spin-heads 3s forwards";
                currentFace = "heads";
            }
        }, 100);

        console.log(result);


        // Update the scores based on the result
        if (result === kashiChoice) {
            setTimeout(function () {
                kashiScoreSpan.textContent = parseInt(kashiScoreSpan.textContent) + 1;
                winner = 'Kashi';
            }, 3000);
        }
        if (result === alizaChoice) {
            setTimeout(function () {
                alizaScoreSpan.textContent = parseInt(alizaScoreSpan.textContent) + 1;
                winner = 'Aliza';
            }, 3000);
        }
    
        // Update the scores in the database

        setTimeout(updateStats, 3000);
        disableButton();

    }


});
  
  // Function to reset the scores
resetButton.addEventListener("click", function() {
    kashiScoreSpan.textContent = 0;
    alizaScoreSpan.textContent = 0;
    winnerPara.textContent = "";

    // Reset the scores in the database
    scoresRef.set({
        kashi: 0,
        aliza: 0
    });
});
  




function updateStats() {
    document.querySelector("#winner").textContent = `${winner} is Better`;
    scoresRef.set({
        kashi: kashiScoreSpan.textContent,
        aliza: alizaScoreSpan.textContent
    });
    // getScores();
}

function disableButton() {
    flipButton.disabled = true;
    setTimeout(function () {
        flipButton.disabled = false;
    }, 3000);
}
