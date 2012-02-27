<?php
class frontPageGooglemapmarker extends Controller_Front
{

	protected $oGet;

    protected function run($aArgs)
    {

    require_once('builder/builderInterface.php');
    

 	/*assign objects*/
    $this->oGet = new modelGet;
    
	$this->display($aArgs);

    }

    protected function display($aArgs){
    	
    	/*define page*/
    	$APP_NAME = "googlemapmarker";
    	$this->assign("APP_NAME",$APP_NAME);
    	$sGooglemaps_url = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=true';
    	$this->externalJS($sGooglemaps_url);
    	$this->importJS(__CLASS__);
    	$this->importJS("Googlemaps");

    	
    	
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
    	
    	$sData .= '<div id="map_canvas" ></div>';
    	
    	
    	//markers
    	$sData .= '<div id="'.$APP_NAME.'_location_wrap" >';
    	if(count($aMarkers) != 0){
    		$counter=0;
    		foreach($aMarkers as $val){
    			$sData .='<div id="'.$APP_NAME.'_marker_con_'.$counter.'"  style="display:none;" >';
    			$sData .='<input type="text"  value="'.$val['loc'].' ('.$val['lat'].','.$val['lng'].','.$val['marker'].')" name="'.$APP_NAME.'_marker[]"   />';
    			$sData .='</div>';
    			$counter++;
    		}
    	}else{
    		$sData .='<div  id="'.$APP_NAME.'_marker_con_0" style="display:none;" >';
    		$sData .='<input type="text"   name="'.$APP_NAME.'_marker[]" value="Los Angeles, CA, USA(34.0522342,-118.2436849)" class="textbox" />';
    		$sData .='</div>';
    	}
    	$sData .= '</div>';
    	
    	$sData .= '<div id="'.$APP_NAME.'_hidden_values" style="display:none;" >';
    	$sData .= '<input type="text" id="'.$APP_NAME.'_zoom_level" value="'.$aUserSetting['zoom_level'].'" />';
    	$sData .= '<input type="text" id="'.$APP_NAME.'_map_type" value="'.$aUserSetting['map_type'].'" />';
    	$sData .= "<input type='text' id='".$APP_NAME."_display_options' value='".$aUserSetting['display_options']."' />";
    	$sData .= '</div>';
    	
    	
    	
    	
    	
    	$this->assign("Googlemapmarker",$sData);
    	

    	
    	
    }
}
