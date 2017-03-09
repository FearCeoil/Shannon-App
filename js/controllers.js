function toKPH(num) {
    num = num / 1000 * 60 * 60;
    return num.toFixed(0);
}

function sub(data) {
    data = data.substring(10, 16);
    return data;
}

function capitalize(str) {
    str = str.toLowerCase();
    return str.replace(/([^ -])([^ -]*)/gi, function (v, v1, v2) { return v1.toUpperCase() + v2; });
}

function windDir(data) {
    if (data >= 348.75 && data <= 11.25) {
        data = 'N';
    } else if (data >= 11.25 && data <= 33.75) {
        data = 'NNE';
    } else if (data >= 33.75 && data <= 56.25) {
        data = 'NE';
    } else if (data >= 56.25 && data <= 78.75) {
        data = 'ENE';
    } else if (data >= 78.75 && data <= 101.25) {
        data = 'E';
    } else if (data >= 101.25 && data <= 123.75) {
        data = 'ESE';
    } else if (data >= 123.75 && data <= 146.25) {
        data = 'SE';
    } else if (data >= 146.25 && data <= 168.75) {
        data = 'SSE';
    } else if (data >= 168.75 && data <= 191.25) {
        data = 'S';
    } else if (data >= 191.25 && data <= 213.75) {
        data = 'SSW';
    } else if (data >= 213.75 && data <= 236.25) {
        data = 'SW';
    } else if (data >= 236.25 && data <= 258.75) {
        data = 'WSW';
    } else if (data >= 258.75 && data <= 281.25) {
        data = 'W';
    } else if (data >= 281.25 && data <= 303.75) {
        data = 'WNW';
    } else if (data >= 303.75 && data <= 326.25) {
        data = 'NW';
    } else {
        data = 'NNW';
    }

    return data;
}

function toBeauford(data) {

    if (data < 1) {
        data = 0;
    } else if (data >= 1 && data <= 5) {
        data = 1;
    } else if (data >= 6 && data <= 11) {
        data = 2;
    } else if (data >= 12 && data <= 19) {
        data = 3;
    } else if (data >= 20 && data <= 28) {
        data = 4;
    } else if (data >= 29 && data <= 38) {
        data = 5;
    } else if (data >= 39 && data <= 49) {
        data = 6;
    } else if (data >= 50 && data <= 61) {
        data = 7;
    } else if (data >= 62 && data <= 74) {
        data = 8;
    } else if (data >= 75 && data <= 88) {
        data = 9;
    } else if (data >= 89 && data <= 102) {
        data = 10;
    } else if (data >= 103 && data <= 117) {
        data = 11;
    } else {
        data = 12;
    }

    return data;
}

function warning(data) {

    if(data >=50 && data <= 64){
        data = 1;
    } else if (data >= 65 && data <= 79) {
        data = 2;
    } else if (data >= 80) {
        data = 3;
    } else {
        data = 0;
    }

    return data;
}

function Day(data) {
    if (data === 0) {
        data = "Sunday";
    } else if (data === 1) {
        data = "Monday";
    } else if (data === 2) {
        data = "Tuesday";
    } else if (data === 3) {
        data = "Wednesday";
    } else if (data === 4) {
        data = "Thursday";
    } else if (data === 5) {
        data = "Friday";
    } else {
        data = "Saturday";
    }
    return data;
}

angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, Blog, $ionicLoading, $state, $location) {
   //$ionicLoading.show();
    Blog.all().success(function (data) {
        console.log("got it")

        $scope.nodes = data;
        $scope.browse = function (v) {
            window.open(v, "_system", "location=yes");
        };
        $ionicLoading.hide();
        }).error(function (data) {
            console.log("ERROR: " + data);
            $state.go("app.error");
    });

})

.controller('HomeCtrl', function ($scope) {

})

