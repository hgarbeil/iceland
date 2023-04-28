const apikey = '43a6eb084cbbd5e39c194ae6de550801' ;
const topweatherEl = document.getElementById('top-weather');
const selectEl = document.querySelector('.select-city') ;


var latitude = 64.15 ;
var longitude = -21.94 ;
var data = '' ;
var towns=[] ;

var selectHTML = function loadSelect(){

    
    $ajaxUtils.sendGetRequest ('data/itin.txt', function(responseText){
        console.log(responseText);
        var lines = responseText.split('\n');
        
        for (var icity=1 ; icity<lines.length; icity++){
            console.log(lines[icity]);
            var cells = lines[icity].split(',');
            let town={
                "id": cells[0],
                "name": cells[2],
                "lat":cells[4],
                "lon":cells[5]
                
            };
            towns.push(town);
            var selEl = document.createElement('option');
            selEl.value= cells[0] ;
            selEl.text=cells[2];
            console.log(selEl);
            selectEl.appendChild(selEl);
            selectEl.value = 1 ;
            console.log(icity);
            
        };
    },false);
}

var updateWeather = function getWeather (latitude, longitude){
    // var loc = navigator.geolocation.getCurrentPosition((success)=>{
    //     let {latitude,longitude} = success.coords ;
        // console.log ("0  "+latitude+" "+longitude)
        latitude = latitude * 1. ;
        longitude = longitude * 1. ;
        console.log (latitude+ "  "+ longitude )
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=${apikey}`)
        .then(res =>res.json()).then (data=> {
            console.log(data) ;
            showWeatherData(data) ;
                
            }) 
        // console.log (wdata) ;
};

function showWeatherData (data){
    // get current conditions from data.current
    let {humidity, pressure, sunrise, wind_speed, temp} = data.current ;     
    const curdesc = data.current.weather[0].description ;

    // var selecthtml = `<div class="weather-select">
    // <label>Weather for : </label>
    // <select class="select-city" >`;

    


    topweatherEl.innerHTML =
    
    // <div class="weather-select">
    //     <label>Weather for : </label>
    //     <select class="select-city" >

    //     </select> 
    //     <input type="Submit" value="Update"> 

    // </div>
    `
    <br>
    <div class="weather-item">
    <div>Currently: </div>
    <div>${curdesc}</div>
    </div>
    <div class="weather-item">
    <div>Temp</div>
    <div>${temp} &#176;F</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure} MBars</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} MPH</div>
    </div>`;
    // <div class="weather-item">
    //     <div>Sunrise</div>
        
    //     <div>${sunrise_convert}</div>
    // </div>
    // <div class="weather-item">
    //     <div>Sunset</div>
    //     <div>${sunset_convert}</div>
    // </div>` ;

}
function newcity () {
    let index = selectEl.value ;
    // console.log ("index is "+index);
    // console.log ("town arr lat is "+townArr[index].lat);
    townLat= towns[index-1].lat ;
    townLon = towns[index-1].lon ;
    console.log("townLat is ",townLat);
    updateWeather (townLat, townLon) ;

}

selectHTML() ;
updateWeather(latitude,longitude);



console.log(data);