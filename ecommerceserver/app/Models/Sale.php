<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Sale
 * 
 * @property int $id
 * @property int $id_article
 * @property int $pourcentage
 *
 * @package App\Models
 */
class Sale extends Model
{
	protected $table = 'sale';
	public $timestamps = false;

	protected $casts = [
		'id_article' => 'int',
		'pourcentage' => 'int'
	];

	protected $fillable = [
		'id_article',
		'pourcentage'
	];
}