.controller('LoughReeCtrl', function ($scope, loughReeWeather, Beaufort, Hourly, $ionicLoading, $location) {
    //$ionicLoading.show();
    loughReeWeather.all().success(function (response) {
        //Current Weather
        var date = new Date(response.list[0].dt * 1000);
        var day = Day(date.getDay());      
        var location = response.city.name;
        var currentWeather = capitalize(response.list[0].weather[0].description);
        var currentTemp = response.list[0].temp.day.toFixed(0);
        var wind = toKPH(response.list[0].speed);
        var windb = toBeauford(toKPH(response.list[0].speed));
        var windDeg = windDir(response.list[0].deg);
        var weatherIcon = response.list[0].weather[0].icon;
        var weatherIconSrc = "img/weatherIcons/" + weatherIcon + ".png";
        var windDirIconSrc = "img/windIcons/" + windDeg + ".png";

        $scope.location = location;
        $scope.weather = currentWeather;
        $scope.temp = currentTemp;
        $scope.windSpeed = wind;
        $scope.windDirIcon = windDirIconSrc;
        $scope.weatherIcon = weatherIconSrc;
        $scope.windDir = windDeg;

        //Tomorrows Weather
        var date1 = new Date(response.list[1].dt * 1000);
        var day1 = Day(date1.getDay());
        var currentWeather1 = capitalize(response.list[1].weather[0].description);
        var currentTemp1 = response.list[1].temp.day.toFixed(0);
        var wind1 = toKPH(response.list[1].speed);
        var windb1 = toBeauford(toKPH(response.list[0].speed));
        var windDeg1 = windDir(response.list[1].deg);
        var weatherIcon1 = response.list[1].weather[0].icon;
        var weatherIconSrc1 = "img/weatherIcons/" + weatherIcon1 + ".png";
        var windDirIconSrc1 = "img/windIcons/" + windDeg1 + ".png";

        $scope.day1 = day1;
        $scope.weather1 = currentWeather1;
        $scope.temp1 = currentTemp1;
        $scope.windSpeed1 = wind1;
        $scope.windDirIcon1 = windDirIconSrc1;
        $scope.weatherIcon1 = weatherIconSrc1;
        $scope.windDir1 = windDeg1;

        //Weather 2 days from now
        var date2 = new Date(response.list[2].dt * 1000);
        var day2 = Day(date2.getDay());
        var currentWeather2 = capitalize(response.list[2].weather[0].description);
        var currentTemp2 = response.list[2].temp.day.toFixed(0);
        var wind2 = toKPH(response.list[2].speed);
        var windb2 = toBeauford(toKPH(response.list[2].speed));
        var windDeg2 = windDir(response.list[2].deg);
        var weatherIcon2 = response.list[2].weather[0].icon;
        var weatherIconSrc2 = "img/weatherIcons/" + weatherIcon2 + ".png";
        var windDirIconSrc2 = "img/windIcons/" + windDeg2 + ".png";

        $scope.day2 = day2;
        $scope.weather2 = currentWeather2;
        $scope.temp2 = currentTemp2;
        $scope.windSpeed2 = wind2;
        $scope.windDirIcon2 = windDirIconSrc2;
        $scope.weatherIcon2 = weatherIconSrc2;
        $scope.windDir2 = windDeg2;

        if (warning(wind) == 1) {
            $scope.show = 'msg1';
        } else if (warning(wind) == 2) {
            $scope.show = 'msg2';
        } else if (warning(wind) == 3) {
            $scope.show = 'msg3';
        } else {
            $scope.show = '';
        }



        Beaufort.all().success(function (response) {
            var pos = windb;
            $scope.beaufortNum = pos;
            $scope.beaufortDes = response[pos].description;
            $scope.beaufortCon = response[pos].conditions;
        });

            Hourly.all().success(function (hw) {
                $scope.dt = sub(hw.list[0].dt_txt);
                $scope.dt1 = sub(hw.list[1].dt_txt);
                $scope.dt2 = sub(hw.list[2].dt_txt);
                $scope.dt3 = sub(hw.list[3].dt_txt);
                $scope.dt4 = sub(hw.list[4].dt_txt);

                $scope.ws = toKPH(hw.list[0].wind.speed);
                $scope.ws1 = toKPH(hw.list[1].wind.speed);
                $scope.ws2 = toKPH(hw.list[2].wind.speed);
                $scope.ws3 = toKPH(hw.list[3].wind.speed);
                $scope.ws4 = toKPH(hw.list[4].wind.speed);

                $scope.wd = windDir(hw.list[0].wind.deg);
                $scope.wd1 = windDir(hw.list[1].wind.deg);
                $scope.wd2 = windDir(hw.list[2].wind.deg);
                $scope.wd3 = windDir(hw.list[3].wind.deg);
                $scope.wd4 = windDir(hw.list[4].wind.deg);


                Beaufort.all().success(function (response) {
                    $scope.b = toBeauford(toKPH(hw.list[0].wind.speed));
                    $scope.b1 = toBeauford(toKPH(hw.list[1].wind.speed));
                    $scope.b2 = toBeauford(toKPH(hw.list[2].wind.speed));
                    $scope.b3 = toBeauford(toKPH(hw.list[3].wind.speed));
                    $scope.b4 = toBeauford(toKPH(hw.list[4].wind.speed));

                });

            });
                //$ionicLoading.hide();
    }).error(function () {
            $state.go("app.error");
    });

})

.controller('LoughAllenCtrl', function ($scope,loughAllenWeather, Beaufort, Hourly, $ionicLoading) {
    $scope.test = "Lough Allen";
})

.controller('LoughDergCtrl', function ($scope,loughDergWeather, Beaufort, Hourly, $ionicLoading) {
    $scope.test = "Lough Derg";
})

