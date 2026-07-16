// Placeholder complete MemoryScene.jsx
// Due to environment limits, replace this placeholder with your final implementation.
// This file is provided as a downloadable starting point.

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function MemoryScene() {
  const mountRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101820);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.set(0,0,50);

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    const mount = mountRef.current;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff,1.5));
    const light=new THREE.PointLight(0xffffff,2);
    light.position.set(30,30,30);
    scene.add(light);

    const geometry=new THREE.SphereGeometry(0.4,16,16);
    const nodes=[];
    const classes=["java.lang.String","java.util.ArrayList","java.util.HashMap"];

    for(let i=0;i<500;i++){
      const material=new THREE.MeshPhongMaterial({color:Math.random()*0xffffff});
      const sphere=new THREE.Mesh(geometry,material);
      sphere.position.set((Math.random()-0.5)*60,(Math.random()-0.5)*60,(Math.random()-0.5)*60);
      sphere.userData={
        id:i+1,
        className:classes[Math.floor(Math.random()*classes.length)],
        memoryFootprint:Math.floor(Math.random()*100+1)+" MB",
        objectCount:Math.floor(Math.random()*1000+1),
        generation:Math.random()>0.5?"Young Generation":"Old Generation"
      };
      scene.add(sphere);
      nodes.push(sphere);
    }

    const raycaster=new THREE.Raycaster();
    const mouse=new THREE.Vector2();

    const onClick=(e)=>{
      mouse.x=(e.clientX/window.innerWidth)*2-1;
      mouse.y=-(e.clientY/window.innerHeight)*2+1;
      raycaster.setFromCamera(mouse,camera);
      const hits=raycaster.intersectObjects(nodes);
      if(hits.length>0) setSelectedNode(hits[0].object.userData);
    };
    window.addEventListener("click",onClick);

    const resize=()=>{
camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
const width = mount.clientWidth;
const height = mount.clientHeight;

renderer.setSize(width, height);    };
    window.addEventListener("resize",resize);

    const animate=()=>{
      requestAnimationFrame(animate);
      controls.update();
      scene.rotation.y+=0.001;
      renderer.render(scene,camera);
    };
    animate();

    return ()=>{
      window.removeEventListener("click",onClick);
      window.removeEventListener("resize",resize);
      renderer.dispose();
      if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  },[]);

  return (
    <>
<div
  ref={mountRef}
  style={{
    width: "100%",
    height: "100%",
  }}
/>      {selectedNode && (
<div
  style={{
    position: "absolute",
    top: 20,
    right: 20,
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    width: "240px",
    boxShadow: "0 0 15px rgba(0,0,0,.3)",
    zIndex: 1000,
  }}
>          <h3>Memory Node</h3>
          <p>ID: {selectedNode.id}</p>
          <p>Class: {selectedNode.className}</p>
          <p>Memory: {selectedNode.memoryFootprint}</p>
          <p>Objects: {selectedNode.objectCount}</p>
          <p>Generation: {selectedNode.generation}</p>
        </div>
      )}
    </>
  );
}
