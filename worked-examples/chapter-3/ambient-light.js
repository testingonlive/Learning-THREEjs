function init() {
    
    var stats = initStats();
    
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1e3 );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( new THREE.Color( 0xEEEEEE, 1 ) );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    
    var planeGeometry = new THREE.PlaneGeometry( 60, 20, 1, 1 );
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.receiveShadow = true;
    
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    
    scene.add( plane );
    
    var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    cube.castShadow = true;
    
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    
    scene.add( cube );
    
    var sphereGeometry = new THREE.SphereGeometry( 4, 20, 20 );
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
    });
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;
    
    scene.add( sphere );
    
    camera.position.x = -25;
    camera.position.y = 30;
    camera.position.z = 25;
    camera.lookAt( new THREE.Vector3( 10, 0, 0 ) );
    
    var ambiColor = '#0c0c0c';
    var ambientLight = new THREE.AmbientLight( ambiColor );
    
    scene.add( ambientLight );
    
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    
    scene.add( spotLight );
    
    document.getElementById( 'WebGL-output' ).appendChild( renderer.domElement );
    
    var step = 0;
    
    var controls = new function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.disableSpotlight = false;
    }
    
    var gui = new dat.GUI();
    gui.addColor( controls, 'ambientColor' ).onChange(function( e ) {
        ambientLight.color = new THREE.Color( e );
    });
    gui.add( controls, 'disableSpotlight' ).onChange(function( e ) {
        spotLight.visible = !e;
    });
    
    render();
    
    function render() {
        stats.update();
        
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        
        step += controls.bouncingSpeed;
        
        sphere.position.x = 20 + ( 10 * ( Math.cos( step ) ) );
        sphere.position.y = 2 + ( 10 * Math.abs( Math.sin( step ) ) );
        
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
    
    function initStats() {
        
        var stats = new Stats();
        
        stats.setMode( 0 );
        
        stats.domElement.style.postion = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        
        document.getElementById( 'Stats-output' ).appendChild( stats.domElement );
        
        return stats;
    }
    
}



















