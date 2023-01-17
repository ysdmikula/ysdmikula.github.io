window.load  = function() {
    Loader.async = true;
    Loader.load(null, {poi:true}, createMap);
} 

window.createMap = function () { 
    let startPos;

    navigator.geolocation.getCurrentPosition((position) => {
        startPos = SMap.Coords.fromWGS84(position.coords.longitude, position.coords.latitude);
        map.setCenter(startPos);

    }, () => {
        startPos = SMap.Coords.fromWGS84(0, 0);
    
        map.setCenter(startPos);
        map.setZoom(5);
    })

    const map = new SMap(JAK.gel("map"), startPos, 15);
    map.addDefaultLayer(SMap.DEF_BASE).enable();

    map.addDefaultControls();

    let sync = new SMap.Control.Sync();
    map.addControl(sync);

    var markerLayer = new SMap.Layer.Marker();
    map.addLayer(markerLayer);
    markerLayer.enable();
    let marker;

    let infoLayer = new SMap.Layer.Marker(undefined, {
        poiTooltip: true
    });
    map.addLayer(infoLayer)
    infoLayer.enable();
    var dataProvider = map.createDefaultDataProvider();
    dataProvider.setOwner(map);
    dataProvider.addLayer(infoLayer);
    dataProvider.setMapSet(SMap.MAPSET_BASE);
    dataProvider.enable();
    
    map.getSignals().addListener(window.createMap, "map-click", click);
    function click(click) {

        let coords = SMap.Coords.fromEvent(click.data.event, map);

        let latInput = document.querySelector("#lat");
        let lngInput = document.querySelector("#lng");
        latInput.value = coords.y;
        lngInput.value = coords.x;

        if (marker == undefined) {
            marker = new SMap.Marker(coords, "marker");
            markerLayer.addMarker(marker);
        } else {
            markerLayer.removeMarker(marker);
            marker = new SMap.Marker(coords, "marker");
            markerLayer.addMarker(marker);
        }

        new SMap.Geocoder.Reverse(coords, (geocoder) => {
            let placeInput = document.querySelector("#place");
            placeInput.value = geocoder.getResults().label;
        });

    } 
}

load();   

document.querySelector("#submit").addEventListener("click", localFile);
function localFile(event) {
    event.preventDefault();
    const destLat = document.querySelector("#lat").value;
    const destLng = document.querySelector("#lng").value;
    const place = document.querySelector("#place").value;
    const dateValue = document.querySelector("#date").value;
    const dateSplit = dateValue.split("-");
    const day = dateSplit[2];
    const month = dateSplit[1];
    const year = dateSplit[0];
    let date = day + "." + month + "." + year;
    const notes = document.querySelector("#notes").value;
   
    if (destLat !="" && destLng !="" && place !="") {
        const fileName = document.querySelector("#place").value + ".txt";

        if (dateValue == "") {
            date = "";
        }

        const fileData = "Zeměpisná šířka: " + destLat + "\n" +
        "Zeměpisná délka: " + destLng + "\n" +
        "Stát: " + place + "\n" +
        "Datum: " + date  + "\n" +
        "Poznámky: " + notes + "\n";

        let blob = new Blob([fileData], {type: "text/plain"});
        
        let downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.href = window.webkitURL.createObjectURL(blob);
        downloadLink.click();  

    } else {
        if (document.querySelector("#errorMsg")) {
            document.querySelector("#errorMsg").remove();
        }

        const errorMsg = document.createElement("p");
        document.querySelector("form").appendChild(errorMsg);
        errorMsg.setAttribute("id", "errorMsg");
        errorMsg.textContent = "Vyberte si místo na mapě!";
        errorMsg.style = "font-size: 24px; font-weight: bold;";
        
        // alert("Vyberte si místo na mapě!");
    }
} 

let mode = "white";
document.querySelector("#LDMode").addEventListener("click", () => {
    let form = document.querySelector("form");
    let LDMode = document.querySelector("#LDMode");
    let body = document.querySelector("body");
    let icon = document.querySelector("#LDMode span");
    if (mode == "white") {
        form.style.filter = "invert(1)";
        LDMode.style.filter = "invert(1)";
        body.style.background = "black";
        body.style.transition = "background 0.5s ease-in-out";
        icon.textContent = "dark_mode";
        mode = "black"
    } else {
        form.style.filter = "invert(0)";
        LDMode.style.filter = "invert(0)";
        body.style.background = "white";
        body.style.transition = "background 0.5s ease-in-out";
        icon.textContent = "brightness_7";
        mode = "white"
    }

})



// window.initMap = initMap;

// let map;

// function initMap() {
//     let startPos = { 
//         lat: 43.651070, 
//         lng: -79.347015
//     };

//     map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 8,
//         center: startPos,
//     });

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {

//             startPos = { 
//                 lat: position.coords.latitude, 
//                 lng: position.coords.longitude
//             };
//             map.setCenter(startPos);
//             map.setZoom(16);
//         });
//     }

//     const geocoder = new google.maps.Geocoder();
    
//     let marker;

//     google.maps.event.addListener(map, "click", function(clickPos){
//         if (marker && marker.setMap) {
//             marker.setMap(null);
//         }

//         marker = new google.maps.Marker({
//             position: clickPos.latLng,
//             map: map,
//         }); 
       
//         let lat = clickPos.latLng.lat();
//         let lng = clickPos.latLng.lng();
  
//         map.setCenter({ lat: lat, lng: lng});
         
//         document.querySelector("#lat").value = lat;
//         document.querySelector("#lng").value = lng;

//     geocoder
//       .geocode({ location: clickPos.latlng })
//       .then((response) => {
//         if (response.results[0]) {
//             console.log(response);
//         //   map.setZoom(11);
  
//         //   const marker = new google.maps.Marker({
//         //     position: latlng,
//         //     map: map,
//         //   });
  
//         //   infowindow.setContent(response.results[0].formatted_address);
//         //   infowindow.open(map, marker);
            
//         const locationP = document.createElement("p");
//         document.querySelector("form").appendChild(locationP);
//         locationP.textContent = response.results[0].formatted_address;

//         } else {
//           window.alert("No results found");
//         }
//       })
//       .catch((e) => window.alert("Geocoder failed due to: " + e));

//     });
   
   
   
// }




