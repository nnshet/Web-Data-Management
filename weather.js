// Put your Last.fm API key here
/*var api_key = "";

function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
        }
    };
    xhr.send(null);
}*/

//Student Name: Shet,Neha Nilcant and Project Name: Project#1  and Due date: Wednesday October 19

var api_key = "5a3847b0e3a79d8e1f91bcca48fb5f7d";

function sendRequest () {
    var xhr = new XMLHttpRequest();
   // var method = "artist.getinfo";
   var url = 'url(clouds.jpg)';
    var city = encodeURI(document.getElementById("form-input").value);
    if(city == "") {
        document.getElementById("output").innerHTML = "<div class='textContent'><h2>Please enter the city name to see the weather details</h2></div";
        
    var bodyObject = document.getElementsByTagName('body')[0];
        bodyObject.style.backgroundImage = url;
        bodyObject.style.backgroundSize = "initial";
        return false;
    }
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json&units=metric", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
       
        var contentHtml = "";
        if (this.readyState == 4) {
            
            var json = JSON.parse(this.responseText);
            if(json.cod == 200) {
                
                var weatherType = json.weather[0].main;
                var message = "It is going to be "+json.weather[0].description;
                var adviseUser = "";
                var visibility= "Very Good";
                var id = json.weather[0].id;
                url ='url(sky.gif)';
                if(id >= 200 && id <= 531 ) {

                    adviseUser = "You are advised to carry an umbrella";
                    visibility = "Poor";
                    url = 'url(rain.gif)';

                } else if(id >= 600	&& id <= 622) {

                    adviseUser = "You are advised to carry a coat";
                    visibility = "Poor";
                    url = 'url(snow.gif)';
                    
                } else if(id >= 701 && id <= 762) {

                    adviseUser = "You are advised to wear a mask";
                    visibility = "Poor";
                    url ='url(foggy.gif)';

                } else if(id >= 763 && id <= 781) {

                    adviseUser = "You are advised to remain indoors";
                    visibility = "Poor";

                }else if(id == 804) {

                    adviseUser = "There is a possibility of rain. You are advised to carry an umbrella";
                    visibility = "Good";
                    url = 'url(cloudy.gif)'

                } else if(id >= 900 && id <= 906) {

                    adviseUser = "The weather condition is extreme. You are advised to remain indoors";
                    visibility = "Poor";
                    if(id == 903 || id == 904 ||id == 905)
                        visibility = "Good";
                    

                } else if(id >= 956	 && id <= 962) {
                    
                    adviseUser = "You are advised not to travel in this area";
                    visibility = "Poor"
                }
                
                var timeOfSunrise = convertToTime(json.sys.sunrise);
                var timeOfSunset = convertToTime(json.sys.sunset);
                
                var bodyObject = document.getElementsByTagName('body')[0];
                    bodyObject.style.backgroundImage = url;
                    bodyObject.style.backgroundRepeat = 'no repeat';
                    bodyObject.style.backgroundSize = '100% 100%';
                contentHtml = "<div class='textContent'><h2>"+json.name+", "+json.sys.country+"</h2><p><h2>"+message+"</h2></p><h3><img alt='...' src='http://openweathermap.org/img/w/"+json.weather[0].icon+".png'></img>"+json.main.temp+"&degC</h3><h3>"+adviseUser+"</h3></div>";
                contentHtml += "<table>";
                contentHtml += "<tr><td>City Name</td><td>"+json.name+"</td></tr>";
                contentHtml += "<tr><td> Geo Coordinates [Lat,Lon] </td><td>["+json.coord.lat+", "+json.coord.lon+"]</td></tr>";
                contentHtml += "<tr><td>Time of Sunrise</td><td>"+timeOfSunrise+" (local time)</td></tr>";
                contentHtml += "<tr><td>Time of Sunset</td><td>"+timeOfSunset+" (local time)</td></tr>"
                contentHtml += "<tr><td>pressure</td><td>"+json.main.pressure+"hPa</td></tr>";
                contentHtml += "<tr><td>Humidity</td><td>"+json.main.humidity+"%</td></tr>";
                contentHtml += "<tr><td>Temperature</td><td>"+json.main.temp+"&degC</td></tr>";
                contentHtml += "<tr><td>Min Temperature</td><td>"+json.main.temp_min+"&degC</td></tr>"
                contentHtml += "<tr><td>Max Temperature</td><td>"+json.main.temp_max+"&degC</td></tr>";
                contentHtml += "<tr><td>Clouds</td><td>"+json.clouds.all+"</td></tr>";
                contentHtml += "<tr><td>Visibility</td><td>"+visibility+"</td></tr>"
                contentHtml += "<tr><td>Description</td><td>"+json.weather[0].description+"</td></tr></table>"
            }else {
                var bodyObject = document.getElementsByTagName('body')[0];
                    bodyObject.style.backgroundImage = url;
                    bodyObject.style.backgroundSize = "initial";
                contentHtml = "<div class='textContent'><h2>"+json.message+"</h2></div>"
            }
                document.getElementById("output").innerHTML = contentHtml;
        } else {
                var bodyObject = document.getElementsByTagName('body')[0];
                    bodyObject.style.backgroundImage = url;
                    bodyObject.style.backgroundSize = "initial";
                document.getElementById("output").innerHTML = "<div class='textContent'><h2>There was an error processing your request</h2></div";
            
        }
    };
    xhr.send(null);
}

function convertToTime(timestamp) {
    
    var date = new Date(timestamp*1000);
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var hours = date.getHours();
    var amPm = getAmPm(hours);
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+" "+amPm;
}

function getAmPm(hours) {
    
    var mid='pm';
    if(hours<12)
    {
        mid='am';
    }
    return mid;
}
