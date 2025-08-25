<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Genres extends Model
{
    use HasFactory;

    protected $table = 'genre_lists';
    protected $primaryKey = 'genre_id';
    public $timestamps = false;

    public function episodes(): HasMany
    {
        return $this->hasMany(Episodes::class, "genre_id", "genre_id");
    }
}
