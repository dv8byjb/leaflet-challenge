// Creating map object
var myMap = L.map("map", {
    center: [31.77, -109.4179],
    zoom: 11,
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(mag) {
    if (mag <= 1) {
        return "#52BE80";
    } else if (mag <= 2) {
        return "#FFC300";
    } else if (mag <= 3) {
        return "#33FFFC";
    } else if (mag <= 4) {
        return "#33FFFC";
    } else if (mag <= 5) {
        return "#A47EC4";
    } else {
        return "#FAF747";
    };
}

// Grabbing our GeoJSON data..
function markersize(mag) {
    return mag * 4
}
d3.json(link, function (earthquakeData) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJSON(earthquakeData, {
        // Style each feature (in this case a neighborhood)
        style: function (feature) {
            return {
                color: "white",
                // Call the chooseColor function to decide which color to color 
                fillColor: chooseColor(feature.properties.mag),
                fillOpacity: 0.5,
                weight: 1.5
            };
        },

        // Called on each feature and point to layer
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markersize(feature.properties.mag),
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " + feature.properties.mag + "</p>")

        }
    }).addTo(myMap);

    var Legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitudes = [0, 1, 2, 3, 4, 5];

        for (var i = 0; i < mag.length; i++) {
            div.innerHTML +=
                '<i style="background:' + chooseColor(mag[i] + 1) + '"></i> ' +
                + mag[i] + (mag[i + 1] ? ' - ' + mag[i + 1] + '<br>' : ' + ');
        }

        return div;
    };

    legend.addTo(myMap);
});
