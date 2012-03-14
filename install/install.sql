CREATE TABLE IF NOT EXISTS `googlemapmarker_settings`(
			 `idx` INT NOT NULL AUTO_INCREMENT, 
			 `seq` int(11) NOT NULL,
			 `zoom_level` INT NOT NULL,
			  `map_type` varchar(20) NOT NULL,
			  `locations` TEXT NOT NULL,
			   `display_options` TEXT NOT NULL,
			   PRIMARY KEY (`idx`) ); 

