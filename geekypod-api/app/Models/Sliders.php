<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sliders extends Model
{
    protected $table = 'slider_lists';
    protected $primaryKey = 'slider_id';
    public $timestamps = false;
}
