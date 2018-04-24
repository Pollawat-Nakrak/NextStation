var map;
var contentString;
var pic;
var StartPoint;
var FinalPoint;
var marker;
var markerMylocation;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function onDeviceReady() {
  document.getElementById("getPosition").addEventListener("click", getPosition);
  document.getElementById("search").addEventListener("click", search);
  document.getElementById("vibration").addEventListener("click", vibration);
}
function getPosition() {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 3600000
  }
  var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  //////////////// START SET MYLOCATION  /////////////////////////////////////////////////////////////////////////////////////////////////
  function onSuccess(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    StartPoint = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      center: StartPoint,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //////////////// START Marker BTS  /////////////////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < locat.length; i++) {
      marker = new google.maps.Marker({
        map: map,
        position: {
          lat: locat[i].lat,
          lng: locat[i].lng
        },
        icon: "img/" + locat[i].pic + ".png",
        title: locat[i].name,
        animation: google.maps.Animation.DROP,
        scaledSize: new google.maps.Size(42, 68)
      });
      attachMessage(marker, locat[i].name, locat[i].lat, locat[i].lng);
    }
    //////////////// END Marker BTS /////////////////////////////////////////////////////////////////////////////////////////////////
    markerMylocation = new google.maps.Marker({
      position: StartPoint,
      map: map,
      animation: google.maps.Animation.BOUNCE,
      title: 'Hello World!'
    });

  };
  //////////////// END  SET MYLOCATION  /////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////// Start Check Eror MYLOCATION   /////////////////////////////////////////////////////////////////////////////////////////////////
  function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }
  //////////////// END Check Eror MYLOCATION   /////////////////////////////////////////////////////////////////////////////////////////////////
}
////////////////////////////Start Show Message ////////////////////////////////////////////////////////////////////
function attachMessage(marker, contentString, latt, lngg) {
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function () {
    FinalPoint = new google.maps.LatLng(latt, lngg);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    infowindow.open(map, marker);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  });
}
////////////////////////////End Show Message ////////////////////////////////////////////////////////////////////
///////////////////////////  Start  setInterval Location   ///////////////////////////////////////
var myVar;
function myStartFunction() {
  if (FinalPoint == null) {
    alert("กรุณาเลือกจุดหมายปลายทางบนแผนที่");
    StopGo();
  }
  else {
    myVar = setInterval(function () { Go(); }, 2000);
  }
}
///////////////////////////  End  setInterval Location   ///////////////////////////////////////
function getLocation() {
  if (navigator.geolocation) {
    getGeoLocation();
  } else {
    alert("CAN'T GET LOCATION");
  }
}
function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(updateLocation, errorHandler, { enableHighAccuracy: true, maximumAge: 60000 });
}
function updateLocation(position) {
  longitude = position.coords.longitude;
  latitude = position.coords.latitude;
  StartPoint = new google.maps.LatLng(latitude, longitude);
}
function errorHandler(error) {
  console.log('Geolocation error : code ' + error.code + ' - ' + error.message);
}
///////////////////////////  Start  GO   ///////////////////////////////////////
function Go() {
  markerMylocation.setVisible(false);
  getLocation()
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var request = {
    origin: StartPoint,
    destination: FinalPoint,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
          var distanceText = response.routes[0].legs[0].distance.text; // ระยะทางข้อความ
          var distanceVal = response.routes[0].legs[0].distance.value;// ระยะทางตัวเลข
          var durationText = response.routes[0].legs[0].duration.text; // ระยะเวลาข้อความ
          var durationVal = response.routes[0].legs[0].duration.value; // ระยะเวลาตัวเลข    
          $("#distance_text").val(distanceText);
          $("#distance_value").val(distanceVal);
          $("#duration_text").val(durationText);
          $("#duration_value").val(durationVal);
       if (distanceVal <= 1000) {
               vibration();
      }
    } else {
      alert("Error");
    }
  });
}
/////////////////////////// End Go ///////////////////////////////////////////
////////////////////////////////////////Start Navigation Drawer////////////////////////////////////////////
function OpenTabLeft() {
  var menu = document.getElementById('menu');
  menu.open();
};
//////////////////////////////////////// End Navigation Drawer ////////////////////////////////////////
/////////////////////////// START STOP GO ///////////////////////////////////////////
function StopGo() {
  location.reload();
}
/////////////////////////// End STOP Go ///////////////////////////////////////////
//////////////////////// OPEN BTS /////////////////////////////////////////////
function OpenBTS() {
  window.location = "index.html";
}
///////////////////////// END  BTS ///////////////////////////////////
//////////////////////// OPEN Where R You /////////////////////////////////////////////
function OpenWhereRYou() {
  window.location = "whereRUgoing.html";
}
///////////////////////// END  Where R You ///////////////////////////////////
//////////////////////////////////Vibration TEST ///////////////////////////
function vibration() {
  var time = 3000;
  navigator.vibrate(time);
}
////////////////////////////////////////END Vibration TEST ////////////////
//////////////////////////////////Open About//////////////////////////
function OpenAbout() {
  window.location = "about.html";
}
////////////////////////////////////////END Open About////////////////



