<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Abonnement
 * 
 * @property int $id
 * @property int|null $id_client
 * @property int $issub
 *
 * @package App\Models
 */
class Abonnement extends Model
{
	protected $table = 'abonnement';
	public $timestamps = false;

	protected $casts = [
		'id_client' => 'int',
		'issub' => 'int'
	];

	protected $fillable = [
		'id_client',
		'issub'
	];
}
