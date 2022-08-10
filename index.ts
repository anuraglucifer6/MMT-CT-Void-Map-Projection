/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
 import { stationData } from './stationData';
 import { stationInfo } from './stationInfo';
 import {ctVoidStations} from './ctVoidStations';
 
 // Adds a marker to the map.
 function addMarker(
   location: google.maps.LatLngLiteral,
   icon: google.maps.Symbol,
   zIndex: number,
   map: google.maps.Map,
   infoWindow: google.maps.InfoWindow,
   infoString: string,
 ) {
   // Add the marker at the clicked location, and add the next-available label
   // from the array of alphabetical characters.
   const marker = new google.maps.Marker({
     position: location,
     icon: icon,
     zIndex: zIndex,
     map: map,
   });
 
   google.maps.event.addListener(marker, 'mouseover', function(e) {
     infoWindow.setPosition(e.latLng);
     infoWindow.setContent(infoString);
     infoWindow.open(map);
  });
  
  // Close the InfoWindow on mouseout:
  google.maps.event.addListener(marker, 'mouseout', function() {
     infoWindow.close();
  });
 }
 
 function initMap(): void {
   const center = { lat: 23, lng: 80 };
   const map = new google.maps.Map(
     document.getElementById('map') as HTMLElement,
     {
       zoom: 5.3,
       center: center,
     }
   );
   const infowindow = new google.maps.InfoWindow();
 
   // Add a marker at the center of the map.
   // addMarker(center, 'ANCHOR', map);
   const dataNotFound: string[] = [];
   ctVoidStations.forEach((stnCode) => {
     const location = stationData[stnCode];
     if (location !== undefined &&location.lat !== 0 && location.lng !== 0) {
       const {name = '', cityName = '', stateName = '' } = stationInfo[stnCode];
       const infoString = `<h3>${stnCode}</h3>${name}<br>${cityName}, ${stateName}`;
       addMarker(
         location,
         {
           path: google.maps.SymbolPath.CIRCLE,
           scale: 5,
           fillColor: '#FF0000',
           fillOpacity: 1.0,
           strokeWeight: 1,
         },
         5,
         map,
         infowindow,
         infoString,
       );
     } else {
      dataNotFound.push(stnCode);
     }
   });
   console.log(dataNotFound);
 }
 
 declare global {
   interface Window {
     initMap: () => void;
   }
 }
 window.initMap = initMap;
 export {};
 