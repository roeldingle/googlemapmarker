<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head></head>
<body>

<!-- hidden values -->
<input type="hidden"  id="APP_NAME" value="<?php echo $APP_NAME;?>" />
<input type="hidden"  id="<?php echo $APP_NAME;?>_lat" value="<?php echo $iLat;?>" />
<input type="hidden"  id="<?php echo $APP_NAME;?>_lng" value="<?php echo $iLng;?>" />

		
<form name="<?php echo $APP_NAME;?>_form" id="googlemapmark_form" action="setup.php" method="POST">
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
			<select title="select rows" class="rows" name="<?php echo $APP_NAME;?>_zoom" id="<?php echo $APP_NAME;?>_zoom" onchange="adminPageSettings.init_map();">
			<?php for($iCount = 1; $iCount <= 20; $iCount++){ ?>
				<option><?php echo $iCount; ?></option>
			<?php  }  ?>
			</select>
		</td>
	</tr>
	
	
	<!-- map type -->
	<tr>
		<th><label>Map Type</label></th>
		<td>
			<select id="<?php echo $APP_NAME;?>_maptype"  name="<?php echo $APP_NAME;?>_maptype" onchange="adminPageSettings.init_map();" >
				<option>Normal</option>
				<option>Satellite</option>
				<option>Hybrid</option>
				<option>Terrain</option>
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
				
				
				<!-- container for the locations -->
				<div id="<?php echo $APP_NAME;?>_location_wrap">
				
				<!-- loop the array containing the marker data -->
				<?php  $counter = 0; foreach($aMarkers as $val){ ?>
					<div class="add_location" id="<?php echo $APP_NAME;?>_marker_con_<?php echo $counter;?>" >
						<img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_0<?php echo $val['marker_type'];?>.png" />
						<input type="text"  value="<?php echo $val['loc'];?> (<?php echo $val['lat'];?>,<?php echo $val['lng'];?>,<?php echo $val['marker_type'];?>)" readonly name="<?php echo $APP_NAME;?>_marker[]"  class="textbox" value="" style="width:350px" />
						<a  href="javascript:Mapquestmap_admin.remove_location(<?php echo $counter;?>);"  ><img src="/_sdk/img/mapquestmap/close_btn.gif" class="close_btn" style="vertical-align:middle;display:inline-block" /></a>	
					</div>
				<?php $counter++; } ?>
				
				
				</div>
				
			
				<p>
				
					<input type="button" class="btn" value="Add New Marker" onclick="adminPageSettings.open_popup('googlemapmarker_set_center',400,'Add Marker');" style="margin-left:19px;width:302px;height:20px;cursor:pointer" />
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
			<span id="pg_disqus_arrow" class="symb_style" style="font-family:??" onclick="adminPageSettings.displayOption();"><img src="http://qa-usplugin.cafe24test.com/plugin/Googlemapmark/1.0.0/images/arrow_up.png"></span>
		</p>
	</div>
	<!-- visible if display option is selected -->
	<div id="pg_googlemapmark_option" style="">
	<table border="0" cellspacing="0" class="tbl_option">
		<tbody><tr>
			<td style="width:155px;">
			<input class="fl" id="zoom_control" name="zoom_control" type="checkbox">
			<label class="fl sml smt" for="zoom_control">Zoom Control</label></td>
			<td style="width:179px;">
				<label for="pg_googlemapsimple_zoomcontrolsize" class="fl width_1" >Size</label>
				<select title="select rows" class="fl"  name="zoom_size" id="zoom_size" disabled="" onchange="adminPageSettings.changeZoomCtrSize();">
					<option value="0" selected="">Small</option>
					<option value="1">Large</option>
				</select>

			</td>
			<td>
				<label for="pg_googlemapsimple_zoomcontrolposition" class="fl width_1" >Position</label>
				<select title="select rows" class="fl" name="zoom_position" id="zoom_position" disabled="" onchange="adminPageSettings.changeZoomCtrPos();">
					<option value="0" selected="">Top Left</option>
					<option value="1">Top Right</option>
					<option value="2">Top Center</option>
					<option value="3">Left Top</option>
					<option value="4">Left Center</option>
					<option value="5">Left Bottom</option>
					<option value="6">Right Top</option>
					<option value="7">Right Center</option>
					<option value="8">Right Bottom</option>
					<option value="9">Bottom Left</option>
					<option value="10">Bottom Right</option>
					<option value="11">Bottom Center</option>
				</select>
			</td>
		</tr>
		<tr>
			<td>
			<input class="fl" type="checkbox" name="map_type_control" id="map_type_control" onclick="adminPageSettings.optType();">
			<label class="fl sml smt" for="map_type_control">Map Type Control</label></td>
			<td>
				<label for="map_type" class="fl width_1" >Type</label>
				<select class="fl" title="select rows" name="map_type" id="map_type" disabled="" onchange="adminPageSettings.changeMapType();">
					<option value="0" selected="">Bar</option>
					<option value="1">Dropdown</option>
				</select>
			</td>
			<td>
				<label for="map_type_position" class="fl width_1" >Position</label>
				<select class="fl" title="select rows" name="map_type_position" id="map_type_position" disabled="" onchange="adminPageSettings.changeMapTypePosition();">
					<option value="0" selected="">Top Left</option>
					<option value="1">Top Right</option>
					<option value="2">Top Center</option>
					<option value="3">Left Top</option>
					<option value="4">Left Center</option>
					<option value="5">Left Bottom</option>
					<option value="6" selected="">Right Top</option>
					<option value="7">Right Center</option>
					<option value="8">Right Bottom</option>
					<option value="9">Bottom Left</option>
					<option value="10">Bottom Right</option>
					<option value="11">Bottom Center</option>
				</select>
			</td>
		</tr>
		<tr>
			<td>
			<input class="fl" type="checkbox" name="scale_control" id="scale_control" onclick="adminPageSettings.optScale();">
			<label class="fl smt sml" for="scale_control">Scale</label></td>
			<td colspan="2">
				<label for="scale_control_position" class="fl width_1" >Position</label>
				<select title="select rows" class="fl"  name="scale_control_position" id="scale_control_position" disabled="" onchange="adminPageSettings.changeScaleControlPosition();">
					<option value="0" selected="">Top Left</option>
					<option value="1">Top Right</option>
					<option value="2">Top Center</option>
					<option value="3">Left Top</option>
					<option value="4">Left Center</option>
					<option value="5">Left Bottom</option>
					<option value="6">Right Top</option>
					<option value="7">Right Center</option>
					<option value="8">Right Bottom</option>
					<option value="9">Bottom Left</option>
					<option value="10">Bottom Right</option>
					<option value="11" selected="">Bottom Center</option>
				</select>
			</td>
		</tr>
		<tr>
			<td>
			<input type="checkbox" name="street_view_control" id="street_view_control" class="fl" onclick="adminPageSettings.optStreet();">
			<label class="fl smt sml" for="street_view_control">Street View Toggle</label></td>
			<td colspan="2">
				<label for="pg_googlemapsimple_streetviewposition" class="fl width_1" >Position</label>
				<select title="select rows" class="fl" name="street_view_position" id="street_view_position" disabled="" onchange="adminPageSettings.changeStreetViewPosition();">
					<option value="0" selected="">Top Left</option>
					<option value="1">Top Right</option>
					<option value="2">Top Center</option>
					<option value="3">Left Top</option>
					<option value="4">Left Center</option>
					<option value="5">Left Bottom</option>
					<option value="6">Right Top</option>
					<option value="7">Right Center</option>
					<option value="8">Right Bottom</option>
					<option value="9">Bottom Left</option>
					<option value="10">Bottom Right</option>
					<option value="11">Bottom Center</option>
				</select>
			</td>
		</tr>
	</tbody></table>
	</div>
