/*
 * Googlemap functions
 */
var Googlemap = {
		
		/*global variables*/
		map : null,
		
	
	/*
	 * create the map object and display in map_canvas
	 */
	map_init : function(myOptions)
	{
	 Googlemap.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);	
	},
	
	
	marker_init: function(locations,lat,lng,marker_type){
		
		/*image*/

		var bIfUrl = Googlemap.validURL(marker_type);
			
			if(bIfUrl){
				var image_icon = marker_type;
			}else{
				var image_icon = '/_sdk/img/googlemapmarker/icon_marker_0'+marker_type+'.png';
			}
		
		
		Googlemap.markers = new google.maps.Marker({
			  position: new google.maps.LatLng(lat,lng),
			  map: Googlemap.map,
			  title: locations,
			  clickable: true,
			  draggable: true,
			  icon: image_icon
			});
		
	},
	validURL: function(str) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(str);
	}
};