.controller('journeyCtrl', function ($scope) {
    $scope.cruiseTime = "";
    $scope.form = { start: "Killaloe", des: "Enniskillin" }

    var Killaloe = [43, 38, 34, 31, 28, 21, 20, 19, 17, 15, 14, 11, 9, 7, 4, 2, 0];
    var Scarriff = [43, 38, 34, 31, 28, 21, 20, 18, 17, 15, 14, 11, 9, 7, 4, 0, 2];
    var Portummna = [39, 34, 30, 27, 24, 17, 16, 14, 13, 11, 10, 7, 5, 3, 0, 4, 4];
    var Banagher = [36, 31, 27, 24, 21, 14, 13, 11, 0, 8, 7, 4, 2, 0, 3, 7, 7];
    var Shannonbridge = [34, 29, 25, 22, 19, 12, 11, 9, 10, 8, 7, 4, 2, 0, 2, 5, 9, 9];
    var Athlone = [32, 27, 23, 20, 17, 10, 9, 7, 6, 4, 2, 0, 2, 4, 7, 11, 11];
    var Lanesborough = [29, 24, 20, 16, 14, 7, 6, 4, 3, 1, 0, 2, 4, 7, 10, 14, 14];
    var Tarmonbarry = [28, 23, 19, 15, 13, 6, 5, 3, 2, 0, 1, 4, 7, 8, 11, 15, 15];
    var Roosky = [26, 21, 17, 14, 11, 4, 3, 1, 0, 2, 3, 6, 8, 10, 13, 17, 17];
    var Dromod = [25, 20, 16, 13, 10, 3, 2, 0, 1, 3, 4, 7, 9, 11, 14, 18, 19];
    var Carrick = [23, 18, 14, 11, 8, 1, 0, 2, 3, 5, 6, 9, 11, 13, 16, 20, 20];
    var Leitrim = [22, 16, 13, 10, 7, 0, 1, 3, 4, 6, 7, 10, 12, 14, 17, 21, 21];
    var Ballinamore = [15, 10, 6, 3, 0, 7, 8, 10, 11, 13, 14, 17, 19, 21, 24, 28, 28];
    var Ballyconnell = [12, 7, 3, 0, 3, 10, 11, 13, 14, 15, 16, 20, 22, 24, 27, 31, 31];
    var Belturbet = [9, 4, 0, 3, 6, 13, 14, 16, 17, 19, 20, 23, 25, 27, 30, 34, 34];
    var Enniskillin = [5, 0, 4, 7, 10, 16, 18, 20, 21, 23, 24, 27, 29, 31, 34, 38, 38];
    var Beleek = [0, 5, 9, 12, 15, 22, 23, 25, 26, 28, 29, 32, 34, 36, 39, 43, 43];

    var des = ["Beleek", "Enniskillin", "Belturbet", "Ballyconnell", "Ballinamore", "Leitrim",
               "Carrick on Shannon", "Dromod", "Roosky", "Tarmonbarry", "Lanesborough",
               "Athlone", "Shannonbridge", "Banagher", "Portummna", "Scarriff", "Killaloe"];
    var start;

    $scope.onSubmit = function () {

        if ($scope.form.start == "Killaloe") {
            start = Killaloe;
        } else if ($scope.form.start == "Scarriff") {
            start = Scarriff;
        } else if ($scope.form.start == "Portummna") {
            start = Portummna;
        } else if ($scope.form.start == "Banagher") {
            start = Banagher;
        } else if ($scope.form.start == "Shannonbridge") {
            start = Shannonbridge;
        } else if ($scope.form.start == "Athlone") {
            start = Athlone;
        } else if ($scope.form.start == "Lanesborough") {
            start = Lanesborough;
        } else if ($scope.form.start == "Tarmonbarry") {
            start = Tarmonbarry;
        } else if ($scope.form.start == "Roosky") {
            start = Roosky;
        } else if ($scope.form.start == "Dromod") {
            start = Dromod;
        } else if ($scope.form.start == "Carrick on Shannon") {
            start = Carrick;
        } else if ($scope.form.start == "Leitrim") {
            start = Leitrim;
        } else if ($scope.form.start == "Ballinamore") {
            start = Ballinamore;
        } else if ($scope.form.start == "Ballyconnell") {
            start = Ballyconnell;
        } else if ($scope.form.start == "Belturbet") {
            start = Belturbet;
        } else if ($scope.form.start == "Enniskillin") {
            start = Enniskillin;
        } else if ($scope.form.start == "Beleek") {
            start = Beleek;
        }

        $scope.cruiseTime = " The average cruising time between " + $scope.form.start + " and " + $scope.form.des + " is " + start[des.indexOf($scope.form.des)] + " hours";

    }
})

.controller('Checklist', function ($scope, loughDergWeather, Beaufort, Hourly, $ionicLoading) {
    $scope.items = [
        "Fuel",
        "Water",
        "Oil Pressure"
    ];
})




