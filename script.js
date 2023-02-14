const mainconEL = document.querySelector('.main-content');






// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

function loadItinerary(){
    console.log("load itineraries") ;
    mainconEL.innerHTML =  `
    <div id="mapid" class="mapdiv"></div>` ;
    var map = L.map('mapid').setView([65, -23.], 6);
    var hikeFlag = true ;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var tableEl = document.createElement('table');
    tableEl.classList.add ('content-table') ;
    $ajaxUtils.sendGetRequest ('data/itin.txt', function(responseText){
        console.log(responseText);
    }, false) ;



}