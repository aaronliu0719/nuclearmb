<?php

function base_url($uri="")
{
    $base_path = "/nuclearmb/";

	$port = $_SERVER["SERVER_PORT"];
    $host = $_SERVER["SERVER_NAME"];

    $protocol = "http://";


    if(!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443)
    {
        $protocol = "https://";
    }

    $base_url = $protocol.$host;
    if(($protocol == "http://" && $port !== "80") || ($protocol == "https://" && $port !== "443"))
    {
        $base_url .= ":".$port;
    }

    $base_url .= $base_path;

    if($uri!="")
    {
    	if(substr($uri,0, 1)=="/")
    	{
    		if(strlen($uri)>1)
    		{
    			$uri = substr($uri, 1, strlen($uri)-1);
    		}
    		else
    		{
    			$uri = "";
    		}
    	}
    }
    
	$base_url .= $uri;

    return $base_url;
}
?>
