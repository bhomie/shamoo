<?php get_header(); ?>
<div id="intro">
    <div id="introbg"></div>
    <div id="welcomeTxt">
        <p class="opener">Brian Sander is a <span id="headline" class="headline rev">Product Designer</span> with 7 years of experience making the world a better place.</p>
    </div>
    <script text="text/javascript">
        $(document).ready(function() {
            $('#menu-content ul li a').addClass('white');
            $('.logo').addClass('white');
        });
        $("#menu-content ul li a").click(function() {
            $("#menu-content ul li a").removeClass('white');
            $(".logo").removeClass('white');
        });
        $(".btnBack").click(function() {
            $("#menu-content ul li a").addClass('white');
            $(".logo").addClass('white');
            $("#menu-content ul li a").removeClass('colorize');
        });
    </script>
    <script src="http://briansander.com/wp-content/themes/gridthemeresponsive/js/intro.js" type="text/javascript" charset="utf-8"></script>
    <?php get_footer(); ?>