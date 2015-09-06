<?php

function layout($content, $calling_page = '', $header = '') {
    echo '<!DOCTYPE html>';
    header("X-Content-Security-Policy: default-src 'self'");
    echo'
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset=utf-8 />
    <meta name=viewport content="width=device-width, initial-scale=1">
    <meta name="description" content="Programming, Video Games, and Music discussion by Walter Macfarland aka Epitaph64">
    <meta name="keywords" content="Epitaph64,Programming,Games,Music,Software,Tech">
    <meta name="author" content="Epitaph64">',
    $header,
	'
    <title>e64';
    if (strlen($calling_page) > 0) {
        echo ' - ', $calling_page;
    }
    echo '</title>
    <!--[if lt IE 9]>
        <script src="dist/html5shiv.js"></script>
    <![endif]-->
    <link rel="icon" type="image/png" href="/img/icon.png">
    <link rel="stylesheet" type="text/css" href="/css/default.css">
    <script>';
    echo "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-65158183-1', 'auto');ga('send', 'pageview');</script>";
    echo '
</head>
<body>
<div id="sidebar">
    <img src="/img/character.svg" alt="enzor-character" width="80" id="logo">
    <p><a href="/"';
    if (strcmp($calling_page, 'Home') == 0) {
        echo ' id="current-page"';
    }
    echo '>Home</a></p>
    <p><a href="/about-me.php"';
    if (strcmp($calling_page, 'About Me') == 0) {
        echo ' id="current-page"';
    }
    echo '>About Me</a></p><br>
</div>',
$content,
'</body>
</html>
            <!-- Copyright Walter Macfarland 2015 -->';
}

?>

