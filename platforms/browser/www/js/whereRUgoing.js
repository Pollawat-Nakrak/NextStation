var map;
var Let1;
var subA;
var map;
var longitude;
var latitude;
var start;
var end;
var marker;
var latLong
var test;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function onDeviceReady() {
 document.getElementById("getPosition").addEventListener("click", getPosition); 
 document.getElementById("search").addEventListener("click", search); 
}



function getPosition() {
 var options = {
  enableHighAccuracy: true,
  maximumAge: 3600000
}
var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

//////////////// START SET MYLOCATION  ////////////////////////////////////
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

  marker = new google.maps.Marker({
    position: latLong,
    map: map,
    animation: google.maps.Animation.BOUNCE,
    title: 'Hello World!'
  });

};

//////////////// END  SET MYLOCATION  ////////////////////////////////////

///////////////////////////  Error Report ///////////////////////////////////////

function onError(error) {
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}


}

///////////////////////////  End Report ///////////////////////////////////////

///////////////////////////  Start Search  ///////////////////////////////////////

function search(){
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30)
      };
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    }); 
    map.fitBounds(bounds);
    var BoundsToNumber = bounds.toString();
    var sub1 = BoundsToNumber.replace("((","");
    var sub2 = sub1.replace(",","");
    var res = sub2.split(" ");
    Let1 = res[0]; 
    var Let2 = res[1];
    subA = Let2.replace("),","");
    end = new google.maps.LatLng(Let1, subA);
  });
}

///////////////////////////  End Search  ///////////////////////////////////////






///////////////////////////  Start  setInterval Location   ///////////////////////////////////////

var myVar;
function myStartFunction() {

 if (end == null){
  alert ("กรุณาเลือกจุดหมายปลายทางบนแผนที่");
  StopGo();
} else{
  myVar = setInterval(function(){ Go(); }, 5000);}
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
  document.getElementById('open').style.display = "none";
  marker.setVisible(false); 
  getLocation()
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var request = {
    origin: latLong,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };


  directionsService.route(request, function (response, status) {

    alert ("Route");
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
      if (distanceVal <= 1000) {
        vibration();
      }
      else if (distanceVal > 1000) {
        alert("NO");
      }
    } else {
      alert ("Error");
    }
  });

}

/////////////////////////// START STOP GO ///////////////////////////////////////////

function StopGo() {
  getPosition();
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
}
////////////////////////////////////////END Vibration TEST ////////////////


//////////////////////////////////Open About//////////////////////////
function OpenAbout() {
  window.location = "about.html";
}
////////////////////////////////////////END Open About////////////////









