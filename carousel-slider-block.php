<?php
/*
Plugin Name: Carousel Slider Block
*/

function enqueue_bootstrap()
{
    wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', array('jquery'), '', true);
}
add_action('enqueue_block_editor_assets', 'enqueue_bootstrap');

function register_carousel_slider_block()
{
    register_block_type(
        'custom/carousel-slider',
        array(
            'editor_script' => 'carousel-slider-block',
        )
    );
}
add_action('init', 'register_carousel_slider_block');

function carousel_slider_block_script()
{
    wp_register_script(
        'carousel-slider-block',
        plugins_url('carousel-slider.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        true
    );
}
add_action('init', 'carousel_slider_block_script');
