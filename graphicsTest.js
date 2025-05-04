import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.core.js';

//global variables for matrix
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let amountOfParticles = (window.screen.width<500) ? 100:200;
let fontsize = 16;
ctx.font = `${fontsize}px Consolas`;
let greencolors = ['ForestGreen','Green','LimeGreen','Lime','LawnGreen','Chartreuse', 'GreenYellow'];
let particleArray = [];

class NumberParticle{
    constructor(Colorpacket, xlocation, ylocation){
        this.xlocation = xlocation;
        this.ylocation = ylocation;
        this.colorArray = Colorpacket;
        this.colorNumber = Math.random()*this.colorArray.length;
        this.speedbuffer = 2;
        this.buffercounter = 0;
        this.speed = fontsize +1;
        this.charcodeRange = 240;
        this.currentChar = String.fromCharCode(Math.floor(Math.random()*this.charcodeRange));
    }
     highlight(){
         this.colorNumber = this.colorArray.length-1
    }

    update(){
        // update movement
        if(this.ylocation>canvas.height){
            this.ylocation = 0 - fontsize;
        }
        if(this.buffercounter>=this.speed){
            this.buffercounter = 0;
            this.ylocation+=this.speed;

            //removing boxes from being chars
            let rnum = Math.floor(Math.random()*this.charcodeRange);
            let numdir = Math.floor(Math.random());
            if(rnum<33){
                rnum+=33;
            }
            else if(rnum>126 && rnum<150){// I wanted some boxes so there are 10 box chars in range
                rnum+=(150-126);
            }
            else if(rnum>=192)//get katakana chars
            {   
                rnum = (Math.floor(Math.random()*95)) + 12449;
            }
            
            //update character only when the movement updates
            this.currentChar = String.fromCharCode(rnum);

        }
        else{
            this.buffercounter+=this.speedbuffer;
        }
        //update color
        if(this.colorNumber>0){
            this.colorNumber-=0.01; 
        }
        else{
            this.highlight();
        }
        

    }
    draw(){
        ctx.fillStyle = this.colorArray[Math.floor(this.colorNumber)];
        ctx.fillText(this.currentChar, this.xlocation, this.ylocation, fontsize);
    }
}

//global variables for three.js scene;
const threecanvas = document.getElementById("threejsgraphic");
//threecanvas.height = window.innerHeight;
//threecanvas.width = window.innerWidth;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.x = -23;
camera.position.y = 5;
camera.position.z = 35;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas: threecanvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const geo = new THREE.DodecahedronGeometry(25, 1);
const material = new THREE.MeshBasicMaterial({color: 0x80FF00, wireframe: true});
const mesh = new THREE.Mesh(geo, material);
mesh.rotation.x+=6;

const littlegeo = new THREE.DodecahedronGeometry(5,1);
const lilmaterial = new THREE.MeshBasicMaterial({color: 0x0e9409, wireframe: true});
const littleplanet = new THREE.Mesh(littlegeo,lilmaterial);
littleplanet.position.x = -50;
littleplanet.position.y = 15;
mesh.add(littleplanet);

let ringgeo = new THREE.RingGeometry(70, 37, 20, 20);
let wireframe = new THREE.WireframeGeometry(ringgeo);
const ringmaterial = new THREE.LineDashedMaterial({color: 0xcfd9ca, dashSize: 1});
const disc = new THREE.LineSegments(wireframe, ringmaterial);
disc.computeLineDistances();
disc.rotation.x= -1000;
mesh.add(disc);
const astparent = new THREE.Object3D();
astparent.rotation.x+=6;
const astgeo = new THREE.DodecahedronGeometry(2,0);
const astmat = new THREE.MeshBasicMaterial({color: 0x307d00, wireframe: true});
const asteroid = new THREE.Mesh(astgeo,astmat);
asteroid.position.x = 40;
asteroid.position.y = -10;
asteroid.position.z = -10;
astparent.add(asteroid);
scene.add(astparent);


scene.add(mesh);





function initializeParticles(){
    while(particleArray.length>0){
        particleArray.pop();
    }
    for( let i = 0; i<amountOfParticles; i++){
    particleArray.push(new NumberParticle(greencolors, Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height+ fontsize)));
    }
}

function handleParticles(){
    particleArray.forEach((elem)=>{
        elem.update();
        elem.draw();
    });
}



function animate(){ 
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    //mesh.rotation.x+=0.01;
    mesh.rotation.y+=0.01;
    disc.rotation.z+=0.01;

    littleplanet.rotation.x+=0.01;
    littleplanet.rotation.y+=0.01;
    littleplanet.rotation.z+=0.01;

    astparent.rotation.y+= 0.015;
    asteroid.rotation.x+= 0.01;
    asteroid.rotation.y+= 0.01;
    asteroid.rotation.z+= 0.01;
    
    renderer.render(scene,camera);
    window.requestAnimationFrame(animate);
}


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    initializeParticles();
});

initializeParticles();
animate();
