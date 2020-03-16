<?php get_header(); ?>
    <div id="single">
      	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="single_content">
            
				<?php the_content(); ?>
            
            <br />
             <div id="singleFooter">
	             <?php next_post_link('<div class="footerButton"><span class="footerTitle" >Previous</span> <br /> %link </div>'); ?>
				 <?php previous_post_link('<div class="footerButton"><span class="footerTitle" >Next</span> <br /> %link </div>'); ?>
<br />
    </div>
        <?php endwhile; else: ?>
        
            <h3>Sorry, no posts matched your criteria.</h3>
        
        <?php endif; ?>    
    
        <div class="clear"></div> 
        </div><!--single_content-->          
    </div><!--//single-->
<?php get_footer(); ?>