
import StringAnimation from "./StringAnimation.js";
import FileHolder from "./FileHolder.js";
//header intro animation
const greet1 = document.getElementById("greet1")

const temp1 = new StringAnimation(greet1, 125, 2000);
temp1.setAnimation("typewriter");
temp1.startAnimation();

const greet2 = document.getElementById("greet2")
const temp2 = new StringAnimation(greet2, 666, 2000);
temp2.setAnimation("typewriter");
temp2.startAnimation()

const fullname = document.getElementById("name");
const temp3 = new StringAnimation(fullname, 125, 2000);
temp3.setAnimation("typewriter");
temp3.startAnimation();

//header animation
//header onmousenter animation
const header = document.getElementById("header1");
const headerkids = header.querySelectorAll("*");
headerkids.forEach(element => {
    const anim = new StringAnimation(element, 50,300);
    element.addEventListener("mouseenter", function(){
        anim.startAnimation();
    })
    
});


//link animation
const alinks = Array.from(document.querySelectorAll(".onsitelink"));
alinks.forEach(element => {
    const linktext = element.querySelector(".linktext");
    const anim = new StringAnimation(linktext, 50,300);
    element.addEventListener("mouseenter", function(){
        anim.startAnimation();
    })
    element.addEventListener("click", togglemenu);
});


//menu button functionality
//function for opening menu
function togglemenu(event){
    if(event.target.className === "fas fa-bars"){
        event.preventDefault();
    }
    document.querySelector("body").classList.toggle("active");
    document.getElementById("mobileContentButton").classList.toggle("activecontentbutton");
    document.getElementById("mobileContentButton").classList.toggle("dormantcontentbutton");
}
//regular menu button
const menubutton = document.getElementById("menutoggle");
menubutton.addEventListener("click", togglemenu);
//mobile menu button that closes menu
const mobileContentButton = document.getElementById("mobileContentButton");
mobileContentButton.addEventListener("click", togglemenu);





//carousel functionality

