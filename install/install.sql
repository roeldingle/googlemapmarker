CREATE TABLE IF NOT EXISTS `googlemapmarker_admin` (
				   pga_idx int(10) unsigned NOT NULL auto_increment,
					  pga_pm_idx int(10) unsigned NOT NULL,
					  pga_center varchar(100) NOT NULL,
					  pga_coordinates varchar(100) NULL,
					  pga_size varchar(15) NOT NULL,
					  pga_zoom int(2) NOT NULL,
					  pga_map_type int(1) NOT NULL,
					  pga_caption varchar(100) NULL,
					  pga_zoomcontrol_size int(1) default NULL,
					  pga_zoomcontrol_position int(1) default NULL,
					  pga_maptypecontrol_type int(1) default NULL,
					  pga_maptypecontrol_position int(1) default NULL,
					  pga_scale_position int(1) default NULL,
					  pga_streetview_position int(1) default NULL,
					  PRIMARY KEY  (pga_idx)
				) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
	
				
CREATE TABLE IF NOT EXISTS `googlemapmarker_settings` (
					  pgs_idx int(10) unsigned NOT NULL auto_increment,
					
					  pgs_location varchar(100) NOT NULL,
					  PRIMARY KEY  (pgs_idx)
					) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1
