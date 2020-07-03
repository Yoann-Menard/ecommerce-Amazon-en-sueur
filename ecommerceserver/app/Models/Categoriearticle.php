<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Categoriearticle
 * 
 * @property int $id
 * @property int $id_produit
 * @property int|null $id_categorie
 *
 * @package App\Models
 */
class Categoriearticle extends Model
{
	protected $table = 'categoriearticle';
	public $timestamps = false;

	protected $casts = [
		'id_produit' => 'int',
		'id_categorie' => 'int'
	];

	protected $fillable = [
		'id_produit',
		'id_categorie'
	];
}
