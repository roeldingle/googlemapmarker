<?php
class apiGet extends Controller_Api
{
	
	
    protected function post($aArgs)
    {

        require_once('builder/builderInterface.php');
         usbuilder()->init($this->Request->getAppID(), $aArgs);
        
        $sSearch = str_replace(" ","%20",$aArgs['get_search']);
		
		$path_url = 'http://maps.googleapis.com/maps/api/geocode/xml?address='.$sSearch.'&sensor=true';
		$xmlFile = $this->downloadXmlFile($path_url);
		$xml = new SimpleXMLElement($xmlFile);
		$object = $xml->result;
		
		foreach($object as $item){
		$a = $item->formatted_address;
		$b = $item->geometry->location->lat;
		$c = $item->geometry->location->lng;
		$aDataContent[] = array(
				'sAdd' => (string)$a,
				'sLat' => (float)$b,
				'sLng' => (float)$c
				);
		
		}
		
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