//function for changing slides
function goToSlide(n){

    const dots = document.getElementsByClassName("dot");
    if(n>=slides.length){ slideIndex = 0;}
    else if(n<0){slideIndex = slides.length - 1;}
    else{
        slideIndex = n;
    }
    for( let i=0; i<slides.length; i++){
        slides[i].style.display = "none";
    }
    for( let i=0; i<dots.length; i++){
        dots[i].className = dots[i].className.replace(" currentdot", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className+= " currentdot";
    
}
//function used by arrow buttons
function plusSlide(n){
    goToSlide(slideIndex+n);
}


const slides = Array.from(document.querySelectorAll(".projectDiv"));
const dotContainer = document.getElementById("dotContainer");
let slideIndex = 0;
//creating dot buttons for every slide
slides.forEach((article, index )=>{
    const dotforslide = document.createElement("div");
    dotforslide.className ="dot";
    dotforslide.setAttribute("role", "button");
    //dotforslide.setAttribute("onclick", `goToSlide(${index})`);
    dotforslide.onclick = function(){goToSlide(index);}
    dotContainer.appendChild(dotforslide);
    article.style.display = "none";
})
//adding functionality to arrow buttons
const prev = document.getElementById("prev");
const next = document.getElementById("next");
//prev.setAttribute("onclick", "plusSlide(-1)");
prev.onclick = function(){plusSlide(-1);}
//next.setAttribute("onclick", "plusSlide(1)");
next.onclick = function(){plusSlide(1);}

//setting up first slide to be displayed on default
dotContainer.childNodes[0].className+= " currentdot";
slides[0].style.display = "block";

//setting up progress bar values
const bars = Array.from(document.querySelectorAll(".progressbar"));
const firstColor = "rgb(6, 117, 6)";
const firstpoint = 25;
const secondColor = "rgb(58, 184, 58)";
 const secondpoint = 75;
const thirdColor = "rgb(255, 255, 255)";

bars.forEach(progressbar=>{
    let value = progressbar.dataset.progressbar;
    progressbar.style.width = value+ "%";
    let barPtag = document.createElement("p");
    barPtag.className= "progressbartext";
    let bartext = '';
    let numvalue = parseInt(value);
    let midvalue1 = Math.floor((firstpoint/numvalue)*100);
    let midvalue2 = Math.floor((secondpoint/numvalue)*100);
    let colorstart2 = Math.floor((50/numvalue)*100);
    if(numvalue>=67){
        bartext = "Advanced";
        progressbar.style.background = `linear-gradient(to right, ${firstColor} 0%, ${midvalue1}%, ${secondColor} ${colorstart2}%, ${midvalue2}%, ${thirdColor})`; 
    }
    else if(numvalue>=33){
        bartext = "Intermediate"
        if(numvalue>50){
            
            progressbar.style.background = `linear-gradient(to right, ${firstColor} 0%, ${midvalue1}%, ${secondColor} ${colorstart2}%, ${midvalue2}%, ${thirdColor})`; 
        }
        else{
            progressbar.style.background = `linear-gradient(to right, ${firstColor} 0%, ${midvalue1}%, ${secondColor})`;  
        }

    }
    else{
        bartext = "Beginner"
        let midvalue1 = Math.floor((firstpoint/numvalue)*100);
        progressbar.style.background = `linear-gradient(to right, ${firstColor} 0%, ${midvalue1}%, ${secondColor})`;
    }
   barPtag.textContent = bartext;
   progressbar.appendChild(barPtag);
})

//experience functionality

const jobduties = Array.from(document.querySelectorAll(".jobduties"));
const jobbuttons = Array.from(document.querySelectorAll(".jobbutton"));

function toggleExperienceInfo(index){
    jobduties[index].classList.toggle("hideitem");
    jobbuttons[index].children[0].classList.toggle("fa-minus-circle");
    jobbuttons[index].children[0].classList.toggle("fa-plus-circle");

}
jobbuttons.forEach((buttonelem, ind)=>{
    buttonelem.addEventListener("click", ()=>{
        toggleExperienceInfo(ind);
    })
})






//contact form

const contactform = document.getElementById("contactform");
const inputemail = document.getElementById("inputemail");
const inputsubject = document.getElementById("inputsubject");
const inputbody = document.getElementById("inputbody");
const inputfile = document.getElementById("inputfile");
const inputsubmit = document.getElementById("inputsubmit");
const filesindicator = document.getElementById("filesindicator");
const blockform = document.getElementById("blockform");
const loadform = document.getElementById("loadform");
const fh = new FileHolder(filesindicator);
fh.setClasses("fileitem","fileitembutton","far fa-times-circle","fullbar","currentbarprogress");
let msgSent= false;
inputsubmit.addEventListener("click",(e)=>{
e.preventDefault();
let luggage = fh.getList();
let from = inputemail.value.trim();
let subject = inputsubject.value.trim();
let body = inputbody.value.trim();
if(from!= "" && from.includes("@") && subject.value!= "" && body!="" && msgSent!=true){
    msgSent = true;
    loadform.className="spinnerloader";
    let msg = {
        from: from,
        subject: subject,
        mbody: body,
        attachments: luggage
    };
    console.log(msg);
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(msg)
    };
fetch("https://backendemails.herokuapp.com/email", options)
.then((resp)=>resp.text())
.then((message)=>{
        contactform.classList.add("hideitem");
        blockform.classList.remove("hideitem");
        blockform.classList.add("blockContentDiv");
        loadform.className= "hideitem";
        if(message!="OK"){
            console.log(message);
        blockform.children[0].textContent = "Error: Message not sent";
        }
    }).catch((err)=>{
        console.log(err);
        contactform.classList.add("hideitem");
        blockform.classList.remove("hideitem");
        blockform.classList.add("blockContentDiv");
        loadform.className= "hideitem";
        blockform.children[0].textContent = "Error: Message not sent";
    });
}

})
inputemail.addEventListener("change",()=>{
    inputsubject.focus();
})
inputsubject.addEventListener("change",()=>{
    inputbody.focus();
})
inputfile.addEventListener("change",(e)=>{
    const filelist = Array.from(inputfile.files);
    filelist.forEach((elem)=>{

        let div = fh.addFile(elem);
        filesindicator.appendChild(div);
        
    })

})