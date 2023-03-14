<?php

/*
file defines $data variable
*/


/**
 * Clean comments of json content and decode it with json_decode().
 * Work like the original php json_decode() function with the same params
 *
 * @param   string  $json    The json string being decoded
 * @param   bool    $assoc   When TRUE, returned objects will be converted into associative arrays.
 * @param   integer $depth   User specified recursion depth. (>=5.3)
 * @param   integer $options Bitmask of JSON decode options. (>=5.4)
 * @return  string
 */
function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0)
{
	// search and remove comments like /* */ and //
	$json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t]//.*)|(^//.*)#", '', $json);

	$json = json_decode($json, $assoc, $depth, $options);

    $json_error = json_last_error();

    if ($json_error !== JSON_ERROR_NONE) {
        $json_error_message = json_last_error_msg();
        echo "json error ($json_error) : $json_error_message";
        die();
    }

	return $json;
}

function load_json_data_from_path($dataurl)
{
    $filedata = file_get_contents($dataurl); // put the contents of the file into a variable

    if ($filedata === false) {
        echo "failed to open json data file";
        die();
    }

    return json_clean_decode($filedata); // decode the JSON feed
}

$data = load_json_data_from_path($_SERVER['DOCUMENT_ROOT'] . '/data.json');