</div>







<!-- SET CENTER POPUP -->
<div id="<?php echo $APP_NAME;?>_set_center" style="width: 350px; z-index: 10002; left: 766px; top: 394px;display:none;">
	<div class="admin_popup_contents">
	    <div class="input_area">
	        <p>
	            <label for="how">Address or Place</label>
	            <input type="text" class="fix" value="" id="<?php echo $APP_NAME;?>_search_field">
	            <a href="javascript:void(0)" class="btn_nor_01 btn_width_st1" title="Set center" onclick="adminPageSettings.set_search();">Search</a>
	        </p>
	        <p>
	         <ul class="marker_type">
            	<li>
                    <label for="marker_00"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_00.png" alt="google marker 0"></label>
                    <input type="radio" name="marker_type" id="marker_00" class="input_rdo" checked="checked" value="0">
                </li>
                <li>
                    <label for="marker_01"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_01.png" alt="google marker 1"></label>
                    <input type="radio" name="marker_type" id="marker_01" class="input_rdo"  value="1">
                </li>
                <li>
                    <label for="marker_02"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_02.png" alt="google marker 2"></label>
                    <input type="radio" name="marker_type" id="marker_02" class="input_rdo" value="2">
                </li>
                <li>
                    <label for="marker_03"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_03.png" alt="google marker 3"></label>
                    <input type="radio" name="marker_type" id="marker_03" class="input_rdo" value="3">
                </li>
                <li>
                    <label for="marker_04"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_04.png" alt="google marker 4"></label>
                    <input type="radio" name="marker_type" id="marker_04" class="input_rdo" value="4">
                </li>
                <li>
                    <label for="marker_05"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_05.png" alt="google marker 5"></label>
                    <input type="radio" name="marker_type" id="marker_05" class="input_rdo" value="5">
                </li>
            </ul>
	        
	        
	        </p>
	    </div>
	
	    <div id="<?php echo $APP_NAME;?>_center_list_contents">
	        <div id="<?php echo $APP_NAME;?>_result_con" >
	       		 <ul id="<?php echo $APP_NAME;?>_result" class="place_check_list"></ul>
	        </div>
	    </div><a href="javascript: adminPageSettings.add_location();" class="btn_ly" title="Add new marker">Add New Marker</a>
     </div>
