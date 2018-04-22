var map;
var contentString;
var pic;
var lati1;
var long1;
var latLong;
var latLong1;
var longitudeS;
var latitudeS;
var marker;
var markerMylocation;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function onDeviceReady() {
 document.getElementById("getPosition").addEventListener("click", getPosition); 
 document.getElementById("search").addEventListener("click", search); 
 document.getElementById("vibration").addEventListener("click", vibration);
 document.getElementById("vibrationPattern").addEventListener("click", vibrationPattern);
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
  latLong = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    center: latLong,
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
  scaledSize:new google.maps.Size(42, 68)
});
  attachMessage(marker, locat[i].name,locat[i].lat,locat[i].lng);
}
//////////////// END Marker BTS /////////////////////////////////////////////////////////////////////////////////////////////////
markerMylocation = new google.maps.Marker({
  position: latLong,
  map: map,
  animation: google.maps.Animation.BOUNCE,
  title: 'Hello World!'
});

};
//////////////// END  SET MYLOCATION  /////////////////////////////////////////////////////////////////////////////////////////////////

//////////////// Start Check Eror MYLOCATION   /////////////////////////////////////////////////////////////////////////////////////////////////
function onError(error) {
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
//////////////// END Check Eror MYLOCATION   /////////////////////////////////////////////////////////////////////////////////////////////////


}

////////////////////////////Start Show Message ////////////////////////////////////////////////////////////////////

function attachMessage(marker, contentString,latt,lngg) {
  var infowindow = new google.maps.InfoWindow({
    content: contentString

  });
  marker.addListener('click', function () {
    latLong1 = new google.maps.LatLng(latt, lngg);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    infowindow.open(map, marker);

    if (marker.getAnimation() !== null){
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
  if (latLong1 == null){
    alert ("กรุณาเลือกจุดหมายปลายทางบนแผนที่");
    StopGo();
  }
  else {
    myVar = setInterval(function(){ Go(); }, 2000);
  }
}

///////////////////////////  End  setInterval Location   ///////////////////////////////////////

function getLocation() {
  if (navigator.geolocation) {
    getGeoLocation();
  } else { 
    alert ("CAN'T GET LOCATION");
  }
}

function getGeoLocation() {

  navigator.geolocation.getCurrentPosition(updateLocation, errorHandler, { enableHighAccuracy: false, maximumAge: 60000, timeout: 27000 });
}
function updateLocation(position) {

  longitudeS = position.coords.longitude;
  latitudeS = position.coords.latitude;
  latLong = new google.maps.LatLng(latitudeS, longitudeS);
}

function errorHandler(error) {
  console.log('Geolocation error : code ' + error.code + ' - ' + error.message);
}

///////////////////////////  Start  GO   ///////////////////////////////////////

function Go(){
  markerMylocation.setVisible(false); 
  getLocation()
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var request = {
    origin: latLong,
    destination: latLong1,
    travelMode: google.maps.TravelMode.DRIVING
  };


  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
//     var addressStart=response.routes[0].legs[0].start_address; // สถานที่เริ่มต้น
//     var addressEnd=response.routes[0].legs[0].end_address;// สถานที่ปลายทาง
    var distanceText=response.routes[0].legs[0].distance.text; // ระยะทางข้อความ
    var distanceVal=response.routes[0].legs[0].distance.value;// ระยะทางตัวเลข
    var durationText=response.routes[0].legs[0].duration.text; // ระยะเวลาข้อความ
    var durationVal=response.routes[0].legs[0].duration.value; // ระยะเวลาตัวเลข    
    if (distanceVal <= 1000) {
  vibration();
}
//     $("#namePlaceGet").val(addressStart);
//     $("#toPlaceGet").val(addressEnd);
    $("#distance_text").val(distanceText);
    $("#distance_value").val(distanceVal);
    $("#duration_text").val(durationText);
    $("#duration_value").val(durationVal);   

} else {
  alert ("Error");
}
});

}


/////////////////////////// End Go ///////////////////////////////////////////
/////////////////////////// START STOP GO ///////////////////////////////////////////

function StopGo() {
  clearInterval(myVar);
  location.reload();
}
/////////////////////////// End STOP Go ///////////////////////////////////////////


//////////////////////// OPEN BTS /////////////////////////////////////////////

function OpenBTS(){
  window.location="index.html";
}

///////////////////////// END  BTS ///////////////////////////////////



//////////////////////// OPEN Where R You /////////////////////////////////////////////

function OpenWhereRYou(){
  window.location="whereRUgoing.html";
}

///////////////////////// END  Where R You ///////////////////////////////////


//////////////////////////////////Vibration TEST ///////////////////////////
function vibration() {
  var time = 3000;
  navigator.vibrate(time);
  alert ("Vibration");
}
////////////////////////////////////////END Vibration TEST ////////////////