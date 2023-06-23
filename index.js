
const readline = require('readline');

// Create a readline interface
const rdl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Class for the USS Assembly spaceship
class Spaceship {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }

  // Method to attack an alien ship
  attack(alienShip) {
    console.log('USS Assembly attacks an alien ship!');
    if (Math.random() < this.accuracy) {
      console.log('Attack successful! Alien ship takes damage.');
      alienShip.hull -= this.firepower;
    } else {
      console.log('Attack missed! Alien ship evades the attack.');
    }
  }

  // Method to check if the spaceship is destroyed
  isDestroyed() {
    return this.hull <= 0;
  }
}

// Class for an alien ship
class AlienShip {
  constructor() {
    this.hull = getRandomNumber(3, 6);
    this.firepower = getRandomNumber(2, 4);
    this.accuracy = getRandomNumber(0.6, 0.8);
  }

  // Method for the alien ship to attack the spaceship
  attack(spaceship) {
    console.log('An alien ship attacks USS Assembly!');
    if (Math.random() < this.accuracy) {
      console.log('Attack successful! USS Assembly takes damage.');
      spaceship.hull -= this.firepower;
    } else {
      console.log('Attack missed! USS Assembly evades the attack.');
    }
  }

  // Method to check if the alien ship is destroyed
  isDestroyed() {
    return this.hull <= 0;
  }
}

// Helper function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Game logic
function startGame() {
  const spaceship = new Spaceship();
  const alienShips = [];

  // Generate six alien ships
  for (let i = 0; i < 6; i++) {
    alienShips.push(new AlienShip());
  }
  let currentShipIndex = 0;

  // Function to continue the game loop
  function continueGame() {
    currentShipIndex++;

    if (currentShipIndex >= alienShips.length) {
      console.log('Congratulations! You destroyed all the alien ships. You win!');
      rdl.close();
      return;
    }

    const currentShip = alienShips[currentShipIndex];

    // Spaceship attacks the current alien ship
    spaceship.attack(currentShip);

    // Check if the alien ship is destroyed
    if (currentShip.isDestroyed()) {
      console.log('Alien ship destroyed!');

      // Ask the player if they want to attack the next ship or retreat
      rdl.question('Do you want to attack the next ship or retreat? Enter "attack" or "retreat": ', (userInput) => {
        if (userInput.toLowerCase() === 'retreat') {
          console.log('Game over. You retreated!');
          rdl.close();
        } else {
          // Continue the game loop
          continueGame();
        }
      });
    } else {
      // Alien ship attacks the spaceship if it's still alive
      currentShip.attack(spaceship);

      // Check if the spaceship is destroyed
      if (spaceship.isDestroyed()) {
        console.log('USS Assembly destroyed! Game over.');
        rdl.close();
        return;
      }

      // Continue the game loop
      continueGame();
    }
  }

  // Start the game loop
  continueGame();
}

startGame();