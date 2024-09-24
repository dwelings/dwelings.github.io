let scene, camera, renderer, car;
let speed = 0;
let maxSpeed = 0.1;
let turningSpeed = 0.05;
let isMovingForward = false;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a simple car (a cube for demonstration)
    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    car = new THREE.Mesh(geometry, material);
    scene.add(car);

    camera.position.set(0, 1, 5);
    camera.lookAt(car.position);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Add a simple ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add(ground);
}

function onKeyDown(event) {
    switch (event.key) {
        case 'w':
            isMovingForward = true; // Start moving forward
            break;
        case 'a':
            if (!isMovingForward) {
                car.rotation.y += turningSpeed; // Turn left
            }
            break;
        case 'd':
            if (!isMovingForward) {
                car.rotation.y -= turningSpeed; // Turn right
            }
            break;
        case 's':
            isMovingForward = false; // Stop moving forward
            break;
    }
}

function onKeyUp(event) {
    if (event.key === 'w') {
        isMovingForward = false; // Stop moving when W is released
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (isMovingForward) {
        car.position.x += Math.sin(car.rotation.y) * maxSpeed;
        car.position.z += Math.cos(car.rotation.y) * maxSpeed;
    }

    camera.position.x = car.position.x;
    camera.position.z = car.position.z + 5; // Follow the car
    camera.position.y = 2; // Keep the camera elevated
    camera.lookAt(car.position);

    renderer.render(scene, camera);
}
