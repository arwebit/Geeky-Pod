<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getRecords()
    {

        $count['episode_count'] = DB::table("episode_lists")->count();
        $count['genre_count'] = DB::table("genre_lists")->count();
        $count['podcaster_count'] = DB::table("podcaster_lists")->count();
        $count['subscriber_count'] = DB::table("subscriber_lists")->count();

        $response = [
            "statusCode" => 200,
            "message" => "Records found",
            "rows" => $count
        ];
        return response()->json($response, 200);
    }
}
