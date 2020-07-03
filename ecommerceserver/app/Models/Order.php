<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Order
 * 
 * @property int $id
 * @property int $id_vendeur
 * @property int $id_client
 * @property int $id_article
 * @property int $nombre_article
 * @property int $total
 * @property string $nom
 * @property string $prenom
 * @property int $code_postal
 * @property string $ville
 * @property int $id_pays
 * @property string $statut
 * @property Carbon $date
 * @property int $prix_total
 * @property string $adresse
 * @property int $emballage
 *
 * @package App\Models
 */
class Order extends Model
{
	protected $table = 'orders';
	public $timestamps = false;

	protected $casts = [
		'id_vendeur' => 'int',
		'id_client' => 'int',
		'id_article' => 'int',
		'nombre_article' => 'int',
		'total' => 'int',
		'code_postal' => 'int',
		'id_pays' => 'int',
		'prix_total' => 'int',
		'emballage' => 'int'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'id_vendeur',
		'id_client',
		'id_article',
		'nombre_article',
		'total',
		'nom',
		'prenom',
		'code_postal',
		'ville',
		'id_pays',
		'statut',
		'date',
		'prix_total',
		'adresse',
		'emballage'
	];
}
