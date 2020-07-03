<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Categorie
 * 
 * @property int $id
 * @property string $name
 * @property string $description
 *
 * @package App\Models
 */
class Categorie extends Model
{
	protected $table = 'categorie';
	public $timestamps = false;

	protected $fillable = [
		'name',
		'description'
	];
}
