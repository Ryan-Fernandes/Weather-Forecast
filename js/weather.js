/*In place of (APP_ID) sign in into http://api.openweathermap.org/ and get the app id*/
$(document).ready(function(){
    
    $("#city_search").click(function(){
        
        var city_val = $("#city_val").val();
        var forecast_type = $("#type").val();
        console.log(forecast_type);
        
        if(city_val != ""){
            $("#error_message").hide();
            //console.log(city_val);
            if(forecast_type =="current"){
                $.ajax({

                    url: "http://api.openweathermap.org/data/2.5/weather?q="+city_val+"&units=metric&APPID=(APP_ID)",
                    type: "GET",
                    datatype: "json",
                    success: function(data){
                        //console.log(data);
                        var display = showCurrent(data);
                        $(".current").html(display);
                        $(".row").html(" ");
                    }
                });
            }else if(forecast_type =="forecast"){
                $.ajax({

                    url: "http://api.openweathermap.org/data/2.5/forecast?q="+city_val+"&units=metric&APPID=(APP_ID)",
                    type: "GET",
                    datatype: "jsonp",
                    success: function(data){
                        //console.log(data);
                        var display = showForecast(data);
                        $(".row").html(display); 
                        $(".current").html(" ");
                    }
                }); 
            }
        }
    });
});

function showCurrent(data){
    var date = new Date(data.dt*1000);
    var weekday=new Array(7);
    weekday[0]="Monday";
    weekday[1]="Tuesday";
    weekday[2]="Wednesday";
    weekday[3]="Thursday";
    weekday[4]="Friday";
    weekday[5]="Saturday";
    weekday[6]="Sunday";
    console.log(data.dt);
    return  "<p><strong>Date</strong>: "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+","+weekday[date.getDay()]+"</p>" +
            "<p><strong>City</strong>: "+data.name+","+data.sys.country+"</p>" +
            "<p><strong>Description</strong>: "+data.weather[0].main+","+data.weather[0].description+"</p>" +
            "<p><strong>Temperature</strong>: <img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> "+data.main.temp+"°C</p>" +
            "<p><strong>Min Temp.</strong> "+data.main.temp_min+"°C  <strong>Max Temp.</strong>"+data.main.temp_max+"°C</p>" +
            "<p><strong>Humidity</strong>: "+data.main.humidity+"%</p>";
    
}

function showForecast(data){
    
    var weekday=new Array(7);
    weekday[0]="Monday";
    weekday[1]="Tuesday";
    weekday[2]="Wednesday";
    weekday[3]="Thursday";
    weekday[4]="Friday";
    weekday[5]="Saturday";
    weekday[6]="Sunday";
    console.log(data.list[0].dt *1000);
    console.log(data.list[0].weather[0].main);
    var fore = [];
    for(i=0;i<38;i++){
        var date = new Date(data.list[i].dt *1000);
        fore[i] = "<div class='col-lg-3'>"+
            "<div class='card'>"+
                "<div class='card-header'>"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+","+weekday[date.getDay()]+" <b>"+date.getHours()+":"+date.getMinutes()+"</b></div>"+
                "<div class='card-body'>"+
                    "<p><strong>City</strong>: "+data.city.name+","+data.city.country+"</p>" +
                    "<p><strong>Description</strong>: "+data.list[i].weather[0].main+","+data.list[i].weather[0].description+"</p>" +
                    "<p><strong>Temperature</strong>: <img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'> "+data.list[i].main.temp+"°C</p>" +
                    "<p><strong>Min Temp.</strong> "+data.list[i].main.temp_min+"°C  <strong>Max Temp.</strong>"+data.list[i].main.temp_max+"°C</p>" +
                    "<p><strong>Humidity</strong>: "+data.list[i].main.humidity+"%</p>"+
                "</div>"+
            "</div>"+
        "</div>";
    }
    return(fore);
}
