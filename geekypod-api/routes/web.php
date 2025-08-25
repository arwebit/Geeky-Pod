<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
 */

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

$router->group(['prefix' => 'api'], function () use ($router) {

    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->post('/', 'UserController@getUsers');
        $router->post('/login', 'UserController@login');
        $router->put('/', 'UserController@updateUser');
        $router->put('/change_password', 'UserController@changePassword');
    });

    $router->group(['prefix' => 'dashboard'], function () use ($router) {
        $router->get('/records', 'DashboardController@getRecords');
    });

    $router->group(['prefix' => 'sliders'], function () use ($router) {
        $router->post('/', 'SliderController@getSlider');
        $router->post('/add', 'SliderController@createSlider');
        $router->post('/update', 'SliderController@updateSlider');
        $router->delete('/', 'SliderController@deleteSlider');
    });

    $router->group(['prefix' => 'genres'], function () use ($router) {
        $router->post('/', 'GenreController@getGenre');
        $router->post('/add', 'GenreController@createGenre');
        $router->post('/update', 'GenreController@updateGenre');
        $router->delete('/', 'GenreController@deleteGenre');
    });

    $router->group(['prefix' => 'podcasters'], function () use ($router) {
        $router->post('/', 'PodcasterController@getPodcaster');
        $router->post('/add', 'PodcasterController@createPodcaster');
        $router->post('/update', 'PodcasterController@updatePodcaster');
        $router->delete('/', 'PodcasterController@deletePodcaster');
    });

    $router->group(['prefix' => 'episodes'], function () use ($router) {
        $router->post('/', 'EpisodeController@getEpisode');
        $router->post('/add', 'EpisodeController@createEpisode');
        $router->post('/update', 'EpisodeController@updateEpisode');
        $router->delete('/', 'EpisodeController@deleteEpisode');
    });

    $router->group(['prefix' => 'subscribers'], function () use ($router) {
        $router->post('/', 'SubscriberController@getSubscriber');
        $router->post('/add', 'SubscriberController@createSubscriber');
        $router->delete('/', 'SubscriberController@deleteSubscriber');
    });

    $router->group(['prefix' => 'search'], function () use ($router) {
        $router->group(['prefix' => 'slug'], function () use ($router) {
            $router->post('/episode', 'SearchController@getEpisodeBySlug');
            $router->post('/genre', 'SearchController@getGenreBySlug');
            $router->post('/podcaster', 'SearchController@getPodcasterBySlug');
        });
    });

    $router->group(['prefix' => 'contact'], function () use ($router) {
        $router->get('/', 'ContactController@getContact');
        $router->post('/', 'ContactController@saveContact');
    });

    $router->group(['prefix' => 'about'], function () use ($router) {
        $router->get('/', 'AboutController@getAbout');
        $router->post('/', 'AboutController@saveAbout');
    });
});
