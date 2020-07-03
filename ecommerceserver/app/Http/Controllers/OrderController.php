<?php

namespace App\Http\Controllers;

use App\Exports\ArrayExport;
use App\Models\Abonnement;
use App\Models\Adresselivraison;
use App\Models\Article;
use App\Models\Cartebancaire;
use App\Models\Fraislivraison;
use App\Models\Order;
use App\Models\Photoarticle;
use App\Models\Sale;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use ZipArchive;

class OrderController extends Controller
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
    public function store(Request $request): JsonResponse
    {
        if (!isset(Adresselivraison::where("id_acheteur", $request->userId)->get()[0]))
            $adresse = new Adresselivraison();
        else $adresse = Adresselivraison::where("id_acheteur", $request->userId)->get()[0];
        $adresse->prenom = $request->prenom;
        $adresse->nom = $request->nom;
        $adresse->adresse = $request->adresse;
        $adresse->ville = $request->ville;
        $adresse->id_pays = $request->idPays;
        $adresse->id_acheteur = $request->userId;
        $adresse->code_postal = $request->codePostal;
        $adresse->save();
        if (!isset(Cartebancaire::where("id_acheteur", $request->userId)->get()[0]))
            $carte = new Cartebancaire();
        else $carte = Cartebancaire::where("id_acheteur", $request->userId)->get()[0];
        $carte->id_acheteur = $request->userId;
        $carte->ccv = $request->ccv;
        $carte->date = $request->date;
        $carte->numero = $request->carteNumero;
        $carte->save();
        foreach ($request->articles as $key => $value) {
            $commande = new Order();
            if($request->emballage)
                $commande->emballage = 1;
            $commande->id_vendeur = $value["id_vendeur"];
            $commande->id_client = $request->userId;
            $commande->id_article = $value["id"];
            $commande->nombre_article = $value["total"];
            $commande->total = $value["total"] * $value["price"];
            if ($value["id"] !== 0 && Sale::where("id_article", $value["id"])->get()[0]["pourcentage"] !== 0) {
                if (Abonnement::where("id_client", $request->userId)->get()[0] === 0)
                    $commande->prix_total = (($value["total"] * ($value["price"] - ($value["price"] * (Sale::where("id_article", $value["id"])->get()[0]["pourcentage"] / 100)))) + ($value["total"] * Fraislivraison::where("id", $request->idPays)->get()[0]["prix"]));
                else $commande->prix_total = (($value["total"] * ($value["price"] - ($value["price"] * (Sale::where("id_article", $value["id"])->get()[0]["pourcentage"] / 100)))) + (($value["total"] * Fraislivraison::where("id", $request->idPays)->get()[0]["prix"])) / 2);
            } else {
                if (Abonnement::where("id_client", $request->userId)->get()[0] === 0)
                    $commande->prix_total = (($value["total"] * $value["price"]) + ($value["total"] * Fraislivraison::where("id", $request->idPays)->get()[0]["prix"]));
                else $commande->prix_total = (($value["total"] * $value["price"]) + (($value["total"] * Fraislivraison::where("id", $request->idPays)->get()[0]["prix"])) / 2);
            }
            $commande->adresse = $request->adresse;
            $commande->code_postal = $request->codePostal;
            $commande->id_pays = $request->idPays;
            $commande->ville = $request->ville;
            $commande->nom = $request->nom;
            $commande->prenom = $request->prenom;
            $commande->save();
            if ($value["id"] !== 0) {
                $article = Article::where("id", $value["id"])->get()[0];
                $article->stock -= $value["total"];
                $article->save();
            }
        }
        return response()->json(true);
    }

    public function mesCommandes(Request $request): JsonResponse
    {
        $return = [];
        $commandes = Order::where("id_client", $request->id)->get();
        foreach ($commandes as $key => $value)
            if (isset(Article::where("id", $commandes[$key]["id_article"])->get()[0])) {
                $commandes[$key]["boutique"] = User::where("id", $value["id_vendeur"])->get()[0]->username;
                array_push($return, $commandes[$key]);
            }
        return response()->json(array_reverse($return));
    }

    public function suiviCommandes(Request $request): JsonResponse
    {
        $return = [];
        $commandes = Order::where("id_vendeur", $request->id)->get();
        foreach ($commandes as $key => $value)
            if (isset(Article::where("id", $commandes[$key]["id_article"])->get()[0])) {
                $commandes[$key]["email"] = User::where("id", $value["id_client"])->get()[0]->email;
                array_push($return, $commandes[$key]);
            }
        return response()->json(array_reverse($return));
    }

    public function commandeDetail(Request $request): JsonResponse
    {
        $commande = Order::where("id", $request->id)->get();
        $article = Article::where("id", $commande[0]["id_article"])->get()[0];
        $article["photo"] = Photoarticle::where("id_article", $article["id"])->get()[0]["path"];
        $commande[0]["detailArticle"] = $article;
        return response()->json($commande);
    }

    public function searchOrder(Request $request): JsonResponse
    {
        $order = DB::table("orders")
            ->select("orders.*", "c.id as client_name", "v.id as sell_name")
            ->join("users as v", "v.id", "=", "orders.id_vendeur")
            ->join("users as c", "c.id", "orders.id_client")
            ->where("orders.id", "like", "%" . $request->searchTerm . "%")
            ->first();

        return response()->json($order);
    }

    public function getPays(Request $request): JsonResponse
    {
        $pays = Fraislivraison::where("id", ">", 0)->get();
        return response()->json($pays);
    }

    public function toExcel(Request $request)
    {
        $excelInfo = [];
        $commandes = Order::where("id_vendeur", request("id"))->get();
        foreach ($commandes as $key => $value)
            if (isset(Article::where("id", $commandes[$key]["id_article"])->get()[0])) {
                $commandes[$key]["email"] = User::where("id", $value["id_client"])->get()[0]->email;
                $commandes[$key]["nomArticle"] = Article::where("id", $value["id_article"])->get()[0]->name;
                $commandes[$key]["stock"] = Article::where("id", $value["id_article"])->get()[0]->stock;
                array_push($excelInfo, $commandes[$key]);
            }
        array_unshift($excelInfo, ["ID Commande", "ID Vendeur", "ID Client", "ID Article", "Nombre Article",
            "Prix Total Article", "Nom", "Prenom", "Code Postal", "Ville", "ID Pays",
            "Statut", "Date", "Prix Total", "Adresse", "Emballage (1=oui)", "Email Client", "Nom Article",
            "Stock Restant"]);
        $export = new ArrayExport($excelInfo);
        ob_end_clean();
        ob_start();
        return Excel::download($export, "Recapitulatif.xlsx");
    }

    public function downloadStl(Request $request): JsonResponse
    {
        $file_name = "test.zip";
        $path = microtime() . "/";
        Storage::put("stl/$file_name", file_get_contents($request->url));
        $zip = new ZipArchive;
        $zip->open(storage_path("app/stl/$file_name"));
        $zip->extractTo(storage_path("app/stl/" . $path));
        $scan = scandir(storage_path("app/stl/" . $path));
        if (!is_dir(storage_path("app/stl/" . $path . "files/")))
            mkdir(storage_path("app/stl/" . $path . "files/"));
        foreach ($scan as $file) {
            if ($file !== "." || $file !== "..")
                if (explode(".", $file)[count(explode(".", $file)) - 1] === "stl" || explode(".", $file)[count(explode(".", $file)) - 1] === "STL")
                    rename(storage_path("app/stl/" . $path . $file), storage_path("app/stl/" . $path . "files/$file"));
        }
        Storage::delete("stl/$file_name");
        return response()->json([
            "files" => scandir(storage_path("app/stl/" . $path . "/files")),
            "path" => $path]);
    }

    function modifyStatut(Request $request): JsonResponse
    {
        $commande = Order::where("id", $request->id)->get()[0];
        $commande->statut = $request->statut;
        return response()->json($commande->save());
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
