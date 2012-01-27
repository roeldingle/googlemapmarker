<?php
class adminPageSettings extends Controller_Admin
{

	protected $oGet;

    protected function run($aArgs)
    {

    require_once('builder/builderInterface.php');
    $sInitScript = usbuilder()->init($this->Request->getAppID(), $aArgs);
    $this->writeJs($sInitScript);

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
    	$this->importCSS(__CLASS__);
    	
    	/*get user settings*/
    	//$aUserSetting = $this->oGet->getRow(2,null);
    	
    	/*set default values*/
    	//if(empty($aUserSetting) || isset($aArgs['reset'])){
    		$aUserSetting = array(
    				'zoom_level' => 1,
    				'map_type' => 0,
    				'caption' => "Hello World",
    				'locations' => '[{"loc":"Los Angeles, CA, USA","lat":"34.0522342","lng":"-118.2436849","marker_type":"3"},{"loc":"Gleason, WI 54435, USA","lat":"45.3662588","lng":"-89.3828135","marker_type":"2"}]',
    				'display_options' => '[{
    										"zoom":{"zoom_flag":"0","zoom_size":"small","zoom_position":"Top left"},
    										"map":{"map_flag":"0","map_type":"bar","map_position":"Right top"},
    										"scale":{"scale_flag":"0","scale_position":"Bottom center"},
    										"street":{"street_flag":"0","street_position":"Top left"}
    										}]'
    						);
    	
    	//}
    	$aMarkers = json_decode($aUserSetting['locations'],true);
    	
	    $iLen = (count($aMarkers)-1);
	    $this->assign('iLat', $aMarkers[$iLen][lat]);
	    $this->assign('iLng', $aMarkers[$iLen][lng]);
    	
    	$this->assign("aUserSetting",$aUserSetting);
    	$this->assign("aMarkers",$aMarkers);
    	

    	/*set the template*/
    	$this->view(__CLASS__);

    }
}
