const THREE = require('three')

const scene = new THREE.Scene()
//scene.background = new THREE.Color( 0xa9a9a9 );

import {noise} from 'perlin'

const font = new THREE.Font();

let text

var fontLoader = new THREE.FontLoader();
fontLoader.load('src/helvetiker_bold.typeface.json',function(tex){
    var  textGeo = new THREE.TextGeometry('The sky was the color of a TV tuned to a dead channel', {
            size: 5,
            height: 5,
            curveSegments: 6,
            font: tex,
    });
    var  color = new THREE.Color();
    color.setRGB(255, 250, 250);
    var  textMaterial = new THREE.MeshPhongMaterial( { ambient: 0xf00fff, color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )
    text = new THREE.Mesh(textGeo , textMaterial);
    scene.add(text)
    console.log(text)


  })


var light = new THREE.DirectionalLight( 0xffffff )
light.position.set( 40, 250, 10 )
light.castShadow = true
scene.add(light)


var light2 = new THREE.DirectionalLight( 0xffffff )
light.position.set( -40, -250, 10 )
light.castShadow = true
scene.add(light2)
//
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 400, 100, 100 );

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
var material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );

var material2 = new THREE.MeshPhongMaterial( { ambient: 0xf00fff, color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )

var material3 = new THREE.MeshPhongMaterial( { ambient: 0xf00fff, color: 0xf22fff, specular: 0x000FF0 , shininess: 100, side: THREE.DoubleSide } )

var material4 = new THREE.MeshPhongMaterial( { ambient: 0xf00fff, color: 0x4AF262, specular: 0xffffff , shininess: 100, side: THREE.DoubleSide } )

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 )
camera.position.z = 70









var geometry5 = new THREE.BoxGeometry( 10, 70, 30,40,40 );

var geometry6 = new THREE.BoxGeometry( 30, 20, 10,80,40 );

var geometry2 = new THREE.PlaneGeometry( 200, 500, 200,200 );

var geometry4 = new THREE.PlaneGeometry( 200, 200, 200,200 );

var geometry3 =  new THREE.SphereGeometry(0.1, 128, 128);

var sphere = new THREE.Mesh(geometry5, material3);

var sphere2 = new THREE.Mesh(geometry5, material2);

var sphere3 = new THREE.Mesh(geometry6, material4);
// console.log(sphere)
// console.log(sphere2)

scene.add(sphere)


var update = function() {

  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.0005
  //console.log(time)

  //go through vertices here and reposition them

  // change 'k' value for more spikes
  var k = 2;
  var sp = 1;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
    var p = sphere.geometry.vertices[i];
    p.normalize().multiplyScalar(1 + 0.6 * noise.perlin3(p.x * k + time, p.y * sp, p.z * k));
  }
  for (var j = 0; j < sphere2.geometry.vertices.length; j++) {
    var o = sphere2.geometry.vertices[j]
    o.normalize().multiplyScalar(1 + 1.8 * noise.perlin3(o.x * k + time, o.y * k, o.z * k))
  }

  for (var l = 0; l < sphere3.geometry.vertices.length; l++) {
    var n = sphere3.geometry.vertices[l];
    n.normalize().multiplyScalar(1 + 0.6 * noise.perlin3(n.x * sp + time, n.y * sp, n.z * sp))
  }


  var points = [];
  for ( var d = 0; d < 82; d ++ ) {
  	points.push( new THREE.Vector2( Math.sin( d * 0.3 ) * 10 + 5, ( d - 3 ) * 12 ) );
  }
  var geometry5 = new THREE.LatheGeometry( points );

  var lathe = new THREE.Mesh( geometry5, material3 );
//  scene.add( lathe );


  var sp = 19;
  for (var qw = 0; qw < lathe.geometry.vertices.length; qw++) {
    var po = lathe.geometry.vertices[qw];
    po.normalize().multiplyScalar(1 + 9.6 * noise.perlin3(po.x * sp + time, po.y * sp, po.z * sp));
  }



//  console.log(lathe)



sphere.geometry.computeVertexNormals()
sphere.geometry.normalsNeedUpdate = true
sphere.geometry.verticesNeedUpdate = true


sphere2.geometry.computeVertexNormals()
sphere2.geometry.normalsNeedUpdate = true
sphere2.geometry.verticesNeedUpdate = true

sphere3.geometry.computeVertexNormals()
sphere3.geometry.normalsNeedUpdate = true
sphere3.geometry.verticesNeedUpdate = true

lathe.geometry.computeVertexNormals()
lathe.geometry.normalsNeedUpdate = true
lathe.geometry.verticesNeedUpdate = true

}

function animate() {
sphere.scale.x += 0.01;
sphere.scale.y += 0.01;
sphere.scale.z += 0.01;
sphere.position.x -= 0.01;
   // sphere2.rotation.x -= 0.02;
   // sphere3.rotation.z += 0.01;
   // sphere3.rotation.x -= 0.01;

  scene.rotation.y -= 0.01;
 // scene.rotation.z -= 0.001;


  update();
  /* render scene and camera */
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


requestAnimationFrame(animate);
