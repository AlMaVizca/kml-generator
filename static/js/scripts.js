var map;
var markers = [];


$(document).ready(function(){/* google maps -----------------------------------------------------*/

$('li').click(function(){
    $(this).addClass('isSelected');
});



google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

    /* position La Plata */
    var latlng = new google.maps.LatLng(-34.9205284,-57.9531702);

    var mapOptions = {
        center: latlng,
        scrollWheel: false,
        zoom: 13
    };


    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    google.maps.event.addListener(map,'click', function(event) {
        addMarker(event.latLng);
    });

};
    /* end google maps -----------------------------------------------------*/
});

// Add a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true
    });
    markers.push(marker);
    var newMarker = $("<li>").text(location);
    newMarker.addClass("panel-heading");
    newMarker.appendTo(".markers");
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
    console.log(markers);
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
