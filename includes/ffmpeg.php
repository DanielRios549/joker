<?php
/*
	Name    : ffmpeg web gui
    Author  : Greg Colley
    Created : 03/12/2011
    Update  : 17/10/2014
    Version : 0.2 beta
    This is a upload an convert php script for ffmpeg. Allowing you to convert video files to html5 ready video via ffmpeg.
	
*/
function logFile($logPath = '', $logName = null, $startingLogName = null)
{
	if (file_exists($logPath.$logName))
	{
		$fileSize = filesize($logPath.$logName);
		//if file size is 3mb or bigger
		if ($fileSize >= 999999999993145728)
		{
			$newLogName = 'overflow.log';
			//$newLogName = $this->rename_if_exists($logPath,$startingLogName);
			$log = $logPath.$newLogName;
			$logName = $newLogName;
			$fh = fopen($log, "a") or die("can't open file");
			clearstatcache();
			chmod($log, 0777);
			clearstatcache();
		}
		else
		{
			$log = $logPath.$logName;
		}
	}
	else
	{
		$log = $logPath.$logName;
		fopen($log, 'a') or die("can't open file");
		clearstatcache();
		chmod($log, 0777);
		clearstatcache();
	}
	return array($log, $logPath, $logName);
}
function logText($file, $text){
	$log = fopen($file, 'a') or die("can't open file");
	fwrite($log, $text);
	fclose($log);
}
set_time_limit(0);
ini_set('display_errors','On');
$maxFileSize = 0; // 314572800; // 300MB
$allowedMimeTypes = array('video/avi','video/mp4','video/mpeg','video/quicktime','video/x-msvideo','video/msvideo','video/x-ms-wmv');
$error 				= false;
$uploadSuccess 		= false;
$stillImages		= false;
$renderHTML5 		= false;
$newline 			= "\n";
$fileSplit 			= '_';
$timeStamp 			= time();
$filePath 			= realpath('./').'/';
$webPath 			= '/ffmpeg_web_gui/';
$ffmpegCommand 		= '/usr/local/bin/ffmpeg'; // x264, xbix, ora, gsm, lame, faac, swscale, 0.5
$qt_faststart 		= '/usr/local/bin/qt-faststart';
$uploadLocation 	= 'upload/';
$convertedLocation 	= 'converted/';
if (isset($_FILES) && $_FILES) {
	// Custom Settings
	// Video
	$videoSize 			= isset($_POST['video_size']) 					? $_POST['video_size'] 		: '640x360';
	$videoBitrate 		= isset($_POST['video_bitrate'])				? (int)$_POST['video_bitrate'] 	: '700';
	$videoFramerate		= isset($_POST['video_framerate'])				? (int)$_POST['video_framerate'] : '30';
	$videoDeinterlace	= isset($_POST['encoding_video_deinterlace'])	? 1 : 0 ;
	// Adudio
	$audioEnabled		= isset($_POST['encoding_enable_audio'])		? 1 : 0 ;
	$audioSamplerate	= isset($_POST['encoding_audio_sampling_rate'])	? (int)$_POST['encoding_audio_sampling_rate'] : '44100';
	$audioBitrate		= isset($_POST['encoding_audio_bitrate'])		? (int)$_POST['encoding_audio_bitrate'] : '128';
	$audioChannels		= (isset($_POST['encoding_audio_channels']) && $_POST['encoding_audio_channels']	== 'stereo')	? 2 : 1 ;
	// Build up the ffmpeg params from the values posted from the html form
	$customParams  = ' -s '.$videoSize; 				// Format the video size
	$customParams .= ' -b:v '.$videoBitrate.'k'; 		// Format the video bit rate
	$customParams .= ' -r '.$videoFramerate;			// Format the video frame rate
	if ($videoDeinterlace) {
		$customParams .= ' -deinterlace ';				// Deinterlace the video
	}
	if ($audioEnabled) {
		$customParams .= ' -ar '.$audioSamplerate;		// Audio sample rate
		$customParams .= ' -ab '.$audioBitrate.'k';		// Audio bit rate
		$customParams .= ' -ac '.$audioChannels;		// Audio Channels
	}
	else
	{
		$customParams .= ' -an '; 						// Disable audio
	}
	$customParams .= ' -y ';							// Overwrite existing file
	// Check the uploaded mime type
	if (in_array($_FILES["file"]["type"],$allowedMimeTypes ))
	{
		// Check the uploaded file size 
		if ($_FILES["file"]["size"] < $maxFileSize || $maxFileSize == 0) {
		
			if ($_FILES["file"]["error"] > 0)
			{
				$error =  "Return Code: " . $_FILES["file"]["error"];
			}
			else
			{
				$uploadSuccess  = "Upload: " . $_FILES["file"]["name"] . "<br />";
				$uploadSuccess .= "Type: " . $_FILES["file"]["type"] . "<br />";
				$uploadSuccess .= "Size: " . $_FILES["file"]["size"] . " bytes<br />";
				$uploadSuccess .= "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
				$uploadedFilename = $timeStamp.$fileSplit.strtolower($_FILES["file"]["name"]);
				if (file_exists($uploadLocation . $uploadedFilename))
				{
					$error = 'Error - '.$uploadedFilename. " already exists. ";
				}
				else
				{
					move_uploaded_file($_FILES["file"]["tmp_name"],$uploadLocation . $uploadedFilename);
					$uploadSuccess .= "Stored in: " . $uploadLocation . $uploadedFilename;
					$file_uploaded = $uploadLocation . $uploadedFilename;
					$source_ext = pathinfo($uploadedFilename, PATHINFO_EXTENSION);
					// Try and make a folder for neater file structure.
					if(!file_exists($filePath.$convertedLocation.$timeStamp))
					{
						mkdir($filePath.$convertedLocation.$timeStamp);
						$uploadSuccess .= '<a href="'.$convertedLocation.$timeStamp.'/">View converted videos</a>';
						$convertedLocation = $convertedLocation.$timeStamp.'/';
					}
					else
					{
						$uploadSuccess .= '<a href="'.$convertedLocation.'">View converted videos</a>';
					}
					// Mp4 x264
					if (isset($_POST['encoding_x264'])) {
						$command = $ffmpegCommand.' -i '.$filePath.$file_uploaded.' -vcodec libx264  -vsync 1  -bt 50k ';
						if ($audioEnabled) {
							$command = $command.' -acodec libfaac ';
						}
						$command = $command.$customParams.'  '.$filePath.$convertedLocation.$uploadedFilename.'_x264.mp4  2>&1';
						exec($command, $output, $status);
						$output = 'File: '.$file_uploaded."\n".implode("\n", $output);
						// Log to file
						list($log, $logPath, $logName)=logFile($filePath.'logs/','video_processs_'.date('d-m-Y').'.log');
						logText($logPath.$logName, $output);
						// run qt-faststart
						// This is a useful tool if you're showing your H.264 MP4 videos on the web.
						// It relocates some data in the video to allow playback to begin before the file is completely downloaded.
						// Usage: qt-faststart input.mp4 output.mp4.
						$command = $qt_faststart.' '.$filePath.$convertedLocation.$uploadedFilename.'_x264.mp4 '.$filePath.$convertedLocation.$uploadedFilename.'_x264_qt_faststart.mp4  2>&1';
						exec($command, $output, $status);
						$output = 'File: '.$file_uploaded."\n".implode("\n", $output);
						// Log to file
						list($log, $logPath, $logName)=logFile($filePath.'logs/','video_qt_faststart_'.date('d-m-Y').'.log');
						logText($logPath.$logName, $output);
					}
					// Ogv file
					if (isset($_POST['encoding_ogv'])) {
						$command = $ffmpegCommand.' -i '.$filePath.$file_uploaded;
						if ($audioEnabled) {
							$command = $command.' -acodec libvorbis ';
						}
						$command = $command.$customParams.' '.$filePath.$convertedLocation.$uploadedFilename.'.ogv  2>&1';
						exec($command, $output, $status);
						$output = 'File: '.$file_uploaded."\n".implode("\n", $output);
						// Log to file
						list($log, $logPath, $logName)=logFile($filePath.'logs/','video_processs_'.date('d-m-Y').'.log');
						logText($logPath.$logName, $output);
					}
					// Webm file
					if (isset($_POST['encoding_webm'])) {
						$command = $ffmpegCommand.' -i '.$filePath.$file_uploaded.$customParams.$filePath.$convertedLocation.$uploadedFilename.'.webm  2>&1';
						exec($command, $output, $status);
						$output = 'File: '.$file_uploaded."\n".implode("\n", $output);
						// Log to file
						list($log, $logPath, $logName)=logFile($filePath.'logs/','video_processs_'.date('d-m-Y').'.log');
						logText($logPath.$logName, $output);
					}
					// Screen shots
					if (isset($_POST['encoding_stills'])) {
						$command = $ffmpegCommand.' -i '.$filePath.$file_uploaded.' -s '.$videoSize.' -r 1 -vframes 5 -ss 00:01 -y '.$filePath.$convertedLocation.$uploadedFilename.'_stills_%d.png  2>&1';
						exec($command, $output, $status);
						$output = 'File: '.$file_uploaded."\n".implode("\n", $output);
						// Log to file
						list($log, $logPath, $logName)=logFile($filePath.'logs/','video_processs_'.date('d-m-Y').'.log');
						logText($logPath.$logName, $output);
						$stillImages = '<br/>';
						for($frame_i = 1; $frame_i < 5; $frame_i++){
							$stillImages .= '<img src="'.$convertedLocation.$uploadedFilename.'_stills_'.$frame_i.'.png" width="100" />';
						}
					}
					// Check if we can render the html5 player html
					if (isset($_POST['encoding_x264']) && isset($_POST['encoding_ogv']) && isset($_POST['encoding_webm']) && isset($_POST['encoding_stills'])) {
						$renderHTML5 = true;
					}
					/*
					   TODO
						iPod / iPhone
						-acodec aac -ab 128kb -vcodec mpeg4 -b 1200kb -mbd 2 -flags +4mv+trell -aic 2 -cmp 2 -subcmp 2 -s 320x180
						PSP
						-b:v 300-s 320x240 -vcodec xvid -ab 32 -ar 24000 -acodec aac fin
						// Extracting sound from a video, and save it as Mp3
						ffmpeg -i source_video.avi -vn -ar 44100 -ac 2 -ab 192 -f mp3 sound.mp3
						Convert to animated gif(uncompressed)
						ffmpeg -i video_origine.avi gif_anime.gif
						Convert .avi to .flv
						ffmpeg -i video_origine.avi -ab 56 -ar 44100 -b 200 -r 15 -s 320x240 -f flv
						Convert .avi to mpeg for dvd players
						ffmpeg -i temp.mp4 -target pal-dvd -ps 2000000000 -aspect 16:9 finale_video.mpeg
						Compress .avi to divx
						ffmpeg -i temp.avi -y -vcodec msmpeg4v2 video_finale.avi
					*/
					if ($renderHTML5) {
						// Render the HTML5 Player in html
						$w_x_h 	= explode('x',$videoSize);
						$width	=(is_array($w_x_h) && key_exists('0',$w_x_h)) ? $w_x_h[0] : '640';
						$height	=(is_array($w_x_h) && key_exists('1',$w_x_h)) ? $w_x_h[1] : '360';
						$output_start = "<html><head></head><body>";
						if ($stillImages) {
							$output = $stillImages;
						}
						else
						{
							$output = "";
						}
						
						$output = '<!-- "Video For Everybody" http://camendesign.com/code/video_for_everybody -->'.$newline;
						$output .= '<video controls="controls" poster="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_stills_3.png" width="'.$width.'" height="'.$height.'">'.$newline;
						$output .= '	<source src="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_x264_qt_faststart.mp4" type="video/mp4" />'.$newline;
						$output .= '	<source src="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'.webm" type="video/webm" />'.$newline;
						$output .= '	<source src="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'.ogv" type="video/ogg" />'.$newline;
						$output .= '	<object type="application/x-shockwave-flash" data="http://flashfox.googlecode.com/svn/trunk/flashfox.swf"  width="'.$width.'" height="'.$height.'">'.$newline;
						$output .= '		<param name="movie" value="http://flashfox.googlecode.com/svn/trunk/flashfox.swf" />'.$newline;
						$output .= '		<param name="allowFullScreen" value="true" />'.$newline;
						$output .= '		<param name="wmode" value="transparent" />'.$newline;
						$output .= '		<param name="flashVars" value="controls=true&amp;poster='.urlencode('http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_stills_3.png').'&amp;src='.urlencode('http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_x264_qt_faststart.mp4').'" />'.$newline;
						$output .= '		<img alt="Video" src="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_stills_3.png"  width="'.$width.'" height="'.$height.'" title="No video playback capabilities, please download the video below" />'.$newline;
						$output .= '	</object>'.$newline;
						$output .= '</video>'.$newline;
						$output .= '<p>'.$newline;
						$output .= '	<strong>Download video:</strong> <a href="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_x264_qt_faststart.mp4">MP4 format</a> | <a href="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'.ogv">Ogg format</a> | <a href="http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'.webm">WebM format</a>'.$newline;
						$output .= '</p>'.$newline;
						$output_end = '</body></html>'.$newline;
						list($log, $logPath, $logName)=logFile($filePath.$convertedLocation,$uploadedFilename.'_html5_player_.html');
						logText($logPath.$logName, $output_start.$output.$output_end);
						// redirect to the html player
						header('Location: http://'.$_SERVER['HTTP_HOST'].$webPath.$convertedLocation.$uploadedFilename.'_html5_player_.html');
					}
				}
			}
		}
		else
		{
			$error = "Error - Invalid file size<br />";
			$error .= "Size: " . $_FILES["file"]["size"] . " bytes<br />";
		}
	}
	else
	{
		$error  = "Error - Invalid file type<br />";
		$error .= "Type: " . $_FILES["file"]["type"] . "<br />";
	}
}
?>