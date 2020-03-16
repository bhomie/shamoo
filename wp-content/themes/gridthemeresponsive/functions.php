<?php

include('settings.php');
remove_filter( 'the_content', 'wpautop' );

if (function_exists('add_theme_support')) {
	add_theme_support('menus');
}

function get_category_id($cat_name){
	$term = get_term_by('name', $cat_name, 'category');
	return $term->term_id;
}

function filter_ptags_on_images($content){
    return preg_replace('/<p>\\s*?(<a .*?><img.*?><\\/a>|<img.*?>)?\\s*<\\/p>/s', '\1', $content);
}
add_filter('the_content', 'filter_ptags_on_images');


function catch_that_image() {
  global $post, $posts;
  $first_img = '';
  ob_start();
  ob_end_clean();
  $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
  $first_img = $matches [1] [0];

  if(empty($first_img)){ //Defines a default image
    $first_img = "/images/post_default.png";
  }
  return $first_img;
}
/*Custom Password Post Display
function my_password_form() {
    global $post;
    $label = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );
    $o = '<div id="pwC">
    <form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post" autocomplete="off">
    <input class="pwI" name="post_password" id="' . $label . '" type="password" placeholder="The password is..." required />
    <input class="pwI fs" type="submit" name="Submit" value="' . esc_attr__( "Show me the content!" ) . '" />
    </form></div>
    ';
    return $o;
}
add_filter( 'the_password_form', 'my_password_form' );

add_filter('protected_title_format', 'blank');
function blank($title) {
       return '%s';
}*/

?>