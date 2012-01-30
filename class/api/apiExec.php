<?php
class apiExec extends Controller_Api
{
	
	
    protected function post($aArgs)
    {

        require_once('builder/builderInterface.php');
        usbuilder()->init($this->Request->getAppID(), $aArgs);
        
        $oExec = new modelExec;
     
	#data to insert
	$aData = array(
		'zoom_level' => $aArgs['get_zoom_level'],
    	'map_type' => $aArgs['get_map_type'],
    	'locations' => json_encode($aArgs['get_locations']),
    	'display_options' => json_encode($aArgs['get_display_options'])

	
		);
	
    $dDeleted = $oExec->deleteData(2);
    if($dDeleted === true){
		$aResult = $oExec->insertData(2,$aData);
    }else{
    	$aResult = "false";
    }
	
	return $aResult;
        
    }
    
  
}
