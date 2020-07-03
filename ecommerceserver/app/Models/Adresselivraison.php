<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Adresselivraison
 * 
 * @property int $id
 * @property int|null $id_acheteur
 * @property string $nom
 * @property string $prenom
 * @property int $code_postal
 * @property string $ville
 * @property string $adresse
 * @property int $id_pays
 *
 * @package App\Models
 */
class Adresselivraison extends Model
{
	protected $table = 'adresselivraison';
	public $timestamps = false;

	protected $casts = [
		'id_acheteur' => 'int',
		'code_postal' => 'int',
		'id_pays' => 'int'
	];

	protected $fillable = [
		'id_acheteur',
		'nom',
		'prenom',
		'code_postal',
		'ville',
		'adresse',
		'id_pays'
	];
}
