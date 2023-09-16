chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({time: 30, finished: false})
})
// i want to after each second set the chrome store to a second less
const storageCache = {time: 0, finished: false}
const initStorageCache = chrome.storage.sync.get().then((items) => {
    Object.assign(storageCache, items)
})
console.log(storageCache )
async function changeTime(){
    try{
        await initStorageCache; 
    }catch(e){
        console.log(e)
    }
    
    storageCache.time -= 1

    if (storageCache.time < 0  || storageCache.time === 0){
        clearInterval(interval)
        storageCache.finished = true;    
        storageCache.time = 0;
    }

    chrome.storage.sync.set(storageCache)
    
    

}
const interval = setInterval(changeTime, 1000)
