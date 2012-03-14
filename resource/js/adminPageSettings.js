var adminPageSettings = {
		
		/*set global variables*/
		APP_NAME: $("#APP_NAME").val(),
		
		/*alert box*/
		alert_box: function(sErrMess){
			
			$("#"+adminPageSettings.APP_NAME+"_alertbox").remove();
			
			$("body").append("<div id='"+adminPageSettings.APP_NAME+"_alertbox' ><div id='"+adminPageSettings.APP_NAME+"_admin_popup_contents' class='admin_popup_contents'></div></div>");
			
			$("#"+adminPageSettings.APP_NAME+"_admin_popup_contents").empty().append(sErrMess+"<br /><br />");
			
			/*popup dialogbox*/
			var sContainer = adminPageSettings.APP_NAME+"_alertbox";
			var iWidth = 200;
			var sTitle = "Warning";
			adminPageSettings.open_popup(sContainer,iWidth,sTitle);
			
		},
		/*image url*/
		enable_image_url: function(){
			
			var marker_type = $('input:radio[name=marker_type]:checked').val();
			

			if(marker_type == 6) {
				$("#"+adminPageSettings.APP_NAME+"_image_url").removeAttr("disabled");
				$("#"+adminPageSettings.APP_NAME+"_image_url").val("");
			}else{
				$("#"+adminPageSettings.APP_NAME+"_image_url").attr("disabled",true);
				$("#"+adminPageSettings.APP_NAME+"_image_url").val("Input url for marker icon");
			}
		},
		
		/*
		 * initialize and define the map for preview
		 */
		initialize: function(){
			/*give the map canvas its size*/
			$("#map_canvas").css("width","600px");
			$("#map_canvas").css("height","450px");
			 
			/*call the map init func*/
			adminPageSettings.create_map();	
		},
		
		/*
		 * create the map
		 */	
		create_map: function(){

			
			/*get center lat lng*/
			var aMarkerData = adminPageSettings.get_locations();
			var iLastMarker = aMarkerData.length - 1;
			
			loc = $("#"+adminPageSettings.APP_NAME+"_cen_loc").val()
			lat = aMarkerData[iLastMarker]['lat']
			lng = aMarkerData[iLastMarker]['lng']
			
			/*get zoomlevel*/
			zoom = parseInt($("#"+adminPageSettings.APP_NAME+"_zoom").val());  //set zoom level
			
			/*get the maptype*/
			switch($("#"+adminPageSettings.APP_NAME+"_maptype").val()){
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
			
			/*setup the controllers*/
			var zoomControl_flag = adminPageSettings.zoom_init();
			var zoomControl_option = adminPageSettings.zoom_option();
			var zoomControl_position = adminPageSettings.position_option($("#zoom_position").val());
			
			var mapTypeControl_flag = adminPageSettings.mapTypeControl_init();
			var mapTypeControl_option = adminPageSettings.mapTypeControl_option();
			var mapTypeControl_position = adminPageSettings.position_option($("#map_type_position").val());
			
			var scaleControl_flag = adminPageSettings.scale_init();
			var scaleControl_position = adminPageSettings.position_option($("#scale_control_position").val());
			
			var streetControl_flag = adminPageSettings.street_init();
			var streetControl_position = adminPageSettings.position_option($("#street_view_position").val());

			
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
				var aMarkers = adminPageSettings.get_locations();
		
				/*loop and create markers in map*/
				$.each(aMarkers, function(key, val){
					Googlemap.marker_init(val.loc,val.lat,val.lng,val.marker);
				
				});
			
		},

		/*
		 * set zoom
		 */
		zoom_init: function(){
			var bControl = $('input:checkbox[name=zoom_control]').is(':checked') ? true : false;
			
			(bControl == true)?$("#zoom_size").removeAttr('disabled'):$("#zoom_size").attr('disabled', 'true');
			(bControl == true)?$("#zoom_position").removeAttr('disabled'):$("#zoom_position").attr('disabled', 'true');
			
			return bControl;
		},
		
		/*
		 * set zoom options
		 */
		zoom_option: function(){
			
			var zoom_type = $("#zoom_size").val();
			
			switch(zoom_type){
			case "0":
			return google.maps.ZoomControlStyle.SMALL;
			break;
			case "1":
			return google.maps.ZoomControlStyle.LARGE;
			break;
			}
	
		},
		
			/*set map type control*/
		mapTypeControl_init: function(){
			
			var bControl = $('input:checkbox[name=map_type_control]').is(':checked') ? true : false;
			
			(bControl == true)?$("#map_type").removeAttr('disabled'):$("#map_type").attr('disabled', 'true');
			(bControl == true)?$("#map_type_position").removeAttr('disabled'):$("#map_type_position").attr('disabled', 'true');
			
			return bControl;
			
		},
		
		/*
		 * set map type option
		 */
		mapTypeControl_option: function(){
			
			var map_type = $("#map_type").val();
			
			switch(map_type){
			case "0":
			return google.maps.MapTypeControlStyle.BAR
			break;
			case "1":
				return google.maps.MapTypeControlStyle.DROPDOWN_MENU
			break;
			}
	
		},
		
		/*set scale control*/
		scale_init: function(){
			
			var bControl = $('input:checkbox[name=scale_control]').is(':checked') ? true : false;
			
			(bControl == true)?$("#scale_control_position").removeAttr('disabled'):$("#scale_control_position").attr('disabled', 'true');
			
			return bControl;
			
		},
		
		/*set street view control*/
		street_init: function(){
			
			var bControl = $('input:checkbox[name=street_view_control]').is(':checked') ? true : false;
			
			(bControl == true)?$("#street_view_position").removeAttr('disabled'):$("#street_view_position").attr('disabled', 'true');
			
			return bControl;
			
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
			
		},
		
		/*
		 * search for the location
		 */
		set_search: function(){
		
		/*remove the alertbox*/
		adminPageSettings.close_popup("googlemapmarker_alertbox");
			
		/*validate form popup_form*/
		if(oValidator.formName.getMessage(adminPageSettings.APP_NAME+'_popup_form')){
			/*set the variables*/
			var sAddress = $.trim($("#"+adminPageSettings.APP_NAME+"_search_field").val());
			var sLoader = "<div id='"+adminPageSettings.APP_NAME+"_loader' ><img src='/_sdk/img/"+adminPageSettings.APP_NAME+"/loader.gif'/></div>";
			
			/*append loader and error container*/
			$("#"+adminPageSettings.APP_NAME+"_result").empty();
			$("#"+adminPageSettings.APP_NAME+"_result").append(sLoader);
			$("#"+adminPageSettings.APP_NAME+"_result").append("<div id='"+adminPageSettings.APP_NAME+"_err_con' ></div>");
			
			/*set interval if no data receive after 1 min*/
			var s = setTimeout(function(){
				$("#"+adminPageSettings.APP_NAME+"_loader").remove();
				$("#"+adminPageSettings.APP_NAME+"_err_con").append("<p class='error_message'>Error retriving data.<p>");
				return;
				}
				,60000);
			
			/*get the location via ajax*/
			$.ajax({
				url: usbuilder.getUrl("apiGet"),
				type: 'post',
				dataType: 'json',
					data: {
						action: 'search',
						get_search: sAddress
					},
				success: function(data){
		
						if (data['Data'].length > 0){
							$("#"+adminPageSettings.APP_NAME+"_result").empty();
							string = '';
							i = 0;
							$.each(data['Data'], function(key, val){
								string += '<li ><input class="radio_btn_search" type="radio" id="marker_loc_'+i+'" name="marker_loc" value="'+val['sAdd']+'+'+val['sLat']+'+'+val['sLng']+'" /><label  class="radio_btn_label" for="marker_loc_'+i+'">' + val['sAdd'] + '</label></li>';
								i++;
								});
							$("#"+adminPageSettings.APP_NAME+"_result").append(string);    	
						}else{
							$("#"+adminPageSettings.APP_NAME+"_result").append("<p class='error_message'>No results found.<p>");
						}
						
					}
				});
			}
		
		},
		
		/*
		 * add the locations
		 */
		add_location: function(){
			
			
				var bMarker = $('input:radio[name=marker_loc]').is(":visible");
				
				/*if the location list is not yet set*/
				if(bMarker === false){
					
					/*error message*/
					var sErrMess = "Please search address or place";
					adminPageSettings.alert_box(sErrMess);
					
				}else{
				
					var marker_loc = $('input:radio[name=marker_loc]:checked').val();
					
					if(marker_loc == undefined){
						
						/*error message*/
						var sErrMess = "Please select location for the marker";
						
						adminPageSettings.alert_box(sErrMess);
						
					}
					
					var aMarker_loc = marker_loc.split("+",3);
					
					var locations = aMarker_loc[0].replace("(","[");
					locations = locations.replace(")","]");
					var lat = parseFloat(aMarker_loc[1]);
					var lng = parseFloat(aMarker_loc[2]);
					
					/*set the added options to the marker*/
					var marker_type = $('input:radio[name=marker_type]:checked').val();
					
					var image_url = $("#"+adminPageSettings.APP_NAME+"_image_url").val();
					
					/*image*/
					if(marker_type == 6){
						
						
						var bIfUrl = Googlemap.validURL(image_url);
						
						if(bIfUrl){
							image_icon = image_url;
							marker_type = image_url;
						}else{
							$("#"+adminPageSettings.APP_NAME+"_result").html("Invalid image url");
							return;
						}
					
					}else{
						var image_icon = '/_sdk/img/'+adminPageSettings.APP_NAME+'/icon_marker_0'+marker_type+'.png';
					}
		
			
					/*get the size of the div con*/
					var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
					
					
					
					var sData = '';
					sData += '<div class="add_location" id="'+adminPageSettings.APP_NAME+'_marker_con_'+id+'" style="margin-top:-2px;margin-bottom:10px;">';
					sData += '<div style="float:left;width:35px;margin:0 9px 0px -10px;text-align:center;display:inline"><img  src="'+image_icon+'"';
					
					if(adminPageSettings.validURL(image_url)){
						sData += 'class="custom_image"';
					}else{
						sData += '';
					}
					
						
						sData += '/></div> ';
					sData += '<input type="text"  value="'+locations+' ('+lat+','+lng+','+marker_type+')" readonly name="'+adminPageSettings.APP_NAME+'_marker[]"  class="textbox" style="float:left;width:350px;margin-top:5px;margin-right:6px" />';
					sData += '<a  href="javascript:adminPageSettings.remove_marker('+id+');"  ><img src="/_sdk/img/'+adminPageSettings.APP_NAME+'/close_btn.png" class="close_btn" style="margin-top:5px;vertical-align:middle;display:inline-block" /></a>';	
					sData += '</div>';
					
					$("#"+adminPageSettings.APP_NAME+"_location_wrap").append(sData);
					
					Googlemap.marker_init(locations,lat,lng,marker_type);
				}
			
			
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
			var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
			
			$.each($("input[name='"+adminPageSettings.APP_NAME+"_marker[]']"), function(){
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
		
		/*remove marker*/
		remove_marker: function(div_id){
			
			var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
			
			if(id > 1){
				$("#googlemapmarker_marker_con_"+div_id).remove();
				adminPageSettings.initialize();
				
			}else{
				$("#googlemapmarker_marker_con_"+div_id).append("<span style='color:red;font-style:italic;' class='err_div_loc' >You must maintain at least one(1) marker.</span>");
				$(".err_div_loc").delay(1500).fadeOut(400).slideUp();
			}
			
			
			
		},
		/*display options*/
		displayOption: function(){
			
			var image = $("#pg_disqus_arrow img").attr("src");
			var img_up = "/_sdk/img/"+adminPageSettings.APP_NAME+"/arrow_up.png";
			var img_down = "/_sdk/img/"+adminPageSettings.APP_NAME+"/arrow_down.png";
			
			$("#pg_googlemapmark_option").slideToggle();
			
			if(image == img_up){
				$("#pg_disqus_arrow img").attr("src",img_down);
			}else{
				$("#pg_disqus_arrow img").attr("src",img_up);
			}
			
		},
		
		/*save settings*/
		setting_submit: function(form){
			
			
			//if(oValidator.formName.getMessage(adminPageSettings.APP_NAME+'_form')){
				
				/*gather variables*/
				var iSeq = $("#SEQ").val();
				var zoom_level = parseInt($("#"+adminPageSettings.APP_NAME+"_zoom").val());
				var map_type = $("#"+adminPageSettings.APP_NAME+"_maptype").val();
				var locations = adminPageSettings.get_locations();
				var display_options ={
						"zoom":{
							"zoom_flag": $('input:checkbox[name=zoom_control]').is(':checked') ? 1 : 0 ,
							"zoom_size": $("#zoom_size").val(),
							"zoom_position": $("#zoom_position").val()
								},
						"map":{
							"map_flag": $('input:checkbox[name=map_type_control]').is(':checked') ? 1 : 0,
							"map_type": $("#map_type").val(),
							"map_position": $("#map_type_position").val()
								},
						"scale":{
							"scale_flag": $('input:checkbox[name=scale_control]').is(':checked') ? 1 : 0,
							"scale_position": $("#scale_control_position").val()
								},
						"street":{
							"street_flag": $('input:checkbox[name=street_view_control]').is(':checked') ? 1 : 0,
							"street_position": $("#street_view_position").val()
								}
						
					} 
				
					/*ajax submit*/
					$.ajax({  
						url: usbuilder.getUrl("apiExec"),
						type: 'post',
						dataType: 'json',
						data: {
						action: 'setting_submit',
						get_seq: iSeq,
						get_zoom_level: zoom_level,
						get_map_type: map_type,
						get_locations: locations,
						get_display_options: display_options
						
					},
						success: function(data){
						
						if(data.Data === true){
							adminPageSettings.close_popup(adminPageSettings.APP_NAME+"_add_marker");
							oValidator.generalPurpose.getMessage(true, "Saved successfully");
							scroll(0,0);
							
							}else{
								oValidator.generalPurpose.getMessage(false, "Failed");
								scroll(0,0);
							}
					
						}
					});
			//}
			
		},
		
		/*reset to default*/
		reset_default: function(){
			
			$("#"+adminPageSettings.APP_NAME+"_form_reset").submit();
			
		},
		/*
		 * display a dialog box
		 * @param aDecs = define the description for the dialog box
		 */
		open_popup: function(sContainer,iWidth,sTitle){
			
			if(sContainer == "googlemapmarker_add_marker"){
				//empty the result list
				$("#googlemapmarker_result").empty();
			}
			
			
			/*create popup*/
			popup.load(sContainer).skin("admin").layer({
				width: iWidth,
				title: sTitle,
				resize: false,
				draggable: true	
			});
			
		},
		
		/*
		 * close dialog box 
		 *  @param sConId = dialog box container id
		 */
		close_popup: function(sConId){
			popup.close(sConId);
		},
		
		validURL: function(str) {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			return regexp.test(str);
		}
	
};


$(document).ready(function(){
	
	

	
	$('#zoom_control, #map_type_control,#scale_control,#street_view_control').click(function() {
		adminPageSettings.initialize();
	});
	
	$('#googlemapmarker_zoom,#googlemapmarker_maptype, #zoom_size, #map_type, #zoom_position, #map_type_position,#scale_control_position,#street_view_position').change(function() {
		adminPageSettings.initialize();
	});
	
	adminPageSettings.enable_image_url();
	adminPageSettings.initialize();

});
