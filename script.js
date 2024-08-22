
let totalPeople = 1000;
let remainingPeople = totalPeople;
let removedPeople = 0;

let flipButtonCount = 0;
let headButtonCount = 0;
let tailButtonCount = 0;

const peopleContainer = document.getElementById('people-container');

const peopleEmojis = ['🧍', '🧍‍♂️', '🧍‍♀️'];

function createPeople() {
    peopleContainer.innerHTML = ''; // Clear existing people
    for (let i = 0; i < totalPeople; i++) {
        const personDiv = document.createElement('div');
        personDiv.className = 'person';
        const personEmoji = peopleEmojis[i % 3];
        personDiv.innerHTML = personEmoji + '<div class="coin">C</div>';
        peopleContainer.appendChild(personDiv);
    }
}

function flipCoins() {
    flipButtonCount++;
    document.getElementById('flip-count').textContent = flipButtonCount;

    let headCount = 0;
    let tailCount = 0;

    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        const flipResult = Math.random() < 0.5 ? 'H' : 'T';
        coin.textContent = flipResult;
        if (flipResult === 'H') {
            headCount++;
        } else {
            tailCount++;
        }
    });

    document.getElementById('head-count').textContent = headCount;
    document.getElementById('tail-count').textContent = tailCount;
}

function filterByHead() {
    headButtonCount++;
    document.getElementById('head-press-count').textContent = headButtonCount;

    const coins = document.querySelectorAll('.coin');
    let headCount = 0;
    let removedCount = 0;

    coins.forEach(coin => {
        if (coin.textContent === 'T') {
            coin.parentElement.remove();
            removedCount++;
        } else {
            headCount++;
        }
    });

    remainingPeople -= removedCount;
    removedPeople += removedCount;

    document.getElementById('people-left').textContent = remainingPeople;
    document.getElementById('people-removed').textContent = removedPeople;
}

function filterByTail() {
    tailButtonCount++;
    document.getElementById('tail-press-count').textContent = tailButtonCount;

    const coins = document.querySelectorAll('.coin');
    let tailCount = 0;
    let removedCount = 0;

    coins.forEach(coin => {
        if (coin.textContent === 'H') {
            coin.parentElement.remove();
            removedCount++;
        } else {
            tailCount++;
        }
    });

    remainingPeople -= removedCount;
    removedPeople += removedCount;

    document.getElementById('people-left').textContent = remainingPeople;
    document.getElementById('people-removed').textContent = removedPeople;
}

function resetExperiment() {
    remainingPeople = totalPeople;
    removedPeople = 0;

    flipButtonCount = 0;
    headButtonCount = 0;
    tailButtonCount = 0;

    document.getElementById('head-count').textContent = 0;
    document.getElementById('tail-count').textContent = 0;
    document.getElementById('people-left').textContent = totalPeople;
    document.getElementById('people-removed').textContent = 0;

    document.getElementById('flip-count').textContent = 0;
    document.getElementById('head-press-count').textContent = 0;
    document.getElementById('tail-press-count').textContent = 0;

    createPeople();
}

// Initialize the experiment with 1000 people
createPeople();
