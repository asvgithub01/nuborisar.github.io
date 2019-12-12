// <!--
// * Copyright (c) 2019 XZIMG Limited , All Rights Reserved
// * No part of this software and related documentation may be used, copied,
// * modified, distributed and transmitted, in any form or by any means,
// * without the prior written permission of xzimg
// *
// * contact@xzimg.com, www.xzimg.com
// * DO NOT SHARE - DO NOT REPRODUCE - DO NOT USE IN COMMERCIAL PROJECTS
// -->

// -- Classifier Parsing and Loading
function initializeTracking() {

    var oReq = new XMLHttpRequest();
    oReq.open("GET", "./models-68-BS-2.cl.zip", true);
    oReq.addEventListener("progress", updateProgress);
    

    oReq.responseType = "arraybuffer";
    oReq.onload = function (oEvent) {
        var arrayBuffer = oReq.response;
        if (arrayBuffer) {
            // first decompress
            //var zip = new JSZip();
            JSZip.loadAsync(arrayBuffer).then(
                function(content) {


                    Object.keys(content.files).forEach(function (filename) {
                        data = content.files[filename];
                        //console.log(data);
                        content.files[filename].async('arraybuffer').then(function (fileData) {
                          console.log(fileData) // These are your file contents   

                    var byteArray = new Uint8Array(fileData);
                    var sizeClassifier = byteArray.byteLength;
                    var bufClassifier = Module._malloc(sizeClassifier);
                    Module.HEAPU8.set(byteArray, bufClassifier);


                    //class xmgInitParams
                    //{
                    //	int m_3DFacialFeatures;
                    //	int m_processingWidth;
                    //	int m_processingHeight;
                    //	int m_nbFacialFeatures;
                    //	int m_nbMaxFaceObjects;
                    //	float m_fovVerticalDegree;
                    //	int m_detectEyePupils;
                    //  int m_detectExpressions;
                    //	xmgInternalVideoCaptureOptions *m_videoCaptureOptions;
                    //};

                    bufferInitParams = Module._malloc(13*4);
                    var m_3DFacialFeatures = 1;
                    var m_processingWidth = videoElement.videoWidth;
                    var m_processingHeight = videoElement.videoHeight;
                    var m_nbFacialFeatures = num_landmarks;
                    var m_nbMaxFaceObjects = 1;
                    var m_fovVerticalDegree = fovy;
                    var m_detectEyePupils = 0;
                    var m_detectExpressions = 0;

                    Module.setValue(bufferInitParams, m_3DFacialFeatures, 'i32');
                    Module.setValue(bufferInitParams + sizeint, m_processingWidth, 'i32');
                    Module.setValue(bufferInitParams+ sizeint*2, m_processingHeight, 'i32');
                    Module.setValue(bufferInitParams+ sizeint*3, m_nbFacialFeatures, 'i32');
                    Module.setValue(bufferInitParams+ sizeint*4, m_nbMaxFaceObjects, 'i32');
                    Module.setValue(bufferInitParams+ sizeint*5, m_fovVerticalDegree,  'float');
                    Module.setValue(bufferInitParams+ sizeint*6, m_detectEyePupils, 'i32');
                    Module.setValue(bufferInitParams+ sizeint*7, m_detectExpressions, 'i32');
                    Module.setValue(bufferInitParams+ sizeint*8, bufClassifier, '*');

                    print_msg("==> [begin] xzimgMagicFaceInitialize");
                    xzimgMagicFaceInitialize = Module.cwrap('xzimgMagicFaceInitialize', 'number', ['number']);
                    res = xzimgMagicFaceInitialize(bufferInitParams);
                    print_msg("==> [end] xzimgMagicFaceInitialize = " + res);
                    classifierInitialized = true;
                    Module._free(bufferInitParams);   
                    initialization_complete = true;
                    var progressbar = document.getElementById("bar");
                    progressbar.hidden = true;
                })
              })
            });

        }
        else
            console.log("Loading classifier file failed");
    }
    
    oReq.send(null);
    oReq.onerror = function() { // only triggers if the request couldn't be made at all
        alert("Network Error");
    };
    
    // progress on transfers from the server to the client (downloads)
    function updateProgress (oEvent) {
        if (oEvent.lengthComputable) {
            var percentComplete = oEvent.loaded / oEvent.total * 100;
            var progressbar = document.getElementById("bar");
            progressbar.value = percentComplete;
            progressbar.style.visibility = "visible";
            progressbar.hidden = false;
        } else {
        }
    }
}

