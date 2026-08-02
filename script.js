// =============================
// Loading Animation
// =============================

let percent = document.getElementById("percent");

let loading = 0;


let loadingInterval = setInterval(() => {


    loading++;


    if(percent){

        percent.innerHTML = loading + "%";

    }



    if(loading >= 100){


        clearInterval(loadingInterval);



        setTimeout(()=>{


            let loader = document.getElementById("loading");

            let home = document.getElementById("home");



            if(loader){

                loader.style.opacity="0";


                setTimeout(()=>{

                    loader.style.display="none";

                },800);

            }



            if(home){

                home.classList.remove("hidden");

            }



        },800);


    }



},35);





// =============================
// Start Journey + Music
// =============================


const startBtn = document.getElementById("startBtn");

const music = document.getElementById("music");



if(startBtn){


startBtn.addEventListener("click",()=>{



// Start Music

if(music){


music.volume = 0.4;


music.play().then(()=>{


localStorage.setItem(
"musicPlaying",
"true"
);


}).catch(()=>{


console.log("Browser blocked autoplay");


});


}




// Button Effect


startBtn.innerHTML =
"Entering Memories...";


startBtn.style.transform =
"scale(1.15)";




// Save music position


setInterval(()=>{


if(music){


localStorage.setItem(
"musicTime",
music.currentTime
);


}


},1000);





// Page Transition


document.body.style.transition =
"1.5s";


document.body.style.opacity =
"0";



setTimeout(()=>{


window.location.href =
"chapter1.html";


},1500);



});

}



// =============================
// Restore Music Time
// =============================


window.addEventListener("load",()=>{


let savedTime =
localStorage.getItem("musicTime");



if(music && savedTime){


music.currentTime =
parseFloat(savedTime);


}



});