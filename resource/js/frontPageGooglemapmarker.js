var frontPageGooglemapmarker = {
		
		/*set global variables*/
		APP_NAME: "googlemapmarker",
		
		
		
		/*
		 * initialize and define the map for preview
		 */
		initialize: function(){ 
			//get the size of parent div
			var iMapWidth = $("#map_canvas").parent().width();
			var iMapHeight = $("#map_canvas").parent().height();
			
			/*set a minimum value if height is 0*/
			var iMinheigth = 200;
			
			if(iMapHeight == 0){
				iMapHeight = iMinheigth;
			}
			
			$("#map_canvas").css("width",iMapWidth);
			$("#map_canvas").css("height",iMapHeight);
			
			/*call the map init func*/
			frontPageGooglemapmarker.create_map();	
		},
		
		/*
		 * create the map
		 */	
		create_map: function(){
			
			/*get zoom*/
			var zoom = parseInt($("#"+frontPageGooglemapmarker.APP_NAME+"_zoom_level").val());
					
			/*get center lat lng*/
			var aMarkerData = frontPageGooglemapmarker.get_locations();
			var iLastMarker = aMarkerData.length - 1;
			var lat = aMarkerData[iLastMarker]['lat'];
			var lng = aMarkerData[iLastMarker]['lng'];
			
			
			/*get the maptype*/
			var map_type = $("#"+frontPageGooglemapmarker.APP_NAME+"_map_type").val();
			switch(map_type){
			case "Normal":
				maptype = google.maps.MapTypeId.ROADMAP;
				break;
			case "Satellite":
				maptype = google.maps.MapTypeId.SATELLITE;
				break;
			case "Hybrid":
				maptype = google.maps.MapTypeId.HYBRID;
				break;
			case "Terrain":
				maptype = google.maps.MapTypeId.TERRAIN;
				break;
			}
			
			/*display option*/
			var display_options = $("#"+frontPageGooglemapmarker.APP_NAME+"_display_options").val();
			var aDisplayOption = eval("(" + display_options + ")");

			
			/*zoom type option*/
			var zoom_type = aDisplayOption['zoom']['zoom_size'];
			switch(zoom_type){
			case "0":
			var zoom_option = google.maps.ZoomControlStyle.SMALL;
			break;
			case "1":
			var zoom_option =google.maps.ZoomControlStyle.LARGE;
			break;
			}
			
			/*map type option*/
			var map_option_type = aDisplayOption['map']['map_type'];
			switch(map_option_type){
			case "0":
			var mapOption = google.maps.MapTypeControlStyle.BAR
			break;
			case "1":
			var mapOption =google.maps.MapTypeControlStyle.DROPDOWN_MENU
			break;
			}
			
			/*positions*/
			var zoomPos = aDisplayOption['zoom']['zoom_position'];
			var mapPos = aDisplayOption['map']['map_position'];
			var scalePos = aDisplayOption['scale']['scale_position'];
			var streetPos = aDisplayOption['street']['street_position'];
			
			/*assign the values*/
			var zoomControl_flag = (aDisplayOption['zoom']['zoom_flag'] == 0)?false:true;
			var zoomControl_option = zoom_option;
			var zoomControl_position = frontPageGooglemapmarker.position_option(zoomPos);
			var mapTypeControl_flag = (aDisplayOption['map']['map_flag'] == 0)?false:true;
			var mapTypeControl_option = mapOption;
			var mapTypeControl_position = frontPageGooglemapmarker.position_option(mapPos);
			var scaleControl_flag = (aDisplayOption['scale']['scale_flag'] == 0)?false:true;
			var scaleControl_position = frontPageGooglemapmarker.position_option(scalePos);
			var streetControl_flag = (aDisplayOption['street']['street_flag'] == 0)?false:true;
			var streetControl_position = frontPageGooglemapmarker.position_option(streetPos);
			
			/*setmap options*/
			 var myOptions = {
				disableDefaultUI: true,
				panControl: false,
			    zoom: zoom,
			    center: new google.maps.LatLng(lat, lng),
			    mapTypeId: maptype,
			    zoomControl: zoomControl_flag,
			    zoomControlOptions: {
			        style: zoomControl_option,
			        position: zoomControl_position
			    	},
			    mapTypeControl: mapTypeControl_flag,
			    mapTypeControlOptions: {
			          style: mapTypeControl_option,
			          position: mapTypeControl_position
			        },    
			   scaleControl: scaleControl_flag,
			   scaleControlOptions: {
			         position: scaleControl_position
			        },
		        streetViewControl: streetControl_flag,
		        streetViewControlOptions: {
		            position: streetControl_position
		        }
			  }
			 
			 Googlemap.map_init(myOptions);
			 
			/*get the markers or locations*/
			var aMarkers = frontPageGooglemapmarker.get_locations();
		
			/*loop and create markers in map*/
			$.each(aMarkers, function(key, val){
				Googlemap.marker_init(val.loc,val.lat,val.lng,val.marker);
				
			});
			       
			
		},

		
		
		/*
		 * get the locations from the div
		 */
		get_locations: function(){
			
			var strid = "";
			var lat;
			var lng;
			var lng_len;
			var marker;
			var location_str;
			var idx;
			var locations = new Array();
			var sData = new Array;
			var aLocation = new Array();
			var aLatlng = new Array();
			var aMarCap = new Array();
			var i = 0;
			var id = $("#"+frontPageGooglemapmarker.APP_NAME+"_location_wrap").children("div").size();
			
			$.each($("input[name='"+frontPageGooglemapmarker.APP_NAME+"_marker[]']"), function(){
				idx = $(this).val();
				 strid += "+"+idx;
		
				location_str = strid.substr(1);
				
				locations = location_str.split("+");
				
				$.each(locations, function(index){

					aLocation = locations[index].split("(");
					aLocation['loc'] = aLocation[0];
					aLocation['latlng'] = aLocation[1];
								
					aLatlng = aLocation['latlng'].split(",");
					lat = parseFloat(aLatlng[0]);
					lng = parseFloat(aLatlng[1]);
					lng_len = aLatlng[2].length;
					marker = aLatlng[2].substr(0,lng_len-1);

					sData[i] = {lat: lat, lng: lng,loc: aLocation['loc'],marker: marker};
				});
				i++;
			});	
			
			return sData;

		},
		/*give the position for the controllers*/
		position_option: function(val){
			
			switch(val) {
			case '1':
				pos = google.maps.ControlPosition.TOP_RIGHT;
				break;
			case '2':
				pos = google.maps.ControlPosition.TOP_CENTER;
				break;
			case '3':
				pos = google.maps.ControlPosition.LEFT_TOP;
				break;
			case '4':
				pos = google.maps.ControlPosition.LEFT_CENTER;
				break;
			case '5':
				pos = google.maps.ControlPosition.LEFT_BOTTOM;
				break;
			case '6':
				pos = google.maps.ControlPosition.RIGHT_TOP;
				break;
			case '7':
				pos = google.maps.ControlPosition.RIGHT_CENTER;
				break;
			case '8':
				pos = google.maps.ControlPosition.RIGHT_BOTTOM;
				break;
			case '9':
				pos = google.maps.ControlPosition.BOTTOM_LEFT;
				break;
			case '10':
				pos = google.maps.ControlPosition.BOTTOM_RIGHT;
				break;
			case '11':
				pos = google.maps.ControlPosition.BOTTOM_CENTER;
				break;
			default:
				pos = google.maps.ControlPosition.TOP_LEFT;	
		}
			return pos;
	}
	
};


$(document).ready(function(){
	frontPageGooglemapmarker.initialize();

});
