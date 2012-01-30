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
    	
    	/*save form validator*/
    	usbuilder()->validator(array('form' => $APP_NAME.'_form'));
    	
    	/*set the user setting*/
    	$aUserSetting = $this->oGet->getRow(2,null);
    	
    	
    	/*set default values*/
    	if(empty($aUserSetting) || isset($aArgs['reset'])){
    		$aUserSetting = array(
    				'zoom_level' => 1,
    				'map_type' => "Normal",
    				'locations' => '[{"loc":"Los Angeles, CA, USA","lat":"34.0522342","lng":"-118.2436849","marker":"0"}]',
    				'display_options' => '{"zoom":{"zoom_flag":"0","zoom_size":"0","zoom_position":"0"},"map":{"map_flag":"0","map_type":"0","map_position":"1"},"scale":{"scale_flag":"0","scale_position":"2"},"street":{"street_flag":"0","street_position":"3"}}'
    						);
    	
    	}

    	
    	$aMarkers = json_decode($aUserSetting['locations'],true);
    	$aDisplayOpt = json_decode($aUserSetting['display_options'],true);
    	
    	$aPositionData = explode(",","Top Left,Top Right,Top Center,Left Top,Left Center,Left Bottom,Right Top,Right Center,Right Bottom,Bottom Left,Bottom Right,Bottom Center");
    	
	    $iLen = (count($aMarkers)-1);
	    $this->assign('iLat', $aMarkers[$iLen][lat]);
	    $this->assign('iLng', $aMarkers[$iLen][lng]);
    	
    	$this->assign("aUserSetting",$aUserSetting);
    	$this->assign("aMarkers",$aMarkers);
    	$this->assign("aDisplayOpt",$aDisplayOpt);
    	$this->assign("aPositionData",$aPositionData);
    	

    	/*set the template*/
    	$this->view(__CLASS__);

    }
}
