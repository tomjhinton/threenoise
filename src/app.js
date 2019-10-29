const THREE = require('three')

const scene = new THREE.Scene()

import {noise} from 'perlin'


var light = new THREE.DirectionalLight( 0xffffff )
light.position.set( 0, -25, 10 )
light.castShadow = true
scene.add(light)
//
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 200, 10000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
spotLight.penumbra = 0.200

scene.add( spotLight );


var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


var material2 = new THREE.MeshPhongMaterial( { ambient: 0xf00fff, color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

var material3 = new THREE.MeshPhongMaterial( { ambient: 0xf00fff, color: 0xf22fff, specular: 0x000FF0 , shininess: 100, side: THREE.DoubleSide } )

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 )
camera.position.z = 8


var geometry = new THREE.PlaneGeometry( 500, 200, 820 );

var geometry2 = new THREE.PlaneGeometry( 200, 500, 820 );

var geometry3 = new THREE.PlaneGeometry( 200, 500, 820 );

var material = new THREE.MeshNormalMaterial()

var sphere = new THREE.Mesh(geometry, material2);

var sphere2 = new THREE.Mesh(geometry2, material3);

var sphere3 = new THREE.Mesh(geometry3, material2);

scene.add(sphere, sphere2, sphere3);


var update = function() {

  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.002
  //console.log(time)

  //go through vertices here and reposition them

  // change 'k' value for more spikes
  var k = 500;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
    var p = sphere.geometry.vertices[i];
    p.normalize().multiplyScalar(1 + 2.6 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
  }
  for (var i = 0; i < sphere2.geometry.vertices.length; i++) {
    var o = sphere2.geometry.vertices[i];
    o.normalize().multiplyScalar(1 + 2.6 * noise.perlin3(o.x * k + time, o.y * k, o.z * k));
  }


sphere.geometry.computeVertexNormals()
sphere.geometry.normalsNeedUpdate = true
sphere.geometry.verticesNeedUpdate = true


sphere2.geometry.computeVertexNormals()
sphere2.geometry.normalsNeedUpdate = true
sphere2.geometry.verticesNeedUpdate = true


}

function animate() {
   sphere.rotation.x += 0.01;
   sphere2.rotation.x -= 0.02;
   // sphere.rotation.y += 0.01;
   // sphere.rotation.z += 0.01;

  update();
  /* render scene and camera */
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


requestAnimationFrame(animate);
