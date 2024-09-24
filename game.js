const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let car;
let cursors;

function preload() {
    this.load.image('car', 'path/to/car.png'); // Load your car image
    this.load.image('track', 'path/to/track.png'); // Load your track image
}

function create() {
    this.add.image(400, 300, 'track'); // Add track background
    car = this.physics.add.image(400, 500, 'car');
    car.setDamping(true);
    car.setDrag(100); // Drag for the car
    car.setMaxVelocity(200); // Maximum speed

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.up.isDown) {
        this.physics.accelerateToObject(car, { x: car.x, y: car.y - 50 }, 200, 100, 200);
    }
    if (cursors.left.isDown) {
        car.angle -= 2; // Turn left
    }
    if (cursors.right.isDown) {
        car.angle += 2; // Turn right
    }
    if (cursors.down.isDown) {
        this.physics.accelerateToObject(car, { x: car.x, y: car.y + 50 }, 200, 100, 200);
    }

    // Keep the car on the track
    if (car.y < 0) car.y = 0;
    if (car.y > 600) car.y = 600;
    if (car.x < 0) car.x = 0;
    if (car.x > 800) car.x = 800;
}
