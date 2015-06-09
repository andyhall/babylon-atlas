// globals BABYLON


// set up standard sort of scene
var vec3 = BABYLON.Vector3
var cv = document.getElementById('canvas')
var engine = new BABYLON.Engine(cv)
var scene =  new BABYLON.Scene(engine)
scene.clearColor = new BABYLON.Color3(0.8, 0.85, 0.9)
var camera = new BABYLON.ArcRotateCamera('camera', -1, 1.2, 6, new vec3(0,1,0), scene)
var light = new BABYLON.HemisphericLight('light', new vec3(0.1,1,0.3), scene )
camera.attachControl(cv)
var plane = BABYLON.Mesh.CreateGround('ground', 5, 5, 1, scene)


// atlas constructor
var createAtlas = require('../')

// make an atlas for a given image+JSON
var myAtlas = createAtlas('sprites.png', 'sprites.json', scene, BABYLON)

var mesh = myAtlas.makeSpriteMesh()
mesh.position.y = 1.2
mesh.scaling.x = 1.5
mesh.scaling.y = 2


// in this demo sprites need full alpha - not true of all textures
mesh.material.opacityTexture = mesh.material.diffuseTexture


// cycle through frames
var num = 0
setInterval(function() {
  if (!myAtlas.frames.length) return // json not loaded yet
  num = (num+1) % myAtlas.frames.length
  
  myAtlas.setMeshFrame(mesh, myAtlas.frames[num])
  // or just: myAtlas.setMeshFrame(mesh, num)
}, 500)



// make a second and third mesh from the same atlas
var mesh2 = myAtlas.makeSpriteMesh( 'sprites instance 10003' )
mesh2.position.y = 1.2
mesh2.position.z = 1
mesh2.position.x = 1

var mesh3 = myAtlas.makeSpriteMesh( 'sprites2 instance 10001' )
mesh3.position.y = .8
mesh3.position.z = -1
mesh3.position.x = -1



// render the scene
function render() {
  scene.render()
  requestAnimationFrame(render)
}
render()
