const wordsBefore = [];
const wordsAfter = [];

let guesses = 0;

async function getWords() {
    try {
        const response = await fetch("words.txt");
        const text = await response.text();

        // relic of when i used a big massive text file,
        // but there is no need to change it with the current list
        return text.split("\n").filter(word => word.length === 5);
    } catch (error) {
        console.error("Error getting words: ", error);
        return [];
    }
}

async function initaliseGame() {
    const words = await getWords();

    if (words.length > 0) {
        const chosenWord = words[Math.floor(Math.random() * words.length)];

        // once a word is chosen, make it a global variable
        window.chosenWord = chosenWord;
    } else {
        console.error("No valid words were found.");
    }
}

function checkGuess() {
    const userInput = document.getElementById("userInput").value.toLowerCase();

    if (userInput.length === 5) {
        if (userInput < window.chosenWord) {
            wordsBefore.push(userInput);
            updateReminderList("incorrectWordsList", wordsBefore, "before");

            displayResult("Your word is alphabetically before the chosen word. 🔼");
        } else if (userInput > window.chosenWord) {
            wordsAfter.push(userInput);
            updateReminderList("incorrectWordsList", wordsAfter, "after");

            displayResult("Your word is alphabetically after the chosen word. 🔽");
        } else {
            displayResult("You guessed the correct word! ✅");
        }
    } else if (userInput == "lexi") {
        // because i love her, duh
        displayResult("I love you! 💗");
    } else {
        displayResult("Not a five letter word! ❌");
    }

    if ((wordsBefore.length > 0 || wordsAfter.length > 0)) {
        document.getElementById("reminderContainer").style.display = "block";
    }

    guesses++;

    if (guesses > 4) {
        displayHint();
    }
}

function updateReminderList(listId, words, position) {
    const listContainer = document.getElementById(listId);
    const listItem = document.createElement("li");

    listItem.style.fontStyle = "italic";
    listItem.textContent = `${words[words.length - 1]} (${position})`;

    listContainer.appendChild(listItem);
}

function displayHint() {
    const hintContainer = document.getElementById("hintContainer");
    const hintText = document.getElementById("hintText");

    hintContainer.style.display = "block";
    hintText.innerHTML = `<em>Hint!</em> The word is ${chosenWord.charAt(0)} ... ${chosenWord.charAt(4)}`;
}

function displayResult(result) {
    document.getElementById("result").textContent = result;
}

// initalise game when page loads
window.onload = initaliseGame;