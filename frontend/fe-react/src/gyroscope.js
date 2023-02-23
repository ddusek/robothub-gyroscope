import * as THREE from 'three';

export function prepareScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    const geometry = new THREE.BoxGeometry( 0.5, 1, 2 );
    const material = new THREE.MeshBasicMaterial( { color: 0x094ee3 } );
    const cube = new THREE.Mesh( geometry, material );
    
    scene.add( cube );

    const edges = new THREE.EdgesGeometry( geometry );
    var material2 = new THREE.LineBasicMaterial( { color: 0xffffff } );
    var wireframe = new THREE.LineSegments( edges, material2 );
    cube.add( wireframe );
    
    const points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 1 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 10, 0, -1 ) );

    const geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry2, material2 );
    cube.add( line )

    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 1;
    document.body.appendChild( renderer.domElement );
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    window.robothubApi.onNotification(n => {
        if (n.payload.id == "gyroscope-xyz") {
            const degreesY = n.payload.value.y * 9;
            let degreesZ = n.payload.value.z * 9;
            let radianZ = degreesZ * (Math.PI / 180);
            let radianY = degreesY * (Math.PI / 180);
            cube.rotation.z = -radianZ;
            cube.rotation.x = -radianY;
        }
    })
    animate();
}
