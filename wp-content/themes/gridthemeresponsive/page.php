<?php get_header(); ?>

    <div id="single">
    	<div class="spacer">
		<div class="page_content">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      
				<?php the_content(); ?>
            
            <br /><br />
            
            <?php endwhile; else: ?>
        
            <h3>Sorry, no posts matched your criteria.</h3>
        
        <?php endif; ?>
    
        <div class="clear"></div> 
        </div><!--single_content-->
        </div>                   
    </div><!--//single-->
    
    
    <?php get_sidebar(); ?>
    
<?php get_footer(); ?>