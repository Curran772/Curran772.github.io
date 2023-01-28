/*
 * To run this, you have to be IN the portfolio folder
 * Then you have to use one of the following commands:
 * npx vite dev : starts dev server for website
 * npx vite build : builds a production version of the website
 * or npx vite preview : views the production version of the website
 */
import './style.css';
import spaceUrl from './space2.jpg'
import curranUrl from './Curran.jpg'
import moonUrl from './moon.png'
import moonNormUrl from './moonNormal.png'
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

// T O R U S

const geometry = new THREE.TorusGeometry(12, 2, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x263238 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5,5);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight);

// Adds stars to the scene

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)

// Background

const spaceTexture = new THREE.TextureLoader().load(spaceUrl);
scene.background = spaceTexture;

// Curran

const curranTexture = new THREE.TextureLoader().load(curranUrl);
const curran = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: curranTexture })
);

scene.add(curran);

// DA MOON
const moonTexture = new THREE.TextureLoader().load(moonUrl);
const moonNormalTexture = new THREE.TextureLoader().load(moonNormUrl);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moonNormalTexture,
    })
);

scene.add(moon);

moon.position.z = 23;
moon.position.setX(-13);

curran.position.z = -5;
curran.position.x = 2;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.01;
    moon.rotation.y += 0.0125;
    moon.rotation.z += 0.01;

    curran.rotation.y += 0.01;
    curran.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.001;
    torus.rotation.y += 0.0005;
    torus.rotation.z += 0.001;

    moon.rotation.x += 0.0025;

    renderer.render(scene, camera);
}

animate();