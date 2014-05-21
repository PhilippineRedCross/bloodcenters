//global variable
var bloodCenterData = [];

var map = L.map('map').setView([12, 124], 5);

var mapAttribution = 'Map data &copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a> | Map style by <a href="http://hot.openstreetmap.org" target="_blank">H.O.T.</a> | &copy; <a href="http://redcross.org" title="Red Cross" target="_blank">Red Cross</a> 2013 | <a title="Disclaimer" onClick="showDisclaimer();">Disclaimer</a>';
var osmUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
var osmOptions = {
	attribution: mapAttribution,
	minZoom: 5
}

var openStreetMap = L.tileLayer(osmUrl, osmOptions);

openStreetMap.addTo(map);

// beginning of function chain to initialize
function getBloodCenterData() {
    $.ajax({
        type: 'GET',
        url: 'data/NationalBloodCenters.geojson',
        contentType: 'application/json',
        dataType: 'json',
        timeout: 10000,
        success: function(data) {
            bloodCenterData = data;  
            mapBloodCenterData();                     
           },
        error: function(e) {
            console.log(e);
        }
    });
}

function mapBloodCenterData(){
	L.geoJson(bloodCenterData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng);
		}
	}).addTo(map);
}

getBloodCenterData();