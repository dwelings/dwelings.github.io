let scene, camera, renderer, car;
let speed = 0;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a simple car (a cube for demonstration)
    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    car = new THREE.Mesh(geometry, material);
    scene.add(car);

    camera.position.z = 5;

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event) {
    if (event.key === 'ArrowUp') speed = 0.1;
    if (event.key === 'ArrowDown') speed = -0.1;
    if (event.key === 'ArrowLeft') car.rotation.y += 0.05;
    if (event.key === 'ArrowRight') car.rotation.y -= 0.05;
}

function onKeyUp(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') speed = 0;
}

function animate() {
    requestAnimationFrame(animate);
    car.position.z += speed;
    renderer.render(scene, camera);
}
