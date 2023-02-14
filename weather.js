var apikey = '43a6eb084cbbd5e39c194ae6de550801' ;
var topweatherEl = document.getElementById('top-weather');
console.log(topweatherEl);
console.log("In weather") ;
var latitude = 64.15 ;
var longitude = -21.94 ;
var data = '' ;

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

    topweatherEl.innerHTML =
    `<div class="weather-item">
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
updateWeather(latitude,longitude);



console.log(data);