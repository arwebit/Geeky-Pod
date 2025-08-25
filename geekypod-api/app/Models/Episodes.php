<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Episodes extends Model
{
    protected $table = 'episode_lists';
    protected $primaryKey = 'episode_id';
    public $timestamps = false;

    public function genre(): HasOne
    {
        return $this->hasOne(Genres::class, "genre_id", "genre_id");
    }
    public function podcasters(): HasOne
    {
        return $this->hasOne(Podcasters::class, "podcaster_id", "podcaster_id");
    }
}
