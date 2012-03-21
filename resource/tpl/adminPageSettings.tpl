<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head></head>
<body>

<!-- hidden values -->
<input type="hidden"  id="APP_NAME" value="<?php echo $APP_NAME;?>" />
<input type="hidden"  id="<?php echo $APP_NAME;?>_lat" value="<?php echo $iLat;?>" />
<input type="hidden"  id="<?php echo $APP_NAME;?>_lng" value="<?php echo $iLng;?>" />
<input type="hidden" id="SEQ" value="<?php echo $iSeq;?>" /><!--pluginurl-->

<span><label>App ID :</label> <?php echo ucwords($APP_NAME);?></span><br /><br />
		
<form name="<?php echo $APP_NAME;?>_form" id="googlemapmark_form"  method="POST">
	<div id="<?php echo $APP_NAME;?>_wrap">
		<div id="<?php echo $APP_NAME;?>_mapcontainer">
			<div id="map_canvas"></div>	
		</div>		
	</div>
	
	<table border="1" cellspacing="0" class="table_input_vr">
	<colgroup>
		<col width="115px" />
		<col width="*" />
	</colgroup>
	
	
	
	<!-- map zoom level -->
	<tr>
		<th class="padt1"><label for="show_html_value">Zoom</label></th>
		<td class="padt1">
			<select title="select rows" class="rows" name="<?php echo $APP_NAME;?>_zoom" id="<?php echo $APP_NAME;?>_zoom" >
			<?php for($iCount = 1; $iCount <= 20; $iCount++){ ?>
				<option <?php echo ($aUserSetting['zoom_level'] == $iCount) ? "selected" : "" ;?> ><?php echo $iCount; ?></option>
			<?php  }  ?>
			</select>
		</td>
	</tr>
	
	
	<!-- map type -->
	<tr>
		<th><label>Map Type</label></th>
		<td>
			<select id="<?php echo $APP_NAME;?>_maptype"  name="<?php echo $APP_NAME;?>_maptype"  >
				<option value="Normal" <?php echo ($aUserSetting['map_type'] == "Normal") ? "selected" : "" ;?> >Normal</option>
				<option value="Satellite" <?php echo ($aUserSetting['map_type'] == "Satellite") ? "selected" : "" ;?> >Satellite</option>
				<option value="Hybrid" <?php echo ($aUserSetting['map_type'] == "Hybrid") ? "selected" : "" ;?> >Hybrid</option>
				<option value="Terrain" <?php echo ($aUserSetting['map_type'] == "Terrain") ? "selected" : "" ;?> >Terrain</option>
			</select>
		</td>
	</tr>
	
	
	<!-- set markers -->
	<tr>
		<th><label for="module_label">Marker</label></th>
		<td>	
			
			<span class="location"  >
				
				<p><span class="neccesary">*</span>Add a Marker on the map.</p>
				<p id="<?php echo $APP_NAME;?>_addlocation" class="space" style="margin-left:7px">Add Marker register multiple.</p>
				<br />
				
				<!-- container for the locations -->
				<div id="<?php echo $APP_NAME;?>_location_wrap">
				
				<!-- loop the array containing the marker data -->
				<?php  $counter = 0; foreach($aMarkers as $val){ ?>
					<div class="add_location" id="<?php echo $APP_NAME;?>_marker_con_<?php echo $counter;?>" style="width:700px;height:40px;" >
						<div style="float:left;width:35px;text-align:center;display:inline-block">
						<img src="
						<?php 
						
						if(preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $val['marker']) == true){
							echo $val['marker'] .'" class="custom_image"';
						}else{
							echo "/_sdk/img/googlemapmarker/icon_marker_0".$val['marker'].".png" ;
						}
						?>
						
						" / style="float:left">
						</div>
						<input type="text"  value="<?php echo $val['loc'];?>(<?php echo $val['lat'];?>,<?php echo $val['lng'];?>,<?php echo $val['marker'];?>)" readonly name="<?php echo $APP_NAME;?>_marker[]"  class="textbox" value="" style="float:left;width:350px;margin-top:3px" />
						<a  href="javascript:adminPageSettings.remove_marker(<?php echo $counter;?>);"  ><img src="/_sdk/img/<?php echo $APP_NAME;?>/close_btn.png" class="close_btn" style="float:left;margin-top:4px;margin-left:5px;vertical-align:middle;display:inline-block" /></a>	
					</div>
				<?php $counter++; } ?>
				
				
				</div>
				
			
				<p>
				
					<input type="button" class="btn" value="Add New Marker" onclick="adminPageSettings.open_popup('googlemapmarker_add_marker',400,'Add Marker');" style="margin-top:15px;margin-left:35px;width:352px;height:20px;cursor:pointer" />
				</p>
				
			</span>
		</td>				
	</tr>	
	
	
