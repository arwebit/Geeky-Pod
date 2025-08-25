<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Podcasters extends Model
{
    protected $table = 'podcaster_lists';
    protected $primaryKey = 'podcaster_id';
    public $timestamps = false;

    public function episodes(): HasMany
    {
        return $this->hasMany(Episodes::class, "podcaster_id", "podcaster_id");
    }
}
