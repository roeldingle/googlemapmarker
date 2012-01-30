var adminPageSettings = {
		
		/*set global variables*/
		APP_NAME: $("#APP_NAME").val(),
		
		/*reset to default*/
		reset_default: function(){
			window.location= usbuilder.getUrl("adminPageSettings")+"&reset=true";
			
		},
		/*remove marker*/
		remove_marker: function(div_id){
			
			$("#googlemapmarker_marker_con_"+div_id).remove();
			adminPageSettings.initialize();
			
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
		
					$.ajax({  
						url: usbuilder.getUrl("apiExec"),
						type: 'post',
						dataType: 'json',
						data: {
						action: 'setting_submit',
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
		
		},
		
		/*
		 * add the locations
		 */
		add_location: function(){
			
			
			
			var marker_loc = $('input:radio[name=marker_loc]:checked').val();
			var aMarker_loc = marker_loc.split("+",3);
			
			var locations = aMarker_loc[0];
			var lat = parseFloat(aMarker_loc[1]);
			var lng = parseFloat(aMarker_loc[2]);
				
			
			/*set the added options to the marker*/
			var marker_type = $('input:radio[name=marker_type]:checked').val();

	
			/*get the size of the div con*/
			var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
			
			var sData = '';
			sData += '<div class="add_location" id="'+adminPageSettings.APP_NAME+'_marker_con_'+id+'" >';
			sData += '<img src="/_sdk/img/'+adminPageSettings.APP_NAME+'/icon_marker_0'+marker_type+'.png" /> ';
			sData += '<input type="text"  value="'+locations+' ('+lat+','+lng+','+marker_type+')" readonly name="'+adminPageSettings.APP_NAME+'_marker[]"  class="textbox" style="width:350px" />';
			sData += '<a  href="javascript:adminPageSettings.remove_marker('+id+');"  > <img src="/_sdk/img/'+adminPageSettings.APP_NAME+'/close_btn.png" class="close_btn" style="vertical-align:middle;display:inline-block" /></a>';	
			sData += '</div>';
			
			$("#"+adminPageSettings.APP_NAME+"_location_wrap").append(sData);
			
			Googlemap.marker_init(locations,lat,lng,marker_type);
			
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
					marker = parseInt(aLatlng[2].substr(0,lng_len-1));

					sData[i] = {lat: lat, lng: lng,loc: aLocation['loc'],marker: marker};
				});
				i++;
			});	
			
			return sData;

		},
		
		/*
		 * display a dialog box
		 * @param aDecs = define the description for the dialog box
		 */
		open_popup: function(sContainer,iWidth,sTitle){
			
			//empty the result list
			$("#googlemapmarker_result").empty();
			
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
		}
	
};


/*
 * Googlemap functions
 */
