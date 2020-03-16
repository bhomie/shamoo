<?php
/*
    Plugin Name: AddFunc Head & Footer Code
    Plugin URI:
    Description: Allows admins to add code to the &lt;head&gt; and/or &lt;footer&gt; of an individual post and/or site-wide. Ideal for scripts such as Google Analytics conversion tracking codes and any other general or page-specific JavaScript.
    Version: 1.5
    Author: AddFunc
    Author URI: http://profiles.wordpress.org/addfunc
    License: Public Domain
    @since 3.0.1
           ______
       _  |  ___/   _ _ __   ____
     _| |_| |__| | | | '_ \ / __/™
    |_ Add|  _/| |_| | | | | (__
      |_| |_|   \__,_|_| |_|\___\
                    by Joe Rhoney
*/



/*
    S E T T I N G S   P A G E
    =========================
    For site-wide head and footer code
*/

if(!class_exists('aFhfc_class')) :
define('AFHDFTRCD_ID', 'aFhfc');
define('AFHDFTRCD_NICK', 'Head & Footer Code');
  class aFhfc_class
  {
    public static function file_path($file)
    {
      return plugin_dir_path(__FILE__).$file;
    }
    public static function register()
    {
      register_setting(AFHDFTRCD_ID.'_options', 'aFhfc_site_wide_head_code');
      register_setting(AFHDFTRCD_ID.'_options', 'aFhfc_head_code_priority');
      register_setting(AFHDFTRCD_ID.'_options', 'aFhfc_site_wide_footer_code');
      register_setting(AFHDFTRCD_ID.'_options', 'aFhfc_footer_code_priority');
    }
    public static function menu()
    {
      add_options_page(AFHDFTRCD_NICK.' Plugin Options', AFHDFTRCD_NICK, 'manage_options', AFHDFTRCD_ID.'_options', array('aFhfc_class', 'options_page'));
    }
    public static function options_page()
    {
      if (!current_user_can('manage_options'))
      {
        wp_die(__('You do not have sufficient permissions to access this page.'));
      }
      $plugin_id = AFHDFTRCD_ID;
      include(self::file_path('options.php'));
    }
    public static function output_head_code()
    {
      $site_head_code = get_option('aFhfc_site_wide_head_code');
      $meta_head_code = get_post_meta(get_the_ID(),'aFhfc_head_code',true);
      $head_replace = get_post_meta(get_the_ID(),'aFhfc_head_replace',true);
      if(!empty($head_replace)){
        echo $meta_head_code."\n";
      }else{
        echo $site_head_code."\n".$meta_head_code."\n";
      }
    }
    public static function output_footer_code()
    {
      $site_footer_code = get_option('aFhfc_site_wide_footer_code');
      $meta_footer_code = get_post_meta( get_the_ID(),'aFhfc_footer_code',true);
      $footer_replace = get_post_meta(get_the_ID(),'aFhfc_footer_replace',true);
      if(!empty($footer_replace)){
        echo $meta_footer_code."\n";
      }else{
        echo $site_footer_code."\n".$meta_footer_code."\n";
      }
    }
  }
  if (is_admin())
  {
    add_action('admin_init', array('aFhfc_class','register'));
    add_action('admin_menu', array('aFhfc_class','menu'));
  }
  $head_code_prior = get_option('aFhfc_head_code_priority');
  if(!empty($head_code_prior)){
    add_action('wp_head', array('aFhfc_class','output_head_code'),$head_code_prior);
  }
  else {
    add_action('wp_head', array('aFhfc_class','output_head_code'));
  }
  $footer_code_prior = get_option('aFhfc_footer_code_priority');
  if(!empty($footer_code_prior)){
    add_action('wp_footer', array('aFhfc_class','output_footer_code'),$footer_code_prior);
  }
  else {
    add_action('wp_footer', array('aFhfc_class','output_footer_code'));
  }
endif;



/*
    M E T A B O X   F O R   P O S T S
    =================================
    Metabox w/head & footer fields for all post types (including custom)
*/

add_action('add_meta_boxes','aFhfc_add');
function aFhfc_add()
{
  if(current_user_can('manage_options')){
    add_meta_box('aFhfcMetaBox','Head & Footer Code','aFhfc_mtbx','','normal','low');
  }
}
function aFhfc_mtbx($post)
{
  $values = get_post_custom($post->ID);
  $head_text = isset($values['aFhfc_head_code']) ? esc_attr($values['aFhfc_head_code'][0]) : '';
  $head_replace = isset($values['aFhfc_head_replace']) ? esc_attr($values['aFhfc_head_replace'][0]) : '';
  $footer_text = isset($values['aFhfc_footer_code']) ? esc_attr($values['aFhfc_footer_code'][0]) : '';
  $footer_replace = isset($values['aFhfc_footer_replace']) ? esc_attr($values['aFhfc_footer_replace'][0]) : '';
  wp_nonce_field('aFhfc_nonce', 'aFhfc_mb_nonce');
  ?>
  <p>
    <label for="aFhfc_head_code">Head:</label>
    <textarea class="large-text" name="aFhfc_head_code" id="aFhfc_head_code"><?php echo $head_text; ?></textarea>
    <input id="aFhfc_head_replace" type="checkbox" name="aFhfc_head_replace" value="1" <?php checked($head_replace,'1'); ?> />
    <label for="aFhfc_head_replace">Replace Site-wide Head Code</label>
  </p>
  <p>
    <label for="aFhfc_footer_code">Footer:</label>
    <textarea class="large-text" name="aFhfc_footer_code" id="aFhfc_footer_code"><?php echo $footer_text; ?></textarea>
    <input id="aFhfc_footer_replace" type="checkbox" name="aFhfc_footer_replace" value="1" <?php checked($footer_replace,'1'); ?> />
    <label for="aFhfc_footer_replace">Replace Site-wide Footer Code</label>
  </p>
  <?php
}
add_action('save_post','aFhfc_save');
function aFhfc_save($post_id)
{
  if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
  if( !isset( $_POST['aFhfc_mb_nonce'] ) || !wp_verify_nonce( $_POST['aFhfc_mb_nonce'], 'aFhfc_nonce' ) ) return;
  if( !current_user_can( 'manage_options' ) ) return;
  if( isset( $_POST['aFhfc_head_code'] ) )
    if( empty( $_POST['aFhfc_head_code'] ) )
      delete_post_meta( $post_id, 'aFhfc_head_code' );
    else
      update_post_meta( $post_id, 'aFhfc_head_code',$_POST['aFhfc_head_code'] );
  $aFHFCHRChk = (isset($_POST['aFhfc_head_replace']) && $_POST['aFhfc_head_replace'])? '1' : '';
  if(empty($_POST['aFhfc_head_replace']))
    delete_post_meta($post_id,'aFhfc_head_replace');
  else
    update_post_meta($post_id,'aFhfc_head_replace',$aFHFCHRChk);
  if( isset( $_POST['aFhfc_footer_code'] ) )
    if( empty( $_POST['aFhfc_footer_code'] ) )
      delete_post_meta( $post_id, 'aFhfc_footer_code' );
    else
      update_post_meta( $post_id, 'aFhfc_footer_code', $_POST['aFhfc_footer_code'] );
  $aFHFCFRChk = (isset($_POST['aFhfc_footer_replace']) && $_POST['aFhfc_footer_replace'])? '1' : '';
  if(empty($_POST['aFhfc_footer_replace']))
    delete_post_meta($post_id,'aFhfc_footer_replace');
  else
    update_post_meta($post_id,'aFhfc_footer_replace',$aFHFCFRChk);
}
