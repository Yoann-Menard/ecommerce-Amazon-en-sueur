<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Cartebancaire
 * 
 * @property int $id
 * @property int $id_acheteur
 * @property int $numero
 * @property int $ccv
 * @property string $date
 *
 * @package App\Models
 */
class Cartebancaire extends Model
{
	protected $table = 'cartebancaire';
	public $timestamps = false;

	protected $casts = [
		'id_acheteur' => 'int',
		'numero' => 'int',
		'ccv' => 'int'
	];

	protected $fillable = [
		'id_acheteur',
		'numero',
		'ccv',
		'date'
	];
}