var Googlemap = {
		
	/*global variables*/
	map : null,
	zoom : null,
	maptype: null,
	markers: new Array(),
	markersArray: new Array(),
	center : '',
	address : "USA",
	geocoder : '',
	zoomFlag: '',
	typeFlag: '',
	scaleFlag: '',
	streetFlag: '',
	geo_loc : '',
	latlng : '',
	
	/*
	 * create the map object and display in map_canvas
	 */
	map_init : function(myOptions)
	{
	 Googlemap.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);	
	},
	
	
	marker_init: function(locations,lat,lng,marker_type){
		
		Googlemap.markers = new google.maps.Marker({
			  position: new google.maps.LatLng(lat,lng),
			  map: Googlemap.map,
			  title: locations,
			  clickable: true,
			  draggable: true,
			  icon: '/_sdk/img/'+adminPageSettings.APP_NAME+'/icon_marker_0'+marker_type+'.png'
			});
		
	},
	/*
	deleteOverlays : function() 
	{
		if (markersArray) {
			for (i in markersArray) {
			  markersArray[i].setMap(null);
			}
			markersArray.length = 0;
		}
	}, 
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	search : function(sAddress)
    {  
		$('#address_list .place_check_list').html(''); 

		var str = '';
        Googlemap.geocoder.geocode({'address':sAddress}, function(results, status) {
            if(status=='ZERO_RESULTS'){
                str = '<li>Results not found. Please try a different search.</li>';
            }else{
                for(var i = 0; i < results.length; i++) {
					var chkd = i == 0 ? "checked" : "";
					var latlng = results[i].geometry.location.lat()+','+results[i].geometry.location.lng();
					str += '<li><input type="radio" name="place_group" value="'+latlng+'" id="place_group_'+i+'" title="'+results[i].formatted_address+'" class="input_rdo" '+chkd+'/><label for="place_group_'+i+'">' + results[i].formatted_address + '</label></li>';
				}
                
            }
            $('#address_list .place_check_list').html(str);            
        });            
    },

	searchMark : function(sAddress)
    {  
		$('#address_list_mark .place_check_list').html(''); 

		var str = '';
        Googlemap.geocoder.geocode({'address':sAddress}, function(results, status) {
            if(status=='ZERO_RESULTS'){
                str = '<li>Results not found. Please try a different search.</li>';
            }else{
                for(var i = 0; i < results.length; i++) {
					var chkd = i == 0 ? "checked" : "";
					var latlng = results[i].geometry.location.lat()+','+results[i].geometry.location.lng();
					str += '<li><input type="radio" name="place_group" value="'+latlng+'" id="place_group_'+i+'" title="'+results[i].formatted_address+'" class="input_rdo" '+chkd+'/><label for="place_group_'+i+'">' + results[i].formatted_address + '</label></li>';
				}
                
            }
            $('#address_list_mark .place_check_list').html(str);            
        });            
    },
	
	searchX : function()
	{
		var address = $.trim($('#google_map_search_field').val());

		if(address.length == 0)  return false;

		Googlemap.search(address);
	},
	
	searchXMark : function()
	{
		var address = $.trim($('#google_map_mark_search_field').val());

		if(address.length == 0)  return false;

		Googlemap.searchMark(address);
	},
	
	_setCenter : function()
	{
		var address = $("#address_list input[name='place_group']:checked").attr('title');
		var coordinates = $("#address_list input[name='place_group']:checked").val();

		if(!coordinates) return false;

		$('#pg_googlemapmark_center').val(address);
		$('#pg_m_coords').val(coordinates);

		var aCoor = coordinates.split(',');
		Googlemap.address = address;
		Googlemap.lat = aCoor[0];
		Googlemap.lng = aCoor[1];

		Googlemap.setCenter();

		//$('#pg_googlemapmark_popup_center').dialog('close');
		popup.close('google_map_center_list', true);
	},

	_setMarker : function()
	{
		var pg_dir = $('#pgdir').val();
		var address = $("#address_list_mark input[name='place_group']:checked").attr('title');
		var coordinates = $("#address_list_mark input[name='place_group']:checked").val();
		var icon = $("input[name='marker_type']:checked").val();

		if(!coordinates) return false;

		if(maker_type == 'new') {
			var curr_ind = $('.add_mark_marker').size();

			var str = '<div class="add_mark_marker" style="display:visible">';
			str += '<input name="pg_marker[]" type="text"  class="fix" value="'+address+'" disabled/><input name="pg_m_icon[]" type="hidden"  value="'+icon+'"/><input name="pg_m_marker[]" type="hidden"  value="'+address+'"/>&nbsp;';
			str += '<a href="#none" onclick="adminPageSettings.deleteMark(this);" class="clse_icon1"><img src="'+pg_dir+'/images/icon_publishing.gif" alt="" /></a>  ';
			str += '<a href="#none" class="add_link" onclick="adminPageSettings.editMarkPopup(this);">Edit</a></div>';

			$('#pg_marker_list').append(str);
		} else {
			p_inp1.val(address);
			p_inp2.val(icon);
			p_inp3.val(address);
		}

		popup.close('google_map_marker_search', true);
		popup.close('google_map_marker_search_list', true);

		Googlemap.mapGeocoderMark();

		parent.iframeHeight(parent.document.getElementById('plugin_contents'), '10'); 

	},

	setCenter : function()
	{
		var latLng = new google.maps.LatLng(Googlemap.lat, Googlemap.lng);   
		Googlemap.map.panTo(latLng);
	},
	
	mapGeocoderMark : function()
	{
		Googlemap.deleteOverlays();
		
		$('[class^=add_mark_marker]').each(function(k, i){

			var pg_dir = $('#pgdir').val();
			var addr = $(this).children('input:eq(2)').val();
			var icon = $(this).children('input:eq(1)').val();
			var img = pg_dir + '/images/icon_marker_0'+icon+'.png';

			Googlemap.geocoder.geocode( { 'address': addr}, function(results, status) {

				if (status == google.maps.GeocoderStatus.OK) {

					var position = results[0].geometry.location;
					var addr = results[0].formatted_address;

					var contentString = '<div id="content">'+
											'<div id="siteNotice"></div>'+
											'<div id="bodyContent">'+
											'<p>'+addr+'</p></div></div>';

					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});

					var marker = new google.maps.Marker({map: Googlemap.map, position: results[0].geometry.location, icon: img});
					markersArray.push(marker);
					//marker.setMap(Googlemap.map);  
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(Googlemap.map,marker);
					});
				}
			});		
		});
	},

	

	setZoomControl : function()
    {
		var zPos = $('#zoom_position').val();
		var pos = Googlemap.ctrlPosition(zPos);
		var zSize = $('#zoom_size').val();
		Googlemap.zoomFlag = $('#zoom_control').is(':checked') ? true : false;
		
		if(zSize == "0") {
			var zcOpt = { style: google.maps.ZoomControlStyle.SMALL, position: pos};
		} else {
			var zcOpt = { style: google.maps.ZoomControlStyle.LARGE, position: pos };
		}

        var options = {
				panControl : Googlemap.zoomFlag,
                zoomControl : Googlemap.zoomFlag,
				zoomControlOptions: zcOpt
        };
        
        Googlemap.map.setOptions(options);
    },
	
	setZoomControlInit : function()
    {
		var zPos = $('#zoom_position').val();
		var pos = Googlemap.ctrlPosition(zPos);
		var zSize = $('#zoom_size').val();

		if($('#zoom_control').is(':checked')){
			fpan = true;
			fzoom = true;
		} else {
			fpan = false;
			fzoom = false;
		}

		if(zSize == "0") {
			var zcOpt = { style: google.maps.ZoomControlStyle.SMALL, position: pos};
		} else {
			var zcOpt = { style: google.maps.ZoomControlStyle.LARGE, position: pos };
		}

        var opt = {
				panControl : fpan,
                zoomControl : fzoom,
				zoomControlOptions: zcOpt
        };
        
        return opt;
    },
	
	setMapTypeControl : function()
	{
		var mPos = $('#map_type_position').val();
		var pos = Googlemap.ctrlPosition(mPos);
		var mType = $('#map_type').val();
		Googlemap.typeFlag = $('#map_type_control').is(':checked') ? true : false;

		if(mType == "0") {
			var mtOpt = { style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: pos};
		} else {
			var mtOpt = { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, position: pos };
		}

		var options = {
				mapTypeControl: Googlemap.typeFlag,
                mapTypeControlOptions: mtOpt
        };
        
        Googlemap.map.setOptions(options);
	},

	setMapTypeControlInit : function()
	{
		var mPos = $('#map_type_position').val();
		var pos = Googlemap.ctrlPosition(mPos);
		var mType = $('#map_type').val();
		var fmaptype = $('#map_type_control').is(':checked') ? true : false;

		if(mType == "0") {
			var mtOpt = { style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: pos};
		} else {
			var mtOpt = { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, position: pos };
		}

		var opt = {
				mapTypeControl: fmaptype,
                mapTypeControlOptions: mtOpt
        };
        
        return opt;
	},
	
	ctrlPosition : function(val)
	{
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
	
	setScaleControl : function()
	{
		var sPos = $('#scale_control_position').val();
		var pos = Googlemap.ctrlPosition(sPos);
		Googlemap.scaleFlag = $('#scale_control').is(':checked') ? true : false;

		var options = {
				scaleControl: Googlemap.scaleFlag,
                scaleControlOptions: { position: pos }
        };
        
        Googlemap.map.setOptions(options);
	},
	
	setScaleControlInit : function()
	{
		var sPos = $('#scale_control_position').val();
		var pos = Googlemap.ctrlPosition(sPos);
		var fscale = $('#scale_control').is(':checked') ? true : false;

		var opt = {
				scaleControl: fscale,
                scaleControlOptions: { position: pos }
        };
        
        return opt;
	},

	setStreetViewControl : function()
	{
		var stPos = $('#street_view_position').val();
		var pos = Googlemap.ctrlPosition(stPos);
		Googlemap.streetFlag = $('#street_view_control').is(':checked') ? true : false;

		var options = {
				streetViewControl: Googlemap.streetFlag,
                streetViewControlOptions: { position: pos }
        };
        
        Googlemap.map.setOptions(options);
	},

	setStreetViewControlInit : function()
	{
		var stPos = $('#street_view_position').val();
		var pos = Googlemap.ctrlPosition(stPos);
		var fstreet = $('#street_view_control').is(':checked') ? true : false;

		var opt = {
				streetViewControl: fstreet,
                streetViewControlOptions: { position: pos }
        };
        
        return opt;
	},
	
	zoomMap : function(val)
	{
		var lvl = parseInt(val);

		Googlemap.map.setZoom(lvl);
	},

	setMapType : function(val)
	{
		var options = {
				mapTypeId: val
        };
		
		Googlemap.map.setOptions(options);
	},
	
	resize : function()
	{
		google.maps.event.trigger(Googlemap.map, 'resize');
	},
	
	setCaption : function(loc, text)
	{
		var contentString = '<div id="content">'+
										'<div id="siteNotice"></div>'+
									    '<div id="bodyContent">'+
									    '<p>'+text+'</p></div></div>';

		var infowindow = new google.maps.InfoWindow({ 
			content : contentString,
			position : loc
		});

		infowindow.open(Googlemap.map);	
	}
};

$(document).ready(function(){
	
	$('#zoom_control, #map_type_control,#scale_control,#street_view_control').click(function() {
		adminPageSettings.initialize();
	});
	
	$('#googlemapmarker_zoom,#googlemapmarker_maptype, #zoom_size, #map_type, #zoom_position, #map_type_position,#scale_control_position,#street_view_position').change(function() {
		adminPageSettings.initialize();
	});
	
	
	adminPageSettings.initialize();

});
