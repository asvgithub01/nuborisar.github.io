// <!--
// * Copyright (c) 2019 XZIMG Limited , All Rights Reserved
// * No part of this software and related documentation may be used, copied,
// * modified, distributed and transmitted, in any form or by any means,
// * without the prior written permission of xzimg
// *
// * contact@xzimg.com, www.xzimg.com
// * DO NOT SHARE - DO NOT REPRODUCE - DO NOT USE IN COMMERCIAL PROJECTS
// -->

function parse_obj(obj, obj_content) {
    // -- search for vertices
    var vertexMatches = obj_content.match(/^v( -?\d+(\.\d+)?){3}$/gm);
    if (vertexMatches)
    {
        obj.vertices = vertexMatches.map(function(vertex)
        {
            var vertices = vertex.split(" ");
            vertices.shift();   // is to avoid the first 'v'
            return vertices;
        });
    }

    // -- search for texture uv list
    var uvMatches = obj_content.match(/^vt( -?\d+(\.\d+)?){2}$/gm);
    if (uvMatches)
    {
        obj.uvs = uvMatches.map(function(uv_coord)
        {
            var uvs = uv_coord.split(" ");
            uvs.shift();   // is to avoid the first 'vt'
            return uvs;
        });
    }

    // -- search for faces
    // \d+ = at least one digit
    // gm is per line
    // ^ is negation
    // {n} number of copies that should match prev expression
    //var facesMatches = obj_content.match(/^f( -?\d+(\.\d+)?){3}$/gm);
    //var facesMatches = obj_content.match(/f$/gm);
    var facesMatches = obj_content.match(/^f( \d+\/\d+\/\d+){3}$/gm);
    if (facesMatches)
    {

        // obj.faces, obj.uv_ids = facesMatches.map(function(face)
        // {
        //     var arr_face = face.split(" ");
        //     arr_face.shift(); // is to avoid the first 'f'
        //     ret_face_ids= [arr_face[0].split("/")[0]-1, arr_face[1].split("/")[0]-1, arr_face[2].split("/")[0]-1];
        //     ret_uv_ids = [arr_face[0].split("/")[1]-1, arr_face[1].split("/")[1]-1, arr_face[2].split("/")[1]-1];
        //     //console.log(ret)

        //     return ret_face_ids, ret_uv_ids;
        // });
        
        obj.faces = facesMatches.map(function(face)
        {
            var arr_face = face.split(" ");
            arr_face.shift(); // is to avoid the first 'f'
            ret_face_ids= [arr_face[0].split("/")[0]-1, arr_face[1].split("/")[0]-1, arr_face[2].split("/")[0]-1];
            //console.log(ret)

            return ret_face_ids;
        });
        
        obj.uv_ids = facesMatches.map(function(face)
        {
            var arr_face = face.split(" ");
            arr_face.shift(); // is to avoid the first 'f'
            ret_uv_ids = [arr_face[0].split("/")[1]-1, arr_face[1].split("/")[1]-1, arr_face[2].split("/")[1]-1];
            //console.log(ret)

            return ret_uv_ids;
        });
    }
}

var obj_read = false;
var obj_container = {};
function readObj() {
    var req = new XMLHttpRequest();
    req.responseType = 'text';
    req.open("GET", "face-model.obj", true);

    req.onload = function () {
        if (req.readyState === req.DONE) {
            if (req.status === 200) {
                parse_obj(obj_container, req.responseText);
                obj_read = true;
            }
        }
    }
    req.send(null);
}