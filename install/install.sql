CREATE TABLE IF NOT EXISTS `googlemapmarker_settings`(
			 `idx` INT NOT NULL AUTO_INCREMENT, 
			 `zoom_level` INT NOT NULL,
			  `map_type` INT NOT NULL,
			   `locations` TEXT NOT NULL,
			    `display_options` TEXT NOT NULL,
			     PRIMARY KEY (`idx`) ); 

