<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Categoriearticle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriesController extends Controller
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
        $categorie = new Categorie();
        $categorie->description = $request->description;
        $categorie->name = $request->name;
        $categorie->save();
        return response()->json(true);
    }

    public function search(Request $request): JsonResponse
    {
        $categories = Categorie::where("name", "like", "%".$request->search."%")->get();
        return response()->json($categories);
    }

    public function articleCategorie(Request $request): JsonResponse
    {
        $categories = Categoriearticle::where("id_produit", $request->id)->get();
        foreach ($categories as $key => $value)
            $categories[$key]["name"] = Categorie::where("id", $value["id_categorie"])->get()[0]["name"];
        return response()->json($categories);
    }

    public function add(Request $request): JsonResponse
    {
        if(!isset(Categoriearticle::where([["id_produit", "=", $request->id], ["id_categorie", "=", $request->idCategorie]])->get()[0])) {
            $categorie = new Categoriearticle();
            $categorie->id_categorie = $request->idCategorie;
            $categorie->id_produit = $request->id;
            $categorie->save();
            return response()->json(true);
        } else return  response()->json(false);
    }

    public function modify(Request $request) : JsonResponse
    {
        $categorie = Categorie::where("id", $request->id)->get()[0];
        $categorie->description = $request->description;
        $categorie->name = $request->name;
        $categorie->stock = $request->stock;
        $categorie->price = $request->price;
        $categorie->id_vendeur = $request->id_vendeur;
        $categorie->save();
        return response()->json(true);
    }

    public function myCategories(Request $request): JsonResponse
    {
        $categories = Article::where("id_vendeur", $request->id)->get();
        foreach ($categories as $key => $value) {
            $categories[$key][""] = Photoarticle::where("id_categorie", $value->getAttributes()["id"])->get()[0]->getAttributes()[""];
            $categories[$key][""] = Sale::where("id_categorie", $value->getAttributes()["id"])->get()[0]->getAttributes()[""];
        }
        return response()->json($categories);
    }

    public function getCategorie(Request $request): JsonResponse
    {
        $categories = Categorie::where("id", $request->id)->get();
        foreach ($categories as $key => $value) {
            $categories[$key][""] = Photoarticle::where("id_categorie", $value->getAttributes()["id"])->get()[0]->getAttributes()[""];
            $categories[$key][""] = Sale::where("id_categorie", $value->getAttributes()["id"])->get()[0]->getAttributes()[""];
        }
        return response()->json($categories);
    }

    public function modifySale(Request $request): JsonResponse
    {
        return response()->json(true);
    }

    public function view(Request $request): JsonResponse
    {
        $categorie = Article::where("id", $request->id)->get()[0];
        $categorie->views = $categorie->views + 1;
        $categorie->save();
        return response()->json(true);
    }

    public function deleteArticleCategorie(Request $request): JsonResponse
    {
        $categorie = Categoriearticle::where("id", $request->idCategorie)->get()[0];
        $categorie->delete();
        return response()->json(true);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Categorie $article)
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
    public function update(Request $request, Categorie $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categorie $article)
    {
        //
    }
}
