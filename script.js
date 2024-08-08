let button = document.querySelector('button');
let fname = document.querySelector('.fname');
let lname = document.querySelector('.lname');
let country = document.querySelector('.country');
let score = document.querySelector('.score');
let container = document.querySelector('.container');
let playerList = [];

button.addEventListener('click', function (e) {
    e.preventDefault();
    if (fname.value === "" || lname.value === "" || score.value === "" || country.value === "") {
        alert("Please fill in all fields");
    } else {
        let Mdate = new Date();
        let a = Mdate.getDate();
        let b = Mdate.getMonth() + 1; // getMonth returns 0-based index
        let c = Mdate.getFullYear();
        
        let player = {
            name: `${fname.value} ${lname.value}`,
            country: country.value,
            date: `${a}-${b}-${c}`,
            score: parseInt(score.value) // Ensure score is a number
        };
        
        playerList.push(player);
        updateData();
        clearInputs();
    }
});

function clearInputs() {
    fname.value = "";
    lname.value = '';
    country.value = "";
    score.value = "";
}

function updateData() {
    if (playerList.length > 0) {
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
    container.innerHTML = '';
    playerList.sort((player1, player2) => player2.score - player1.score);
    
    playerList.forEach((item) => {
        let main = document.createElement("div");
        main.classList.add('player-card');

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let div4 = document.createElement("div");
        div4.classList.add('actions');

        let del = document.createElement("div");
        let inc = document.createElement("div");
        let dec = document.createElement("div");

        del.innerHTML = `<i class="bi bi-trash"></i>`;
        inc.innerText = "+5";
        dec.innerText = "-5";

        div1.innerText = `${item.name}\n${item.date}`;
        div2.innerText = item.country;
        div3.innerText = item.score;

        div4.appendChild(del);
        div4.appendChild(inc);
        div4.appendChild(dec);

        main.appendChild(div1);
        main.appendChild(div2);
        main.appendChild(div3);
        main.appendChild(div4);

        container.appendChild(main);

        // Delete player
        del.addEventListener('click', function () {
            const index = playerList.indexOf(item);
            if (index !== -1) {
                playerList.splice(index, 1);
                updateData();
            }
        });

        // Decrease score
        dec.addEventListener('click', function () {
            item.score -= 5;
            if (item.score >= 0) {
                updateData();
            } else {
                alert("Score can't be negative");
                item.score += 5; // revert the change
            }
        });

        // Increase score
        inc.addEventListener('click', function () {
            item.score += 5;
            updateData();
        });
    });
}
