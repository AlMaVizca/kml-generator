$(document).ready(function(){/* google maps -----------------------------------------------------*/
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

  /* position Amsterdam */
    var latlng = new google.maps.LatLng(-34.9205284,-57.9531702);

  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    zoom: 13
  };


  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    animation: google.maps.Animation.DROP
  });

    // var drawingManager = new google.maps.drawing.DrawingManager({
    //     drawingMode: google.maps.drawing.OverlayType.MARKER,
    //     drawingControl: true,
    //     drawingControlOptions: {
    //         position: google.maps.ControlPosition.TOP_CENTER,
    //         drawingModes: [
    //             google.maps.drawing.OverlayType.MARKER,
    //         ]}
    // });

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER
            ]
        },
        markerOptions: {
            editable: true,
            draggable: true
        }
    });

  drawingManager.setMap(map);
};
/* end google maps -----------------------------------------------------*/
});
