let homeButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create a "Go to Home" button
    homeButton = createButton("Home");
    homeButton.position(width / 2 - 75, height / 2 + 50); // Adjust position for larger button
    homeButton.style("padding", "15px 30px"); // Increase padding for a larger button
    homeButton.style("font-size", "20px"); // Increase font size
    homeButton.style("background-color", "#333");
    homeButton.style("color", "#fff");
    homeButton.style("border", "none");
    homeButton.style("border-radius", "10px"); // Slightly larger border radius
    homeButton.style("cursor", "pointer");

    // Add hover effect
    homeButton.mouseOver(() => homeButton.style("background-color", "#555"));
    homeButton.mouseOut(() => homeButton.style("background-color", "#333"));

    // Redirect to home.html when the button is clicked
    homeButton.mousePressed(() => {
        window.location.href = "/index.html"; // Correct path to the topmost index.html
    });
}

function draw() {
    background(255, 204, 204); // Light pink background

    // Display "Level 2 Coming Soon" text
    fill(0); // Black text color
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Level 2 Coming Soon", width / 2, height / 2);
}

// Resize canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Reposition the button when the window is resized
    homeButton.position(width / 2 - 100, height / 2 + 75); // Adjust position for larger button
}