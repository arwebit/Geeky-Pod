<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscribers extends Model
{
    protected $table = 'subscriber_lists';
    protected $primaryKey = 'subscriber_id';
    public $timestamps = false;
}
