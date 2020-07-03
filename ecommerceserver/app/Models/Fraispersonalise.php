<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Fraispersonalise
 * 
 * @property int $id
 * @property int|null $id_order
 * @property int|null $id_pays
 * @property int|null $prix
 *
 * @package App\Models
 */
class Fraispersonalise extends Model
{
	protected $table = 'fraispersonalise';
	public $timestamps = false;

	protected $casts = [
		'id_order' => 'int',
		'id_pays' => 'int',
		'prix' => 'int'
	];

	protected $fillable = [
		'id_order',
		'id_pays',
		'prix'
	];
}
