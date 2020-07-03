<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Photoarticle
 * 
 * @property int $id
 * @property int $id_article
 * @property string $path
 *
 * @package App\Models
 */
class Photoarticle extends Model
{
	protected $table = 'photoarticles';
	public $timestamps = false;

	protected $casts = [
		'id_article' => 'int'
	];

	protected $fillable = [
		'id_article',
		'path'
	];
}
