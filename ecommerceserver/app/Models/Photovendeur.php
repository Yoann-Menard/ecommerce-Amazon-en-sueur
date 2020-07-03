<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Photovendeur
 * 
 * @property int $id
 * @property int $id_vendeur
 * @property string|null $path
 *
 * @package App\Models
 */
class Photovendeur extends Model
{
	protected $table = 'photovendeur';
	public $timestamps = false;

	protected $casts = [
		'id_vendeur' => 'int'
	];

	protected $fillable = [
		'id_vendeur',
		'path'
	];
}