</table>
</form>


<div>
	<div>
		<p>
			<span class="module_title" onclick="adminPageSettings.displayOption();" style="cursor:pointer;">Display Options </span>
			<span id="pg_disqus_arrow" class="symb_style" style="font-family:??" onclick="adminPageSettings.displayOption();"><img src="/_sdk/img/<?php echo $APP_NAME;?>/arrow_up.png"></span>
		</p>
	</div>
	<!-- visible if display option is selected -->
	<div id="pg_googlemapmark_option" style="display:none;">
	<table border="0" cellspacing="0" class="tbl_option">
		<tbody><tr>
			<td style="width:155px;">
			<input class="fl" id="zoom_control" name="zoom_control" type="checkbox" <?php echo ($aDisplayOpt['zoom']['zoom_flag'] == 1) ? "checked" : "" ;?> >
			<label class="fl sml smt" for="zoom_control">Zoom Control</label></td>
			<td style="width:179px;">
				<label for="pg_googlemapsimple_zoomcontrolsize" class="fl width_1" >Size</label>
				<select title="select rows" class="fl"  name="zoom_size" id="zoom_size" disabled="">
					<option value="0" <?php echo ($aDisplayOpt['zoom']['zoom_size'] == 0) ? "selected" : "" ;?> >Small</option>
					<option value="1" <?php echo ($aDisplayOpt['zoom']['zoom_size'] == 1) ? "selected" : "" ;?> >Large</option>
				</select>

			</td>
			<td>
				<label for="pg_googlemapsimple_zoomcontrolposition" class="fl width_1" >Position</label>
				<select title="select rows" class="fl" name="zoom_position" id="zoom_position" disabled="" >
				<?php 
					foreach($aPositionData as $key=>$val){?>
						
						<option value="<?php echo $key; ?>" <?php echo ($aDisplayOpt['zoom']['zoom_position'] == $key) ? "selected" : ""; ?> ><?php echo $val; ?></option>
						
				<?php } ?>
				
				</select>
			</td>
		</tr>
		<tr>
			<td>
			<input class="fl" type="checkbox" name="map_type_control" id="map_type_control" onclick="adminPageSettings.optType();" <?php echo ($aDisplayOpt['map']['map_flag'] == 1) ? "checked" : "" ;?> >
			<label class="fl sml smt" for="map_type_control">Map Type Control</label></td>
			<td>
				<label for="map_type" class="fl width_1" >Type</label>
				<select class="fl" title="select rows" name="map_type" id="map_type" disabled="" onchange="adminPageSettings.changeMapType();">
					<option value="0" <?php echo ($aDisplayOpt['map']['map_type'] == 0) ? "selected" : "" ;?> >Bar</option>
					<option value="1" <?php echo ($aDisplayOpt['map']['map_type'] == 1) ? "selected" : "" ;?>>Dropdown</option>
				</select>
			</td>
			<td>
				<label for="map_type_position" class="fl width_1" >Position</label>
				<select class="fl" title="select rows" name="map_type_position" id="map_type_position" disabled="" >
				<?php 
					foreach($aPositionData as $key=>$val){?>
						
						<option value="<?php echo $key; ?>" <?php echo ($aDisplayOpt['map']['map_position'] == $key) ? "selected" : ""; ?> ><?php echo $val; ?></option>
						
				<?php } ?>
				</select>
			</td>
		</tr>
		<tr>
			<td>
			<input class="fl" <?php echo ($aDisplayOpt['scale']['scale_flag'] == 1) ? "checked" : "" ;?> type="checkbox" name="scale_control" id="scale_control" >
			<label class="fl smt sml" for="scale_control">Scale</label></td>
			<td colspan="2">
				<label for="scale_control_position" class="fl width_1" >Position</label>
				<select title="select rows" class="fl"  name="scale_control_position" id="scale_control_position" disabled="">
				<?php 
					foreach($aPositionData as $key=>$val){?>
						
						<option value="<?php echo $key; ?>" <?php echo ($aDisplayOpt['scale']['scale_position'] == $key) ? "selected" : ""; ?> ><?php echo $val; ?></option>
						
				<?php } ?>
				</select>
			</td>
		</tr>
		<tr>
			<td>
			<input <?php echo ($aDisplayOpt['street']['street_flag'] == 1) ? "checked" : "" ;?> type="checkbox" name="street_view_control" id="street_view_control" class="fl" >
			<label class="fl smt sml" for="street_view_control">Street View Toggle</label></td>
			<td colspan="2">
				<label for="pg_googlemapsimple_streetviewposition" class="fl width_1" >Position</label>
				<select title="select rows" class="fl" name="street_view_position" id="street_view_position" disabled="" >
				<?php 
					foreach($aPositionData as $key=>$val){?>
						
						<option value="<?php echo $key; ?>" <?php echo ($aDisplayOpt['street']['street_position'] == $key) ? "selected" : ""; ?> ><?php echo $val; ?></option>
						
				<?php } ?>
				</select>
			</td>
		</tr>
	</tbody></table>
	</div>
