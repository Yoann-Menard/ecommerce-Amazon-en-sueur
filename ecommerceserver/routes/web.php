<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::post("/register", function (Request $request){
//    return response()->json(['Hello Laravel 7']);
//});

Route::post("/register", "UserController@store");
Route::post("/login", "UserController@login");
Route::post("/getRole", "UserController@getRole");
Route::post("/boutiques", "UserController@getBoutiques");
Route::post("/modifyProfilePicture", "UserController@modifyPhoto");
Route::post("/modifyPassword", "UserController@modifyPassword");
Route::post("/modifyMail", "UserController@modifyMail");
Route::post("/getAdresse", "UserController@getAdresse");
Route::post("/getAbo", "UserController@getAbo");
Route::post("/setAbo", "UserController@setAbo");

Route::post("/maBoutique", "ArticleController@myArticles");
Route::post("/postArticle", "ArticleController@store");
Route::post("/modifyArticle", "ArticleController@modify");
Route::post("/article", "ArticleController@getArticle");
Route::post("/view", "ArticleController@view");
Route::post("/deleteArticle", "ArticleController@delete");
Route::post("/mostViewed", "ArticleController@mostViewed");
Route::post("/news", "ArticleController@newest");
Route::post("/inSale", "ArticleController@inSale");
Route::post("/search", "ArticleController@search");
Route::post("/modifySale", "ArticleController@modifySale");

Route::post("/postCategorie", "CategoriesController@store");
Route::post("/searchCategorie", "CategoriesController@search");
Route::post("/addCategorie", "CategoriesController@add");
Route::post("/articleCategorie", "CategoriesController@articleCategorie");
Route::post("/deleteCategorie", "CategoriesController@deleteArticleCategorie");

Route::post("/commande", "OrderController@store");
Route::post("/getPays", "OrderController@getPays");
Route::post("/mesCommandes", "OrderController@mesCommandes");
Route::post("/commandeDetail", "OrderController@commandeDetail");
Route::post("/suiviCommandes", "OrderController@suiviCommandes");
Route::post("/suiviCommandeDetail", "OrderController@commandeDetail");
Route::post("/searchOrder", "OrderController@searchOrder");
Route::get("/toExcel", "OrderController@toExcel");

Route::post("/modifyStatut", "OrderController@modifyStatut");
Route::post("/downloadStl", "OrderController@downloadStl");



Route::get("/images/{name}", function (string $name){
    return response()->file(base_path() ."/storage/app/images/$name");
});

Route::get("/stl/{dir}/{name}", function (string $dir, string $name){
    return response()->file(base_path() ."/storage/app/stl/$dir/files/$name");
});
