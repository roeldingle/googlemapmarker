<?php
class apiGetSettings extends Controller_Api
{
	
	protected $oGet;
	
    protected function post($aArgs)
    {

        require_once('builder/builderInterface.php');
         usbuilder()->init($this->Request->getAppID(), $aArgs);
        
        $this->oGet = new modelGet;
         
        $aUserSetting = $this->oGet->getRow(2,null);
         
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
         $aMarkers[$iLen][lat];
        $aMarkers[$iLen][lng];
         
         $aDataContent[] = array(
         		"zoom_level"=> $aUserSetting['zoom_level'],
         		"map_type"=> $aUserSetting['map_type'],
         		"locations"=> $aMarkers,
         		"display_options"=> $aDisplayOpt
         		);
		
		return $aDataContent;
        
    }
    
    public function downloadXmlFile($path)
    {
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL,$path);
    	curl_setopt($ch, CURLOPT_FAILONERROR,1);
    	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    	$retValue = curl_exec($ch);
    	curl_close($ch);
    
    	return $retValue;
    }
}
