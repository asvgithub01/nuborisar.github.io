// <!--
// * Copyright (c) 2019 XZIMG Limited , All Rights Reserved
// * No part of this software and related documentation may be used, copied,
// * modified, distributed and transmitted, in any form or by any means,
// * without the prior written permission of xzimg
// *
// * contact@xzimg.com, www.xzimg.com
// * DO NOT SHARE - DO NOT REPRODUCE - DO NOT USE IN COMMERCIAL PROJECTS
// -->

/// ThreeJS initialization
function initThreeJs() {

    mirror = true;
    // scene
    scene = new THREE.Scene();
    console.log("Three.js w/h" + canvasElement.width + " " + canvasElement.height);
    var down_ratio = 1.0;
    var screenWidth = canvasElement.width * down_ratio;
    var screenHeight = canvasElement.height * down_ratio;


    camera = new THREE.PerspectiveCamera(fovy, screenWidth / screenHeight, 0.1, 100);
    camera.position.set(0, 0, 0);
    scene.add(camera);

    var ambient = new THREE.AmbientLight(0x101030);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };

    // Prepare a cube and add to the scene
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    for (var i = 0; i < geometry.faces.length; i += 2) {

        var hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);

    }
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    for (var i = 0; i < 8; i ++) {
        cubes[i] = new THREE.Mesh(geometry, material);
        scene.add(cubes[i]);
    }


    var face_geometry = new THREE.BufferGeometry();
    var vertices_1d = [].concat(...obj_container.vertices);
    var vertices = new Float32Array(vertices_1d);

    var faces_1d = [].concat(...obj_container.faces);
    var faces = new Uint16Array(faces_1d);

    
    var uv_ids_1d = [].concat(...obj_container.uv_ids);
    var uv_ids = new Uint16Array(uv_ids_1d);
    
    var uvs_1d = [].concat(...obj_container.uvs)
    var uvs = new Float32Array(uvs_1d); // convert strings into values
    var uvs_final = new Float32Array(uvs_1d.length);
    if (mirror)
    {
        // first transform uv idx
        for (var k=0; k<uv_ids.length; k++)
        {
            uv_id = uv_ids[k];
            uv_x = uvs[2*uv_id];
            uv_y = uvs[2*uv_id+1];
            vert_id = faces[k];
            uvs_final[2*vert_id] = uv_x;
            uvs_final[2*vert_id+1] = uv_y;

        }

        for (var i=0; i<faces.length; i+=3)
        {
            var id = faces[i];
            faces[i] = faces[i+1];
            faces[i+1] = id;

        }
      
        for (var k=0; k<vertices.length; k+=3)
        { 
            vertices[k] = -vertices[k];
        }
    }


    face_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 )) ;
    face_geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs_final, 2 ) );
    face_geometry.setIndex(new THREE.BufferAttribute(faces, 1));

    face_geometry.computeBoundingSphere();
    face_geometry.computeBoundingBox();
    face_geometry.computeFaceNormals();
    face_geometry.computeVertexNormals();

    
    var texture = new THREE.TextureLoader().load( 'frenchflag.png' );
    var face_material_tex = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );

    face_object = new THREE.Mesh( face_geometry, face_material_tex); //face_material );
    scene.add(face_object);
    
    console.log("setSize w/h" + glcanvas.width + " " + glcanvas.height);
    renderer = new THREE.WebGLRenderer({ canvas: glcanvas, alpha: true });
    renderer.setViewport(0, 0, screenWidth, screenHeight);
    //renderer.setSize(screenWidth, screenHeight);

    // -- Video plane recovering previous canvas (optional)
    videoTexture = new THREE.Texture(canvasElement);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    var movieMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide }); //

    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    var videoPlaneDist = 90;
    var fovx = 2.0 * Math.atan(Math.tan((fovy / 2.0) * 3.1415 / 180.0) * canvasElement.width / canvasElement.height) * 180.0 / 3.1415;
    var sx = Math.tan(fovx * (3.1415 / 180.0) / 2.0) * videoPlaneDist;
    var sy = sx * canvasElement.height / canvasElement.width;
    
    var movieGeometry = new THREE.PlaneGeometry(sx * 2.0, sy * 2.0, 1, 1);
    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
    movieScreen.position.set(0, 0, -videoPlaneDist);
    movieScreen.rotation.set(0, 3.1415, 0);
    scene.add(movieScreen);
}