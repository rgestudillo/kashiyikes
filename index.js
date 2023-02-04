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
  

  
  let coin = document.querySelector('.coin');
  let flipBtn = document.querySelector("#flip-button");
  // Reference to the scores in the database
  let scoresRef = firebase.database().ref("scores");
  
  // Get references to HTML elements
  let kashiScoreSpan = document.getElementById("kashiscore");
  let alizaScoreSpan = document.getElementById("alizascore");
  let resetButton = document.getElementById("reset-button");
  let winnerPara = document.getElementById("winner");


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


let winner;
// Function to flip the coin and update scores
flipBtn.addEventListener("click", () => {
    kashiSelection = document.querySelector('input[name="kashi"]:checked');
    alizaSelection = document.querySelector('input[name="aliza"]:checked');
    let i = Math.floor(Math.random() * 2);
    coin.style.animation = "none";
    document.querySelector("#winner").textContent = ` `;
    if(kashiSelection == null || alizaSelection == null){
        document.querySelector("#winner").textContent = `Please select Heads or Tails`;
    } else{
        if (i) {
            setTimeout(function () {
                coin.style.animation = "spin-heads 3s forwards";
            }, 100);

            if(kashiSelection.value == 'Heads'){
                winner = 'Kashi';
            }else{
                winner = 'Aliza';
            }

        } else {
            setTimeout(function () {
                coin.style.animation = "spin-tails 3s forwards";
            }, 100);
            if(kashiSelection.value == 'Tails'){
                winner = 'Kashi';
            }else{
                winner = 'Aliza';
            }
        }
        setTimeout(updateStats, 3000);
      
        disableButton();
    }

});
  

function updateScores(){

    if(winner == 'Kashi'){
        let kashiScore = parseInt(kashiScoreSpan.textContent);
        kashiScore++;
        kashiScoreSpan.textContent = kashiScore;
        // Update the scores in the database
        scoresRef.update({
            kashi: kashiScore
        });
    }else{
        let alizaScore = parseInt(alizaScoreSpan.textContent);
        alizaScore++;
        alizaScoreSpan.textContent = alizaScore;
        // Update the scores in the database
        scoresRef.update({
            aliza: alizaScore
        });
    }
}
  

// Function to update the scores in the database
function updateStats() {
    document.querySelector("#winner").textContent = `${winner} is Better`;
    updateScores();
}

function disableButton() {
    flipBtn.disabled = true;
    setTimeout(function () {
        flipBtn.disabled = false;
    }, 3000);
}

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