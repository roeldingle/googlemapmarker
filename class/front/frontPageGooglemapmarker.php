<?php
class frontPageGooglemapmarker extends Controller_Front
{

	protected $oGet;

    protected function run($aArgs)
    {

    require_once('builder/builderInterface.php');
    usbuilder()->init($this, $aArgs);

 	/*assign objects*/
    $this->oGet = new modelGet;
    
	$this->display($aArgs);

    }

    protected function display($aArgs){
    	
    	/*define page*/
    	$APP_NAME = "googlemapmarker";
    	$this->assign("APP_NAME",$APP_NAME);
    	
    	/*set the user setting*/
    	$aUserSetting = $this->oGet->getRow(2,"seq =".$this->getSequence());
    	
    	
    	/*set default values*/
    	if(empty($aUserSetting)){
    		$aUserSetting = array(
    				'zoom_level' => 1,
    				'map_type' => "Normal",
    				'locations' => '[{"loc":"Los Angeles, CA, USA","lat":"34.0522342","lng":"-118.2436849","marker":"0"}]',
    				'display_options' => '{"zoom":{"zoom_flag":"0","zoom_size":"0","zoom_position":"0"},"map":{"map_flag":"0","map_type":"0","map_position":"1"},"scale":{"scale_flag":"0","scale_position":"2"},"street":{"street_flag":"0","street_position":"3"}}'
    			);
    	
    	}

    	$aMarkers = json_decode($aUserSetting['locations'],true);
    	$aDisplayOpt = json_decode($aUserSetting['display_options'],true);
    	
  
	    $iLen = (count($aMarkers)-1);
	    $this->assign('iLat', $aMarkers[$iLen][lat]);
	    $this->assign('iLng', $aMarkers[$iLen][lng]);
    	
    	//give the string data
    	$sData = '';
    	
    	//map container
    	$sData .= '<div class="map_canvas" style="width:100%;height:100%;" ></div>';
    	
    	//markers
    	$sData .= '<div class="'.$APP_NAME.'_location_wrap" style="display:none;" >';
    	if(count($aMarkers) != 0){
    		$counter=0;
    		foreach($aMarkers as $val){
    			$sData .='<div class="'.$APP_NAME.'_marker_con_'.$counter.'"   >';
    			$sData .='<input type="text"  value="'.$val['loc'].' ('.$val['lat'].','.$val['lng'].','.$val['marker'].')" name="'.$APP_NAME.'_marker[]"   />';
    			$sData .='</div>';
    			$counter++;
    		}
    	}else{
    		$sData .='<div  class="'.$APP_NAME.'_marker_con_0" style="display:none;" >';
    		$sData .='<input type="text"   name="'.$APP_NAME.'_marker[]" value="Los Angeles, CA, USA(34.0522342,-118.2436849)" class="textbox" />';
    		$sData .='</div>';
    	}
    	$sData .= '</div>';
    	
    	$sData .= '<div class="'.$APP_NAME.'_hidden_values" style="display:none;"  >';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_zoom_level" value="'.$aUserSetting['zoom_level'].'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_map_type" value="'.$aUserSetting['map_type'].'" />';
    	$sData .= "<input type='text' class='".$APP_NAME."_display_options' value='".$aUserSetting['display_options']."' />";
    	$sData .= '</div>';
    
    	$this->assign("Googlemapmarker",$sData);
    	
    	$this->init_js($aArgs);
    }
    
