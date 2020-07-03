<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Fraislivraison
 * 
 * @property int $id
 * @property string $pays
 * @property int|null $prix
 *
 * @package App\Models
 */
class Fraislivraison extends Model
{
	protected $table = 'fraislivraison';
	public $timestamps = false;

	protected $casts = [
		'prix' => 'int'
	];

	protected $fillable = [
		'pays',
		'prix'
	];
}
