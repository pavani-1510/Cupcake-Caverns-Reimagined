// Game variables
let playerImg; // Variable to hold the player image
let player;
const gravity = 0.5; // Gravity force
let platforms = []; // Array to store floating platforms
let showWinPopup = false; // Flag to show the win popup
let popupAlpha = 0; // Transparency for the popup animation

// Preload assets
function preload() {
    playerImg = loadImage("src/assets/player.png"); // Load the player image
}

// Setup the game
function setup() {
    createCanvas(windowWidth, windowHeight);
    player = new Player();

    // Define floating platforms (x, y, width, height)
    platforms = [
        { x: 0, y: height - 10, width: 200, height: 30 },
        { x: 300, y: height - 250, width: 250, height: 20 },
        { x: 700, y: height - 600, width: 200, height: 20 },
        { x: 1200, y: height - 150, width: 250, height: 50 },
        { x: 1500, y: height - 500, width: 200, height: 20 },
        { x: 1850, y: height - 800, width: 250, height: 30 },
        { x: 2300, y: height - 1000, width: 200, height: 20 },
        { x: 2500, y: height - 600, width: 250, height: 10 }, // Last platform
    ];
}

// Draw the game frame
function draw() {
    background(255, 204, 204); // Light pink background
    drawCandyTheme();

    // Draw floating platforms
    fill(139, 69, 19); // Brown color for platforms
    for (let platform of platforms) {
        rect(platform.x, platform.y, platform.width, platform.height);
    }

    player.update();
    player.display();

    // Check if the player has fallen off the screen
    if (player.y > height) {
        // Redirect to another HTML page
        window.location.href = "src/gameover.html"; // Replace with your desired HTML page
    }

    // Show the win popup if the player reaches the last platform
    if (showWinPopup) {
        displayWinPopup();
    }
}

// Player class
class Player {
    constructor() {
        this.x = 60;
        this.y = height - 100; // Start above the ground
        this.size = 200; // Size of the player
        this.ySpeed = 0; // Vertical speed
        this.onGround = false; // Check if player is on the ground
    }

    update() {
        // Apply gravity
        this.ySpeed += gravity;
        this.y += this.ySpeed;

        // Check for platform collision
        this.onGround = false;
        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            if (
                this.x + this.size / 2 > platform.x &&
                this.x - this.size / 2 < platform.x + platform.width &&
                this.y + this.size / 2 >= platform.y &&
                this.y + this.size / 2 <= platform.y + platform.height
            ) {
                this.y = platform.y - this.size / 2;
                this.ySpeed = 0;
                this.onGround = true;

                // Check if the player is on the last platform
                if (i === platforms.length - 1) {
                    showWinPopup = true; // Trigger the win popup
                }
            }
        }

        // Horizontal movement
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;

        // Jumping
        if (keyIsDown(32) && this.onGround) {
            this.ySpeed = -20; // Jump force
        }

        // Constrain player within canvas
        this.x = constrain(this.x, 0, width);
    }

    display() {
        imageMode(CENTER); // Set image mode to center

        // Save the current drawing state
        push();

        // Check if the player is moving left
        if (keyIsDown(LEFT_ARROW)) {
            // Flip the image horizontally
            translate(this.x, this.y);
            scale(-1, 1); // Flip horizontally
            image(playerImg, 0, 0, this.size, this.size);
        } else {
            // Draw the image normally
            image(playerImg, this.x, this.y, this.size, this.size);
        }

        // Restore the previous drawing state
        pop();
    }
}

// Function to display the win popup
function displayWinPopup() {
    popupAlpha += 5; // Gradually increase the transparency
    if (popupAlpha > 255) popupAlpha = 255; // Cap the transparency at 255

    fill(255, 182, 193, popupAlpha); // Pink background with transparency
    rectMode(CENTER);
    rect(width / 2, height / 2, 400, 200, 20); // Rounded rectangle

    fill(0, 0, 0, popupAlpha); // White text with transparency
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Hurray! You Won!", width / 2, height / 2);
}

// Simplified candy-themed background
function drawCandyTheme() {
    // Draw static candy-themed decorations (optional)
    fill(255, 182, 193); // Light pink frosting
    // rect(50, 50, 100, 50); // Example static decoration
}

// Resize canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}