</div>









<!-- MARKER POPUP -->
<div id="<?php echo $APP_NAME;?>_marker_options" style="width: 650px; top: 409px; left: 627px; z-index: 10002;display:none;"><h3 id="pop_header">Insert Google Marker</h3><div class="admin_popup_contents">
    <p class="require"><span class="neccesary">*</span> Required</p>
    <form id="google_map_marker_search_form">
    <table border="1" cellspacing="0" class="table_input_vr tbl_zero">
    <colgroup>
        <col width="200px">
        <col width="*">
    </colgroup>
    <tbody><tr>
        <th>
            <ul class="marker_type">
            	<li>
                    <label for="marker_00"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_00.png" alt="google marker 0"></label>
                    <input type="radio" name="marker_type" id="marker_00" class="input_rdo" checked="checked" value="0">
                </li>
                <li>
                    <label for="marker_01"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_01.png" alt="google marker 1"></label>
                    <input type="radio" name="marker_type" id="marker_01" class="input_rdo"  value="1">
                </li>
                <li>
                    <label for="marker_02"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_02.png" alt="google marker 2"></label>
                    <input type="radio" name="marker_type" id="marker_02" class="input_rdo" value="2">
                </li>
                <li>
                    <label for="marker_03"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_03.png" alt="google marker 3"></label>
                    <input type="radio" name="marker_type" id="marker_03" class="input_rdo" value="3">
                </li>
                <li>
                    <label for="marker_04"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_04.png" alt="google marker 4"></label>
                    <input type="radio" name="marker_type" id="marker_04" class="input_rdo" value="4">
                </li>
                <li>
                    <label for="marker_05"><img src="/_sdk/img/<?php echo $APP_NAME;?>/icon_marker_05.png" alt="google marker 5"></label>
                    <input type="radio" name="marker_type" id="marker_05" class="input_rdo" value="5">
                </li>
            </ul>
            <span class="neccesary">*</span>
        </th>
        <td class="align_top">
            <span id="marker_wrap"><input type="text" id="<?php echo $APP_NAME;?>_caption" ></span>
            <span class="annonce_vr">This will be the display caption.</span>
        </td>
    </tr>
    </tbody></table>
    </form>
    <div class="ly_cnt_btn" id="<?php echo $APP_NAME;?>_add_marker_holder"></div>
	</div>
</div>










<!-- MARKER SEARCH -->
<div id="google_map_marker_search_list" style="width: 350px; z-index: 10002; left: 766px; top: 394px;display:none;"><h3 id="pop_header">Search</h3><div class="admin_popup_contents">
    <div class="input_area">
        <p>
            <label for="how">Address or Place</label>
            <input type="text" class="_validate fix" value="" id="google_map_mark_search_field" filter="fill[0]">
            <a href="#" class="btn_nor_01 btn_width_st1" title="Set center" onclick="Googlemap.searchXMark();">Search</a>
        </p>
    </div>

    <div id="google_map_mark_search_list_contents">
        <div id="address_list_mark"><ul class="place_check_list"></ul></div>

        <div class="ly_cnt_btn"><a href="#" class="btn_ly" title="Add Marker" onclick="Googlemap._setMarker();">Add Marker</a></div>
    </div>
</div><a href="#none" class="clse" title="popup close" onclick="popup.close('google_map_center_list', true)">X</a></div>

<!-- ALERT -->
<div id="google_map_marker_error" style="width: 300px; z-index: 10002; left: 766px; top: 394px;display:none;"><h3 id="pop_header">Notice</h3><div class="admin_popup_contents">
    <div class="input_area">
        <p>You are required to add at least one (1) marker. Please click "Add new Marker" button.</p>
    </div>
    <div class="ly_cnt_btn"><a href="#" class="btn_apply" title="Add Marker" onclick="popup.close('google_map_marker_error', true);">Ok</a></div>
</div><a href="#none" class="clse" title="popup close" onclick="popup.close('google_map_marker_error', true);">X</a></div>

</html>
