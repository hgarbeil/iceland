const mainconEL = document.querySelector('.main-content');


// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);


function loadItinerary(){
    console.log("load itineraries") ;
    mainconEL.innerHTML =  `
    <div id="mapid" class="mapdiv"></div>` ;
    var map = L.map('mapid').setView([64.9, -19.], 6);
    var hikeFlag = true ;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var itinIcon = L.icon({
        iconUrl: 'data/bed-bug.png',
        iconSize: [32,32]
    });

    var tableEl = document.createElement('table');
    tableEl.classList.add ('content-table') ;
    $ajaxUtils.sendGetRequest ('data/itin.txt', function(responseText){
        console.log(responseText);
        var lines = responseText.split('\n');
        for (var ind=0; ind<lines.length-1; ind++) {
            var cells=lines[ind].split(',');
            var markerOptions = {
                title:'Day # '+cells[0],
                clickable:true,
                icon:itinIcon
            }
            var marker = L.marker([cells[4],cells[5]],markerOptions);
            marker.bindPopup(cells[0]+': '+cells[2]).openPopup();
            marker.addTo(map);
        }

    }, false) ;



}