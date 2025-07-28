// Game variables
let playerImg; // Variable to hold the player image
let player;
const gravity = 0.5; // Gravity force
let platforms = []; // Array to store floating platforms
let snowflakes = []; // Array to store snowflakes

// Preload assets
function preload() {
    // Update the path to player.png to reflect the new location of level1.js
    playerImg = loadImage("../../assets/player.png");
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
    clear(); // Clear the canvas to prevent trails

    // Draw snowfall
    drawSnowfall();

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
        // Redirect to the game over page using an absolute path
        window.location.href = "/Cupcake-Caverns-Reimagined/src/gameover.html"
    }
}

// Function to draw snowfall
function drawSnowfall() {
    // Add new snowflakes
    if (frameCount % 5 === 0) {
        snowflakes.push({
            x: random(width), // Random x position
            y: 0, // Start at the top
            size: random(8,11), // Random size
            speed: random(1, 3), // Random falling speed
        });
    }

    // Draw and update snowflakes
    for (let i = snowflakes.length - 1; i >= 0; i--) {
        let snowflake = snowflakes[i];
        fill(255); // White color for snowflakes
        noStroke();
        ellipse(snowflake.x, snowflake.y, snowflake.size);

        // Update snowflake position
        snowflake.y += snowflake.speed;

        // Remove snowflake if it goes off the screen
        if (snowflake.y > height) {
            snowflakes.splice(i, 1);
        }
    }
}

// Player class
class Player {
    constructor() {
        this.x = 60;
        this.y = height - 100; // Start above the ground
        this.width = 105; // Width of the player
        this.height = 150; // Height of the player
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
                this.x + this.width / 2 > platform.x &&
                this.x - this.width / 2 < platform.x + platform.width &&
                this.y + this.height / 2 >= platform.y &&
                this.y + this.height / 2 <= platform.y + platform.height
            ) {
                this.y = platform.y - this.height / 2;
                this.ySpeed = 0;
                this.onGround = true;

                // Check if the player is on the last platform
                if (i === platforms.length - 1) {
                    // Redirect to level2.html
                    window.location.href = "../l2/level2.html"; // Update path to level2.html
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
            image(playerImg, 0, 0, this.width, this.height);
        } else {
            // Draw the image normally
            image(playerImg, this.x, this.y, this.width, this.height);
        }

        // Restore the previous drawing state
        pop();
    }
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
