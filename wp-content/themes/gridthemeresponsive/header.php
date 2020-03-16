<!-- Hi there! Check out my code, I've written it all myself. See something that could be done better? Drop me a line I'm always trying to improve. All Works & Content are Copyright 2010-2018 Brian Sander.
.
.
.
.
-->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">

<head>

    <title>
        <?php wp_title('&laquo;', true, 'right'); ?>
        <?php bloginfo('name'); ?>
    </title>

    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" title="no title" charset="utf-8" />
    <script src="<?php bloginfo('stylesheet_directory'); ?>/js/jq.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Raleway:400,900' rel='stylesheet' type='text/css'>
    <script src="<?php bloginfo('stylesheet_directory'); ?>/js/custom.js" type="text/javascript" charset="utf-8"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!--[if lt IE 9]>
	<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
    
    <?php wp_head(); ?>
</head>

<body>
    <div id="menu-content" class="colorize">
        <ul id="menu-main" class="menu">
            <li><a href="<?php bloginfo('url'); ?>"><span class="logo">BRIAN SANDER</span></a></li>
            <li id="menu-item-1653"><a>Work</a></li>
            <li id="menu-item-331"><a>About</a></li>
            <li id="menu-item-330"><a>Contact</a></li>
        </ul>
    </div>
    <a class="btnBack mobile" href="" onclick="return false;">close</a>
    <!--//menu_container-->
        <div id="work-content">
        <?php
$page = get_page_by_title( 'work-new' );
$content = apply_filters('the_content', $page->post_content); 
echo $content;
?>
            <br class="clear" />
    </div>
<!--Work Page Redacted -->
    <div id="about-content">
        <?php
$page = get_page_by_title( 'about' );
$content = apply_filters('the_content', $page->post_content); 
echo $content;
?>
            <br class="clear" />
    </div>
    <div id="contact-content">
        <?php
$page = get_page_by_title( 'contact' );
$content = apply_filters('the_content', $page->post_content); 
echo $content;
?>
            <br class="clear" />
    </div>
    <div id="container"></div>
    <!-- Container -->
    <div id="main_container">

        <!--top bar-->
