console.log("lets write javascript");
let songs;
let songs2=[];
let currfolder;
let currentSong=new Audio();
function secondsToMinutes(seconds) {
    if(isNaN(seconds) || seconds<0){
        return "00:00"
    }
  const minutes = parseInt(Math.floor(seconds / 60));
  const remainingSeconds = parseInt(seconds % 60);

  return String(minutes).padStart(2, '0') + ':' + String(remainingSeconds).padStart(2, '0');
}
function songtransfer(songs){
    return songs;
}


async function getSongs(folder){
    currfolder=folder;
    let a=await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response=await a.text();
    console.log("this is response "+response);
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    songs=[];
    
    for(let index=0;index<as.length;index++){
        const element=as[index];
        console.log("THese are the elemnts "+element)
        if(element.href.endsWith(".mp3")){
            console.log("THis is is the folder "+folder)
            songs.push(element.href.replaceAll("%5C","/").split(`${folder}/`)[1]);
        }
    }
    songs2=songs;
    console.log("this is is songs list "+songs);
    let songUl=document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUl.innerHTML=""
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div></div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert playnowd" src="play.svg" alt="">
                            </div>
                            
                        </li>`
        
        
        
        
       // `<li> ${song.replaceAll("%20"," ")} </li>`;
        
    }
    

   Array.from(document.querySelector(".songList").getElementsByTagName("li") ).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log("clicked");
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })
    
   })




}
const playMusic=(track,pause=false)=>{
    //let audio=new Audio("/songs/"+track);
    currentSong.src=`/${currfolder}/`+track
    if(!pause){
        currentSong.play();
         play.src="pause.svg";
    }
    
   
    document.querySelector(".songinfo").innerHTML=decodeURI(track);
    document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}
async function displayalbums(){
    let a=await fetch(`http://127.0.0.1:3000/songs/`);
    let response=await a.text();
    console.log("this is response "+a);
    let div=document.createElement("div");
    div.innerHTML=response;
    let anchors=div.getElementsByTagName("a");
    let cardContainer=document.querySelector(".cardContainer");
    console.log("THis is the latest function "+anchors)
    let array=Array.from(anchors)
    for(let index=0;index<array.length;index++){
        const e=array[index]
       // e.href.replaceAll("/%5C","/");
       // e.href.replaceAll("%5C","/");
        //console.log("this is what i want "+e.href);
        if(e.href.includes("%5Csongs")){
            let folder=e.href.replaceAll("%5C","/").split("/").slice(-2)[0];
             let a=await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
             let response=await a.json();
             console.log("This is json file information "+response);
             cardContainer.innerHTML=cardContainer.innerHTML+` <div data-folder="${folder}" class="card">
            <div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`/**`<div data-folder="cs" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"><path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" fill="#000"/></svg></div>

                        
                        <img src="https://i.scdn.co/image/ab67706f0000000249a1ed33d2ca64e6a5d0e550" alt="">
                        <h2>Happy Hits!</h2>
                        <p>Hits to boost your mood and fill you with happiness</p>
                    </div>
                     <div data-folder="ncs" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"><path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" fill="#000"/></svg></div>

                        
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>
                    `*/


        }}
        Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click",async item=>{
        songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        item.data
    })
})

    }


async function main(){
    
   await getSongs("songs/Dhurandhar");

   playMusic(songs[0],true)
    console.log(songs);
    displayalbums();

    //Display the albums on the page

    /**
    let songUl=document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Nitish Mahajan</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert playnowd" src="play.svg" alt="">
                            </div>
                            
                        </li>`
        
        
        
        
       // `<li> ${song.replaceAll("%20"," ")} </li>`;
        
    }

   Array.from(document.querySelector(".songList").getElementsByTagName("li") ).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log("clicked");
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })
    
   })*/
   //Attach event listener to play buttons
   play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play();
        play.src="pause.svg"
    }
    else{
        currentSong.pause();
        play.src="play.svg";
    }
   })
   //listen for time update event
   currentSong.addEventListener("timeupdate",()=>{
    console.log(currentSong.currentTime,currentSong.duration)
    document.querySelector(".songtime").innerHTML=`${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`
    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%"

   })


//Add event listener to seek bar
document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left=percent+"%";
    currentSong.currentTime=((currentSong.duration)*percent)/100;
})
//Add event listener for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0";
})
// add event listener for close button
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-120%";
})
//Add Event Listener to previous and next buttons
previous.addEventListener("click",()=>{
    
    console.log("previous clicked")
    console.log("these are songs "+songs2)
    console.log("THIS IS THE CURRENT SONG SOURCE "+(currentSong.src.replaceAll("%20"," ")).split("/").slice(-1)[0])
    let index=songs2.indexOf((currentSong.src.split("/").slice(-1))[0]);
    console.log("THIS is index "+index)
    if((index-1)>=0){
        console.log("THIS IS INDEX SONG "+songs2[index-1])
    playMusic(songs2[index-1]);}
})
next.addEventListener("click",()=>{
    
    console.log("next clicked")
    let index=songs2.indexOf((currentSong.src.split("/").slice(-1))[0])
    if((index+1)<songs2.length){
    playMusic(songs2[index+1]);}
})
//Add event listener to volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    currentSong.volume=parseInt(e.target.value)/100;
    console.log(e.target.value);
})
//Load the playlist whenever card is clicked
/**
Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click",async item=>{
        songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        if(screen.width<1100){
            document.querySelector(".left").style.left="0";

        }
    })
})
*/


        
}
main();