    protected function init_js($aArgs){
    	
    	$sJs = '
		sdk_Module("'.usbuilder()->getModuleSelector().'").ready(function($M){
			var Googlemap = {
			map : null,
			
			map_init : function(myOptions)
			{
			 Googlemap.map = new google.maps.Map($M(".map_canvas").get(0), myOptions);	
			},
			
			marker_init: function(locations,lat,lng,marker_type){
				
				var bIfUrl = Googlemap.validURL(marker_type);
					
					if(bIfUrl){
						var image_icon = marker_type;
					}else{
						var image_icon = "/_sdk/img/googlemapmarker/icon_marker_0"+marker_type+".png";
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
			validURL: function(str){
				var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
				return regexp.test(str);
			}
		};
		
			var frontPageGooglemapmarker = {
			
					APP_NAME: "googlemapmarker",
					
					initialize: function(){ 
						//get the size of parent div
						var iMapWidth = $M(".map_canvas").parent().width();
						var iMapHeight = $M(".map_canvas").parent().height();
						
						/*set a minimum value if height is 0*/
						var iMinheigth = 200;
						
						if(iMapHeight == 0){
							iMapHeight = iMinheigth;
						}
						
						$M(".map_canvas").css("width",iMapWidth);
						$M(".map_canvas").css("height",iMapHeight);
						
						/*call the map init func*/
						frontPageGooglemapmarker.create_map();	
					},
					
					create_map: function(){
						
						var zoom = parseInt($M("."+frontPageGooglemapmarker.APP_NAME+"_zoom_level").val());
						
						var aMarkerData = frontPageGooglemapmarker.get_locations();
						
						
						var iLastMarker = aMarkerData.length - 1;
						var lat = aMarkerData[iLastMarker].lat;
						
						var lng = aMarkerData[iLastMarker].lng;
						
						var map_type = $M("."+frontPageGooglemapmarker.APP_NAME+"_map_type").val();
						
						
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
						
						var display_options = $M("."+frontPageGooglemapmarker.APP_NAME+"_display_options").val();
						var aDisplayOption = eval("(" + display_options + ")");
			
						
						var zoom_type = aDisplayOption.zoom.zoom_size;
						switch(zoom_type){
						case "0":
						var zoom_option = google.maps.ZoomControlStyle.SMALL;
						break;
						case "1":
						var zoom_option =google.maps.ZoomControlStyle.LARGE;
						break;
						}
						
						var map_option_type = aDisplayOption.map.map_type;
						switch(map_option_type){
						case "0":
						var mapOption = google.maps.MapTypeControlStyle.BAR
						break;
						case "1":
						var mapOption =google.maps.MapTypeControlStyle.DROPDOWN_MENU
						break;
						}
						
						
						var zoomPos = aDisplayOption.zoom.zoom_position;
						var mapPos = aDisplayOption.map.map_position;
						var scalePos = aDisplayOption.scale.scale_position;
						var streetPos = aDisplayOption.street.street_position;
						
						
						var zoomControl_flag = (aDisplayOption.zoom.zoom_flag == 0)?false:true;
						var zoomControl_option = zoom_option;
						var zoomControl_position = frontPageGooglemapmarker.position_option(zoomPos);
						var mapTypeControl_flag = (aDisplayOption.map.map_flag == 0)?false:true;
						var mapTypeControl_option = mapOption;
						var mapTypeControl_position = frontPageGooglemapmarker.position_option(mapPos);
						var scaleControl_flag = (aDisplayOption.scale.scale_flag == 0)?false:true;
						var scaleControl_position = frontPageGooglemapmarker.position_option(scalePos);
						var streetControl_flag = (aDisplayOption.street.street_flag == 0)?false:true;
						var streetControl_position = frontPageGooglemapmarker.position_option(streetPos);
						
						
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
						 
						
						var aMarkers = frontPageGooglemapmarker.get_locations();
					
						$.each(aMarkers, function(key, val){
							Googlemap.marker_init(val.loc,val.lat,val.lng,val.marker);
							
						});
						       
						
					},
			
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
						var id = $M("."+frontPageGooglemapmarker.APP_NAME+"_location_wrap").children("div").size();
						
						$.each($M("input[name=\'"+frontPageGooglemapmarker.APP_NAME+"_marker[]\']"), function(){
							idx = $(this).val();
							 strid += "+"+idx;
					
							location_str = strid.substr(1);
							
							
							locations = location_str.split("+");
							
							$.each(locations, function(index){
			
								aLocation = locations[index].split("(");
								aLocation.loc = aLocation[0];
								aLocation.latlng = aLocation[1];
											
								aLatlng = aLocation.latlng.split(",");
								lat = parseFloat(aLatlng[0]);
								lng = parseFloat(aLatlng[1]);
								lng_len = aLatlng[2].length;
								marker = aLatlng[2].substr(0,lng_len-1);
			
								sData[i] = {lat: lat, lng: lng,loc: aLocation.loc,marker: marker};
							});
							i++;
						});	
						
						return sData;
			
					},
					/*give the position for the controllers*/
					position_option: function(val){
						
						switch(val) {
						case "1":
							pos = google.maps.ControlPosition.TOP_RIGHT;
							break;
						case "2":
							pos = google.maps.ControlPosition.TOP_CENTER;
							break;
						case "3":
							pos = google.maps.ControlPosition.LEFT_TOP;
							break;
						case "4":
							pos = google.maps.ControlPosition.LEFT_CENTER;
							break;
						case "5":
							pos = google.maps.ControlPosition.LEFT_BOTTOM;
							break;
						case "6":
							pos = google.maps.ControlPosition.RIGHT_TOP;
							break;
						case "7":
							pos = google.maps.ControlPosition.RIGHT_CENTER;
							break;
						case "8":
							pos = google.maps.ControlPosition.RIGHT_BOTTOM;
							break;
						case "9":
							pos = google.maps.ControlPosition.BOTTOM_LEFT;
							break;
						case "10":
							pos = google.maps.ControlPosition.BOTTOM_RIGHT;
							break;
						case "11":
							pos = google.maps.ControlPosition.BOTTOM_CENTER;
							break;
						default:
							pos = google.maps.ControlPosition.TOP_LEFT;	
					}
						return pos;
				}
				
			};
			
		
			
			frontPageGooglemapmarker.initialize();
    	});
    	';
    
    	
    	
    	$this->writeJs($sJs);
    
    }
    
}
