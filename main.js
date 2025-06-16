import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const loader = new GLTFLoader();
let mixer;

loader.load('/Untitled.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  if (gltf.animations && gltf.animations.length) {
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
  }
}, undefined, console.error);

function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.016);
  controls.update();
  renderer.render(scene, camera);
}
animate();
