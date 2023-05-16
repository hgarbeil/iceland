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
    maxZoom: 10,
    minZoom: 6,
    maxBounds:[[68,-25],[55,-15]],
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var itinIcon = L.icon({
        iconUrl: 'data/bed-bug.png',
        iconSize: [32,32]
    });

    var tableEl = document.createElement('table');
    tableEl.classList.add ('content-table') ;
    var theadEl = document.createElement('thead');
    var tbodyEl = document.createElement('tbody');
    mainconEL.appendChild(tableEl);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    $ajaxUtils.sendGetRequest ('data/itin.txt', function(responseText){
        
        var lines = responseText.split('\n');
        var l0 = lines[0];
        var myTr = document.createElement('tr');
        myTr.classList.add('tr-head');
        var cells=l0.split(',');
        for (var i=0; i<cells.length;i++){
            if (i>=4 && i<6) {
                console.log(i);
                continue;
            }
            var myTh = document.createElement('th');
            myTh.innerHTML = cells[i];
            myTr.appendChild(myTh);
        }
        theadEl.appendChild(myTr);


        for (var ind=1; ind<lines.length; ind++) {

            myTr = document.createElement('tr');
            
            cells=lines[ind].split(',');
            var markerOptions = {
                title:cells[0],
                clickable:true,
                icon:itinIcon
            }
            
            var marker = L.marker([cells[4],cells[5]],markerOptions);
            marker.bindPopup(cells[0]+': '+cells[2]).openPopup();
            marker.addTo(map);
            marker.on("click", function(event){
                clickedMarker(event.target.options.title) ;
                highlightRow(event.target.options.title);
            });
            for (var icol=0;icol<8; icol++){
                if (icol>=4 && icol< 6) {
                    continue;
                }
                var myTd = document.createElement('td');
                myTd.classList.add('priority-low');
                myTd.innerText=cells[icol];
                myTr.appendChild(myTd);
            }
            tbodyEl.appendChild(myTr);
            
        }
        

       
    }, false) ;



}

function loadActivities(){
    mainconEL.innerHTML =  `
    <div id="mapid" class="mapdiv"></div>` ;
    var map = L.map('mapid').setView([64.9, -19.], 6);
    var hikeFlag = true ;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    minZoom: 6,
    maxBounds:[[68,-25],[55,-15]],
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var itinIcon = L.icon({
        iconUrl: 'data/bed-bug.png',
        iconSize: [32,32]
    });

    var tableEl = document.createElement('table');
    tableEl.classList.add ('content-table') ;
    var theadEl = document.createElement('thead');
    var tbodyEl = document.createElement('tbody');
    mainconEL.appendChild(tableEl);
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    var activcount=0 ;
    $ajaxUtils.sendGetRequest ('data/activ.txt', function(responseText){
        
        var lines = responseText.split('\n');
        var l0 = lines[0];
        var myTr = document.createElement('tr');
        myTr.classList.add('tr-head');
        var cells=l0.split(',');
        for (var i=0; i<cells.length;i++){
            // if (i>4 && i<6) {
            //     console.log(i);
            //     continue;
            // }
            var myTh = document.createElement('th');
            myTh.innerHTML = cells[i];
            myTr.appendChild(myTh);
        }
        theadEl.appendChild(myTr);


        for (var ind=1; ind<lines.length; ind++) {

            myTr = document.createElement('tr');
            
            cells=lines[ind].split(',');
            
            switch (cells[4]){
                case 'Hike':
                    iconfile = 'data/icons8-hiking-50.png';
                    break ;
                case 'Food':
                    console.log("in food", cells[1]);
                    iconfile = 'data/icons8-restaurant-on-site-24.png';
                    //iconfile = 'data/icons8-hiking-50.png';
                    break ;
                case 'Museum':
                    iconfile = 'data/icons8-museum-50.png';
                    break ;
                case 'Park':
                    iconfile = 'data/icons8-national-park-50.png';
                    break;
                case 'HotSprings':
                    iconfile = 'data/icons8-hot-springs-50.png';
                    break;
                case 'Waterfall':
                    iconfile ='data/waterfall.png';
                    break;
                case 'Drive':
                    iconfile ='data/car.png';
                    break;
                default :
                    iconfile = "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png" ;
                    break ;
                
            };
            const markerIcon = L.icon({
                iconSize: [25, 41],
                iconAnchor: [10, 41],
                popupAnchor: [2, -40],
                // specify the path here
                iconUrl: iconfile,
              });
            if (cells[4]=='Hike'){

            }
            var markerOptions = {
                title:activcount.toString(),
                clickable:true,
                icon:markerIcon
            };
            var marker = L.marker([cells[2],cells[3]],markerOptions);
            marker.bindPopup(cells[0]+': '+cells[1]).openPopup();
            marker.addTo(map);
            marker.on("click", function(event){
                // /clickedMarker(event.target.options.title) ;
                highlightRow(event.target.options.title);
            });
            
            for (var icol=0;icol<6; icol++){
                var myTd = document.createElement('td');
                if (icol==5 && cells[icol]!=undefined){
                    // console.log(cells[i]);
                    var link = '<a target="_blank" href='+cells[icol]+'>Website</a>' ;
                    console.log(link);
                    myTd.innerHTML = link ;
                }
                else {
                
                    myTd.classList.add('priority-low');
                    myTd.innerText=cells[icol];
                }
                myTr.appendChild(myTd);
            }
            tbodyEl.appendChild(myTr);
            activcount=activcount+1;
        }
        

       
    }, false) ;



}

function highlightRow (num){
    var num1 = parseInt(num) + 1 ;
    tableEl = document.querySelector (".content-table" ) ;
    console.log(num1);
    for (var i=0; i<tableEl.rows.length; i++){
        tableEl.rows[i].classList.remove ('active') ;
    }

    tableEl.rows[num1].classList.add ('active') ;
    if (num1 == 15){
        tableEl.rows[1].classList.add ('active') ;
    }
    
}

function clickedMarker (num) {
    // console.log(myhikes[num]);
}