// -- Emotions detector classifier loading
var use_emotions = false;
var emos = new Array("neutral", "happy", "Surprise", "Sad", "Anger", "Disgust", "Fear", "contempt");
var emoScores = new Array(1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
var cubes = new Array(8);

var oReqEmotions = new XMLHttpRequest();
oReqEmotions.open("GET", "./model-emo.cl", true);
oReqEmotions.responseType = "arraybuffer";

oReqEmotions.onload = function (oEvent) {
    if (use_emotions)
    {
        classifierEmotionsInitialized = true;
        var arrayBuffer = oReqEmotions.response;
        if (arrayBuffer) {
            var byteArray = new Uint8Array(arrayBuffer);
            var sizeClassifier = byteArray.byteLength;
            var bufClassifier = Module._malloc(sizeClassifier);
            Module.HEAPU8.set(byteArray, bufClassifier);

            bufferCNNInitParams = Module._malloc(4*sizeint);
            var m_inWidth = 48;
            var m_inHeight = 48;
            var m_compressionMode = 0;
            var m_netType = 1;
            Module.setValue(bufferCNNInitParams, m_inWidth, 'i32');
            Module.setValue(bufferCNNInitParams + sizeint, m_inHeight, 'i32');
            Module.setValue(bufferCNNInitParams+ sizeint*2, m_compressionMode, 'i32');
            Module.setValue(bufferCNNInitParams+ sizeint*3, m_netType, 'i32');

            xzimgMagicFaceInitializeEmotion = Module.cwrap('xzimgMagicFaceInitializeEmotion', 'number', ['number', 'number']);
            res = xzimgMagicFaceInitializeEmotion(bufClassifier, bufferCNNInitParams);
            console.log("initialization emotions= " + res);
            Module._free(bufferCNNInitParams);

        }
    }
}



// -- Initialize to setup camera and tracking
var ptr_landmarks_2D;
var ptr_landmarks_3D;
var bufferImageData, bufferImageStruct, bufferFaceData;
function initializeBuffers() {

    console.log("==> Initialize Video and Buffers");
    if (videoElement.videoWidth == 0 || videoElement.videoHeight == 0) {
        console.log("==> Video Capture is not ready");
        return;
    }
    console.log("==> canvas (initialize_video_and_buffers) ---: " + canvasElement.width + " " + canvasElement.height);

    //context = canvasElement.getContext("webgl");
    context = canvasElement.getContext("2d");
    if (context == null) console.log("==> NULL");


    // -- Memory preallocation
    // frame allocation
    //class expImage
    //{
    //    int  m_iWidth;
    //    int  m_iHeight;
    //    void *m_pImageData;
    //	  int  m_iWStep;
    //	  int m_colorType;
    //	  int m_type;
    //	  int m_flippedHorizontaly;
    //};
    var channels = 3;
    bufferImageData = Module._malloc(canvasElement.width * canvasElement.height * 4);
    bufferImageStruct = Module._malloc(7 *sizeint);
    var m_iWidth = videoElement.videoWidth;
    var m_iHeight = videoElement.videoHeight;
    var m_iWStep = 0;
    var m_colorType = 4;    //RGBA
    var m_type = 0;
    var m_flippedHorizontaly = 0;
    Module.setValue(bufferImageStruct, m_iWidth, 'i32');
    Module.setValue(bufferImageStruct + sizeint, m_iHeight, 'i32');
    Module.setValue(bufferImageStruct + 2*sizeint, bufferImageData, '*');
    Module.setValue(bufferImageStruct + 3*sizeint, m_iWStep, 'i32');
    Module.setValue(bufferImageStruct + 4*sizeint, m_colorType, 'i32');
    Module.setValue(bufferImageStruct + 5*sizeint, m_type, 'i32');
    Module.setValue(bufferImageStruct + 6*sizeint, m_flippedHorizontaly, 'i32');

            // face data structure
    //struct xmgNonRigidPoseAPI
    //{	int m_detected;
    //	int m_poseComputed;

    //	float m_t[3];
    //	float m_euler[3];
    //	float m_quat[4];
    //	float m_matRot[3][3];

    //	int m_nbLandmarks3D;
    //	int m_nbLandmarks;
    //	float *m_landmarks3D;
    //	float *m_landmarks;
    //	int m_nbTriangles;
    //	int *m_triangles;
    //	float *m_keyLandmarks3D;
    //	float m_eyeCenters2D[4];
    //  float m_eyesPositions3D[6];
    //	float m_eyeCenters3D[6];
    //	float m_emotions[8];
    //}
    ptr_landmarks_3D = Module._malloc(730*3*sizefloat);
    ptr_landmarks_2D = Module._malloc(num_landmarks*2*sizefloat);
    tmp_data2 = Module._malloc(200*2*sizefloat);
    tmp_data3 = Module._malloc(1000*sizefloat);
    tmp_data4 = Module._malloc(200*3**sizefloat);
    bufferFaceData = Module._malloc(
        5*sizeint + 
        19*sizefloat + 
        4*sizeint/*pointers*/ +
        16*sizefloat /*eyes*/ +
        8*sizefloat/*emos*/ );
    Module.setValue(bufferFaceData + 2*sizeint + 19*sizefloat + 2* sizeint, ptr_landmarks_3D, '*');
    Module.setValue(bufferFaceData + 2*sizeint + 19*sizefloat + 3* sizeint, ptr_landmarks_2D, '*');
    Module.setValue(bufferFaceData + 2*sizeint + 19*sizefloat + 5* sizeint, tmp_data3, '*');
    Module.setValue(bufferFaceData + 2*sizeint + 19*sizefloat + 6* sizeint, tmp_data4, '*');

    buffers_initialized = true;
}