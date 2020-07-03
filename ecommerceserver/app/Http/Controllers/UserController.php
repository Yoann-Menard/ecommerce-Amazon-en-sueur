<?php

namespace App\Http\Controllers;

use App\Models\Abonnement;
use App\Models\Adresselivraison;
use App\Models\Article;
use App\Models\Cartebancaire;
use App\Models\Categorie;
use App\Models\Categoriearticle;
use App\Models\Covid;
use App\Models\Photoarticle;
use App\Models\Photovendeur;
use App\Models\Sale;
use App\Models\Urgence;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->password = hash("sha512", $request->password);
        $user->email = $request->email;
        $user->username = $request->username;
        if (!$request->role) $user->role = "vendeur";
        else $user->role = "client";
        if ($user->save()) {
            $id = $user->getAttributes()["id"];
            $urgences = new Urgence();
            $urgences->id_vendeur = $id;
            $urgences->true = 0;
            $urgences->save();
            $covid = new Covid();
            $covid->id_vendeur = $id;
            $covid->true = 0;
            $covid->save();
            $photo = new Photovendeur();
            $photo->id_vendeur = $id;
            $photo->path = "/images/tmp.jpg";
            $photo->save();
            $abonnement = new Abonnement();
            $abonnement->id_client = $id;
            $abonnement->save();
            return response()->json(true);
        } else return response()->json(false);
    }

    public function getAbo(Request $request): JsonResponse
    {
        if (Abonnement::where("id_client", $request->id)->get()[0]["issub"] === 0)
            return response()->json(false);
        else return response()->json(true);
    }

    public function setAbo(Request $request): JsonResponse
    {
        $abo = Abonnement::where("id_client", $request->id)->get()[0];
        if (!$request->abo)
            $abo->issub = 0;
        else $abo->issub = 1;
        return response()->json($abo->save());
    }

    public function login(Request $request)
    {
        $user = User::where("email", $request->email)->get();
        if (count($user) === 0)
            return response()->json(["valid" => false]);
        else if (hash("sha512", $request->password) === $user[0]->password)
            return response()->json(["valid" => true, "id" => $user[0]->id]);
        else return response()->json(["valid" => false]);
    }

    public function getRole(Request $request): JsonResponse
    {
        return response()->json([
            "role" => User::where("id", $request->id)->get()[0]->role
        ]);
    }

    public function modifyPhoto(Request $request): JsonResponse
    {
        $path = "/images/" . microtime(true) . ".jpg";
        $photoUser = Photovendeur::where("id_vendeur", $request->id)->get()[0];
        $photoUser->path = $path;
        $request->file("photo")->storeAs("./", $path);
        return response()->json($photoUser->save());
    }

    public function modifyPassword(Request $request): JsonResponse
    {
        $user = User::where("id", $request->id)->get()[0];
        $user->password = hash("sha512", $request->password);
        if ($user->save()) return response()->json(true);
        else return response()->json(false);
    }

    public function modifyMail(Request $request): JsonResponse
    {
        if (!isset(User::where("email", $request->email)->get()[0])) {
            $user = User::where("id", $request->id)->get()[0];
            $user->email = $request->email;
            if ($user->save()) return response()->json(true);
            else return response()->json(false);
        } else return response()->json(false);
    }

    public function getBoutiques(Request $request): JsonResponse
    {
        $ret = [];
        $boutiques = User::where("role", "vendeur")->get();
        foreach ($boutiques as $key => $value) {
            if (isset(Article::where("id_vendeur", $boutiques[$key]["id"])->get()[0])) {
                $boutiques[$key]["count"] = count(Article::where("id_vendeur", $boutiques[$key]["id"])->get());
                $boutiques[$key]["photo"] = Photovendeur::where("id_vendeur", $value->id)->get()[0]->path;
                $articles = Article::where("id_vendeur", $value->id)->get();
                foreach ($articles as $k => $v) {
                    $articles[$k]['categorie'] = Categoriearticle::where("id_produit", $v->getAttributes()["id"])->get();
                    foreach ($articles[$k]['categorie'] as $ke => $va)
                        $articles[$k]['categorie'][$ke]["name"] = Categorie::where("id", $va["id_categorie"])->get()[0]["name"];
                    $articles[$k]["photo"] = Photoarticle::where("id_article", $v->getAttributes()["id"])->get()[0]->getAttributes()["path"];
                    $articles[$k]["sale"] = Sale::where("id_article", $v->getAttributes()["id"])->get()[0]->getAttributes()["pourcentage"];
                }
                $boutiques[$key]["articles"] = $articles;
                if (Covid::where("id_vendeur", $value->id)->get()[0]->true === 1)
                    $boutiques[$key]["covid"] = true;
                else $boutiques[$key]["covid"] = false;
                if (Urgence::where("id_vendeur", $value->id)->get()[0]->true === 1)
                    $boutiques[$key]["urgences"] = true;
                else $boutiques[$key]["urgences"] = false;
                array_push($ret, $boutiques[$key]);
            }
        }
        return response()->json($ret);
    }

    public function getAdresse(Request $request): JsonResponse
    {
        $response = [];
        if (isset(Adresselivraison::where("id_acheteur", $request->id)->get()[0]))
            $response["adresse"] = Adresselivraison::where("id_acheteur", $request->id)->get()[0];
        else $response["adresse"] = false;
        if (isset(Cartebancaire::where("id_acheteur", $request->id)->get()[0])) {
            $carte = Cartebancaire::where("id_acheteur", $request->id)->get()[0];
            $response["carte"] = [];
            $response["carte"]["numeroMasque"] = "XXXX-XXXX-XXXX-" . substr((string)$carte["numero"], -4);
            $response["carte"]["ccv"] = $carte["ccv"];
            $response["carte"]["date"] = $carte["date"];
            $response["carte"]["numero"] = $carte["numero"];
        } else $response["carte"] = false;
        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
