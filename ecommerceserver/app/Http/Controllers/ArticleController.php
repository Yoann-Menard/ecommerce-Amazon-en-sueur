<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use App\Models\Categoriearticle;
use App\Models\Photoarticle;
use App\Models\Sale;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request) : JsonResponse
    {
        $article = new Article();
        $article->description = $request->description;
        $article->name = $request->name;
        $article->stock = $request->stock;
        $article->price = $request->price;
        $article->id_vendeur = $request->id_vendeur;
        $article->views = 0;
        $article->save();
        $id = $article->id;
        $promo = new Sale();
        $promo->id_article = $id;
        $promo->pourcentage = 0;
        $promo->save();
        $path = "/images/".microtime(true).".jpg";
        $photoArticle = new Photoarticle();
        $photoArticle->id_article = $article->getAttributes()["id"];
        $photoArticle->path = $path;
        $request->file("photo")->storeAs("./", $path);
        $photoArticle->save();
        return response()->json(true);
    }

    public function modify(Request $request) : JsonResponse
    {
        $article = Article::where("id", $request->id)->get()[0];
        $article->description = $request->description;
        $article->name = $request->name;
        $article->stock = $request->stock;
        $article->price = $request->price;
        $article->id_vendeur = $request->id_vendeur;
        $article->save();
        $path = "/images/".microtime(true).".jpg";
        $photoArticle = Photoarticle::where("id_article", $request->id)->get()[0];
        $photoArticle->id_article = $article->getAttributes()["id"];
        $photoArticle->path = $path;
        $request->file("photo")->storeAs("./", $path);
        $photoArticle->save();
        return response()->json(true);
    }

    public function myArticles(Request $request): JsonResponse
    {
        $articles = Article::where("id_vendeur", $request->id)->get();
        foreach ($articles as $key => $value) {
            $articles[$key]["photo"] = Photoarticle::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["path"];
            $articles[$key]["sale"] = Sale::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["pourcentage"];
        }
        return response()->json($articles);
    }

    public function getArticle(Request $request): JsonResponse
    {
        $articles = Article::where("id", $request->id)->get();
        foreach ($articles as $key => $value) {
            $articles[$key]['categorie'] = Categoriearticle::where("id_produit", $value->getAttributes()["id"])->get();
            foreach ($articles[$key]['categorie'] as $k => $v)
                $articles[$key]['categorie'][$k]["name"] = Categorie::where("id", $v["id_categorie"])->get()[0]["name"];
            $articles[$key]["photo"] = Photoarticle::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["path"];
            $articles[$key]["sale"] = Sale::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["pourcentage"];
        }
        return response()->json($articles);
    }

    public function modifySale(Request $request): JsonResponse
    {
        $promo = Sale::where("id_article", $request->id)->get()[0];
        $promo->pourcentage = $request->pourcentage;
        $promo->save();
        return response()->json(true);
    }

    public function view(Request $request): JsonResponse
    {
        $article = Article::where("id", $request->id)->get()[0];
        $article->views = $article->views + 1;
        $article->save();
        return response()->json(true);
    }

    public function delete(Request $request): JsonResponse
    {
        $article = Article::where("id", $request->id)->get()[0];
        $article->delete();
        return response()->json(true);
    }

    public function mostViewed(Request $request): JsonResponse
    {
        $articles = Article::orderBy("views", "desc")->take(20)->get();
        foreach ($articles as $key => $value) {
            $articles[$key]["photo"] = Photoarticle::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["path"];
            $articles[$key]["sale"] = Sale::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["pourcentage"];
        }
        return response()->json($articles);
    }

    public function newest(Request $request): JsonResponse
    {
        $articles = Article::orderBy("date", "desc")->take(20)->get();
        foreach ($articles as $key => $value) {
            $articles[$key]["photo"] = Photoarticle::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["path"];
            $articles[$key]["sale"] = Sale::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["pourcentage"];
        }
        return response()->json($articles);
    }

    public function inSale(Request $request): JsonResponse
    {
        $return = [];
        $articles = Article::orderBy("date", "desc")->take(50)->get();
        foreach ($articles as $key => $value) {
            $articles[$key]["photo"] = Photoarticle::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["path"];
            $articles[$key]["sale"] = Sale::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["pourcentage"];
            if($articles[$key]["sale"] !== 0)
                array_push($return, $articles[$key]);
        }
        return response()->json($return);
    }

    public function search(Request $request): JsonResponse
    {
        $articles = Article::where("description", "like", "%".$request->search."%")->get();
        foreach ($articles as $key => $value)
            $articles[$key]["photo"] = Photoarticle::where("id_article", $value->getAttributes()["id"])->get()[0]->getAttributes()["path"];
        return response()->json($articles);
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        //
    }
}
