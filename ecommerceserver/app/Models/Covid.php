<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Covid
 * 
 * @property int $id
 * @property int|null $id_vendeur
 * @property int|null $true
 *
 * @package App\Models
 */
class Covid extends Model
{
	protected $table = 'covid';
	public $timestamps = false;

	protected $casts = [
		'id_vendeur' => 'int',
		'true' => 'int'
	];

	protected $fillable = [
		'id_vendeur',
		'true'
	];
}
