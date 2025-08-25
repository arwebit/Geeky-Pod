<?php

namespace App\Http\Controllers;

use App\Models\Episodes;
use App\Models\Genres;
use App\Models\Podcasters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function getEpisodeBySlug(Request $req)
    {
        $slug = $req->slug;
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "episode_date" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';


        $query = Episodes::with("genre", "podcasters")
            ->where("episode_title_slug", "=",  $slug);


        if (sizeof($condition) > 0) {
            foreach ($condition as $cond) {
                $query->where(...$cond);
            }
        }
        $totalRows = $query->count();

        $db = $query->offset($start)->limit($records)->orderBy($sortField, $sort)->get();

        $noOfRequiredPages = ceil($totalRows / $records);

        if ($totalRows > 0) {
            $response = [
                "statusCode" => 200,
                "message" => "Records found",
                "total_rows" => $totalRows,
                "page_rows" => count($db),
                "no_of_required_pages" => $noOfRequiredPages,
                "rows" => $db
            ];
        } else {
            $response = [
                "statusCode" => 200,
                "message" => "No records found"
            ];
        }
        return response()->json($response, 200);
    }

    public function getGenreBySlug(Request $req)
    {
        $slug = $req->slug;
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "episode_lists.episode_date" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';


        $query = DB::table("genre_lists")
            ->join("episode_lists", "episode_lists.genre_id", "=", "genre_lists.genre_id")
            ->join("podcaster_lists", "podcaster_lists.podcaster_id", "=", "episode_lists.podcaster_id")
            ->select()
            ->where("genre_lists.genre_slug", "=",  $slug);


        if (sizeof($condition) > 0) {
            foreach ($condition as $cond) {
                $query->where(...$cond);
            }
        }
        $totalRows = $query->count();

        $db = $query->offset($start)->limit($records)->orderBy($sortField, $sort)->get();

        $noOfRequiredPages = ceil($totalRows / $records);

        if ($totalRows > 0) {
            $response = [
                "statusCode" => 200,
                "message" => "Records found",
                "total_rows" => $totalRows,
                "page_rows" => count($db),
                "no_of_required_pages" => $noOfRequiredPages,
                "rows" => $db
            ];
        } else {
            $response = [
                "statusCode" => 200,
                "message" => "No records found"
            ];
        }
        return response()->json($response, 200);
    }


    public function getPodcasterBySlug(Request $req)
    {
        $slug = $req->slug;
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "podcaster_id" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';


        $query = Podcasters::with("episodes.genre")
            ->where("podcaster_slug", "=",  $slug);


        if (sizeof($condition) > 0) {
            foreach ($condition as $cond) {
                $query->where(...$cond);
            }
        }
        $totalRows = $query->count();

        $db = $query->offset($start)->limit($records)->orderBy($sortField, $sort)->get();

        $noOfRequiredPages = ceil($totalRows / $records);

        if ($totalRows > 0) {
            $response = [
                "statusCode" => 200,
                "message" => "Records found",
                "total_rows" => $totalRows,
                "page_rows" => count($db),
                "no_of_required_pages" => $noOfRequiredPages,
                "rows" => $db
            ];
        } else {
            $response = [
                "statusCode" => 200,
                "message" => "No records found"
            ];
        }
        return response()->json($response, 200);
    }
}