</div>

<div class="tbl_lb_wide_btn">
		<input type="button" value="Save" class="btn_apply" onclick="adminPageSettings.setting_submit()" />
		<a href="#" class="add_link" title="Reset to default" onclick="adminPageSettings.reset_default()" >Reset to Default</a>
		<?php 
			 if ($bExtensionView === 1){
			            echo '<a href="/admin/sub/?module=ExtensionPageManage&code=' . ucfirst(APP_ID) . '&etype=MODULE" class="add_link" title="Return to Manage ' . ucfirst(APP_ID) . '">Return to Manage ' . ucfirst(APP_ID) . '</a>
			            <a href="/admin/sub/?module=ExtensionPageMyextensions" class="add_link" title="Return to My Extensions">Return to My Extensions</a>';
			  }
		?>
</div>





<!-- Add marker POPUP -->
<div id="<?php echo $APP_NAME;?>_add_marker" style="display:none;"  >
	<div  class="admin_popup_contents">
	<form id="<?php echo $APP_NAME;?>_popup_form" name="<?php echo $APP_NAME;?>_popup_form" method="POST" >
	    <div class="input_area">
	        <div>
	            <label for="how">Address or Place</label>
	            <input type="text" class="fix" value="" id="<?php echo $APP_NAME;?>_search_field" fw-filter="isFill" >
	            <a href="javascript:void(0)" class="btn_nor_01 btn_width_st1" title="Set center" onclick="adminPageSettings.set_search();">Search</a>
	            <div id="<?php echo $APP_NAME;?>_err_here" ></div>
	        </div>
	        <p>
	         <ul class="marker_type" style="width:500px;">
            	<li>
                    <label for="marker_00"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_00.png" alt="google marker 0"></label>
                    <input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_00" class="input_rdo" checked="checked" value="0">
                </li>
                <li>
                    <label for="marker_01"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_01.png" alt="google marker 1"></label>
                    <input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_01" class="input_rdo"  value="1">
                </li>
                <li>
                    <label for="marker_02"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_02.png" alt="google marker 2"></label>
                    <input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_02" class="input_rdo" value="2">
                </li>
                <li>
                    <label for="marker_03"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_03.png" alt="google marker 3"></label>
                    <input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_03" class="input_rdo" value="3">
                </li>
                <li>
                    <label for="marker_04"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_04.png" alt="google marker 4"></label>
                    <input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_04" class="input_rdo" value="4">
                </li>
                <li>
                    <label for="marker_05"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_05.png" alt="google marker 5"></label>
                    <input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_05" class="input_rdo" value="5">
                </li>
               
                <li>
					<span style="float:left;width:220px;margin-top:29px;margin-left:8px">
                   		<input type="radio" onclick="adminPageSettings.enable_image_url()" name="marker_type" id="marker_06"  value="6" style="float:left;width:15px;clear:none;" />
                    	<input type="text"  value="Icon url for marker *(15 X 26)" id="<?php echo $APP_NAME;?>_image_url" disabled style="float:left;width:184px;margin-top:5px;margin-left:5px;clear:none;font-style:italic;padding-left:5px;" />
					</span>	
                    
                </li>
               
            </ul>
	        
	        
	        </p>
	    </div>
	
	    <div id="<?php echo $APP_NAME;?>_center_list_contents">
	        <div id="<?php echo $APP_NAME;?>_result_con" >
	       		 <ul id="<?php echo $APP_NAME;?>_result" class="place_check_list"></ul>
	        </div>
	    </div><a href="javascript: adminPageSettings.add_location();" class="btn_ly" title="Add new marker">Add New Marker</a>
	    </form>
     </div>
</div>

<!--form for reset-->
<form method="POST" action="<?php echo $sUrl;?>" name="<?php echo $APP_NAME;?>_form_reset" id="<?php echo $APP_NAME;?>_form_reset" ><input type="hidden" name="<?php echo $APP_NAME;?>_reset" value="true" /></form>




</body>
</html>
