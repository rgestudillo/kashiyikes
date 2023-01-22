    console.log("JavaScript code started");
   
    let coin = document.querySelector(".coin");
    let flipBtn = document.querySelector("#flip-button");
    let resetBtn = document.querySelector("#reset-button");
    let winner = 'Alizadasda';
    let kashiSelection;
    let alizaSelection;
    let kashi = 0;
    let aliza = 0;
    fetch("/scores")
    .then(response => response.json())
    .then(data => {
        kashi = data.kashi;
        aliza = data.aliza;
        document.querySelector("#kashiscore").textContent = `${kashi}`;
        document.querySelector("#alizascore").textContent = `${aliza}`;   
    })
        .catch(error => {
        console.error("Error getting scores: ", error);
    });

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


      

    flipBtn.addEventListener("click", () => {
        kashiSelection = document.querySelector('input[name="kashi"]:checked');
        alizaSelection = document.querySelector('input[name="aliza"]:checked');
        document.querySelector("#winner").textContent = ``;
        let i = Math.floor(Math.random() * 2);
        coin.style.animation = "none";


        if(kashiSelection == null || alizaSelection == null){
            document.querySelector("#winner").textContent = `Please select Heads or Tails`;
        } else{

            if (i) {
                setTimeout(function () {
                    coin.style.animation = "spin-heads 3s forwards";
                }, 100);
                if(kashiSelection.value == 'Heads'){
                    winner = 'Kashi';
                    kashi++;
                }else{
                    winner = 'Aliza';
                    aliza++;
                }
            } else {
                setTimeout(function () {
                    coin.style.animation = "spin-tails 3s forwards";
                }, 100);
                if(kashiSelection.value == 'Tails'){
                    winner = 'Kashi';
                    kashi++;
                }else{
                    winner = 'Aliza';
                    aliza++;
                }
            }
            setTimeout(updateStats, 3000);
            disableButton();
            updateScores();
        }

    });

    function updateScores() {
        fetch("/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ kashi, aliza })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Scores updated successfully: ', data);
        })
        .catch(error => {
            console.error("Error updating scores: ", error);
        });
    }

    function getScores() {
        fetch("/scores")
        .then(response => response.json())
        .then(data => {
            kashi = data.kashi;
            aliza = data.aliza;
            document.querySelector("#kashiscore").textContent = `${kashi}`;
            document.querySelector("#alizascore").textContent = `${aliza}`;   
        })
            .catch(error => {
            console.error("Error getting scores: ", error);
        });
    }
    

    function updateStats() {
        document.querySelector("#winner").textContent = `${winner} is Better`;
        getScores();
        // fetch("/scores.json")
        // .then(response => response.json())
        // .then(data => {
        //     console.log("Scores updated successfully: ", data);
        //     kashi = data.kashi;
        //     aliza = data.aliza;
        //     document.querySelector("#kashiscore").textContent = `${kashi}`;
        //     document.querySelector("#alizascore").textContent = `${aliza}`;   
        // });  
    }

    function disableButton() {
        flipBtn.disabled = true;
        setTimeout(function () {
            flipBtn.disabled = false;
        }, 3000);
    }

    resetBtn.addEventListener("click", () => {
        coin.style.animation = "none";
        document.querySelector("#winner").textContent = ``;
    
        let kashiRadioButtons = document.querySelectorAll('input[name="kashi"]');
        let alizaRadioButtons = document.querySelectorAll('input[name="aliza"]');
        kashiRadioButtons.forEach(button => {
            button.checked = false;
        });
        alizaRadioButtons.forEach(button => {
            button.checked = false;
        });
        aliza = 0;
        kashi = 0;
        document.querySelector("#kashiscore").textContent = `${kashi}`;  
        document.querySelector("#alizascore").textContent = `${aliza}`;           
    });
    

