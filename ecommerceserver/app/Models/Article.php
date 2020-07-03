<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Article
 * 
 * @property int $id
 * @property string $name
 * @property int $price
 * @property int $id_vendeur
 * @property string $description
 * @property int $views
 * @property int $stock
 * @property Carbon $date
 *
 * @package App\Models
 */
class Article extends Model
{
	protected $table = 'articles';
	public $timestamps = false;

	protected $casts = [
		'price' => 'int',
		'id_vendeur' => 'int',
		'views' => 'int',
		'stock' => 'int'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'name',
		'price',
		'id_vendeur',
		'description',
		'views',
		'stock',
		'date'
	];
}
