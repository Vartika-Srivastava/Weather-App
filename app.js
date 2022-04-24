let text=document.querySelector("input");
let btn=document.getElementById("btn");
let body=document.querySelector("body"); 

let loc=document.querySelector("#location");
let time=document.querySelector("#date");
let icon=document.querySelector("#icon");
let temp=document.querySelector("#temp");
let minmax=document.querySelector("#minmax");
let speed=document.querySelector("#speed");
let desc=document.querySelector("#desc");

const weather = {};
const KELVIN = 273;

weather.temperature = {
    unit : "celsius"
}

myFunction();

function myFunction(){
    getWeather("delhi")
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let area=text.value;
    getWeather(area);
    text.value="";
});

function getWeather(area){
    let api = `https://community-open-weather-map.p.rapidapi.com/weather?q=${area}`;

    fetch(api, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "b915b811c4msh96d59eadf40f491p1552f4jsn1ec436ff1e6b"
        }
    })
        .then(response => {
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(data => {
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.date = new Date().toDateString();
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.minTemp = Math.floor(data.main.temp_min - KELVIN);
            weather.maxTemp = Math.floor(data.main.temp_max - KELVIN);
            weather.speed = data.wind.speed;
            weather.description = data.weather[0].description;
        })
        .then(function(){
            displayWeather();
        })
        .catch(err => {
            alert("Enter Valid Area");
            console.log(err.message);
        });
}

// Display Weather
function displayWeather(){

    if(weather.description === "mist"){
        body.setAttribute('class','mist');
    }else if(weather.description === "overcast clouds"){
        body.setAttribute('class','overcast');
    }else if(weather.description === "clear sky"){
        body.setAttribute('class','clear');
    }else if(weather.description === "light rain"){
        body.setAttribute('class','lightRain');
    }else if(weather.description === "heavy rain"){
        body.setAttribute('class','heavyRain');
    }else if(weather.description === "few clouds"){
        body.setAttribute('class','fewClouds');
    }


    loc.innerHTML = `${weather.city}, ${weather.country}`;
    time.innerHTML = `${weather.date}`;
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    minmax.innerHTML = `${weather.minTemp}°<span>C (min) / </span>${weather.maxTemp}°<span>C (max)</span>`;
    speed.innerHTML = `${weather.speed}Kms`;
    desc.innerHTML = weather.description;
}