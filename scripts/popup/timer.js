// DOM 
const Timer = document.querySelector('#actual-timer');

//vars

const secss = await chrome.storage.sync.get(["time"]);
let secs = secss.time
Timer.innerText = secToTime(secs)


// to simplify the boring ass code in a simple function 
function secToTime(sec){
    const minuets = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
        
    const hours = Math.floor(minuets / 60);
    const remainingMinuets = minuets % 60;

    const digit = (num) => {
        num = num.toString();
        if (num.length === 1) {
            num = "0" + num
            return num
        }
        return num
    }

    const finishedHours = digit(hours);
    const finishedMinuets = digit(remainingMinuets);
    const finishedSeconds = digit(remainingSecs);


    return `${finishedHours}:${finishedMinuets}:${finishedSeconds}`;

}
chrome.storage.onChanged.addListener(async () => {
    secs = await chrome.storage.sync.get(["time"])
    secs = await secs.time
    Timer.innerText = secToTime(secs)
    console.log(secs)
})


//below is the clinet dummy code

/*
function countdown(){

    if(!running) return;

    secs = secs- 1;
    if (secs === 0){
        timesup();
    }
    const secs2 = secToTime(secs);


    Timer.innerText = secs2
}
function timesup(){
    running = false;
    return;
}

// runs the first time 
function init(){
    running = true;
    Timer.innerText = secToTime(secs);

    setInterval(countdown, (1000));
}
*/
