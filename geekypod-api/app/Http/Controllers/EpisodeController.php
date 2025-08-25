<?php

namespace App\Http\Controllers;

use App\Models\Episodes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class EpisodeController extends Controller
{
    public function getEpisode(Request $req)
    {
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "episode_title" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';

        $query = Episodes::with("genre", "podcasters");

        if (sizeof($condition) > 0) {
            foreach ($condition as $cond) {
                $query->where(...$cond);
            }
        }
        $totalRows = sizeof($query->get());

        $db = $query->offset($start)->limit($records)->orderBy($sortField, $sort)->get();

        $noOfRequiredPages = ceil($totalRows / $records);

        if ($totalRows > 0) {
            $response = [
                "statusCode" => 200,
                "message" => "Records found",
                "total_rows" => $totalRows,
                "page_rows" => count($db),
                "no_of_required_pages" => $noOfRequiredPages,
                "rows" => $db,
            ];
        } else {
            $response = [
                "statusCode" => 200,
                "message" => "No records found",
            ];
        }
        return response()->json($response, 200);
    }

    public function createEpisode(Request $req)
    {
        $rules = [
            'episode_season' => 'required|max:50',
            'episode_no' => 'required|max:50',
            'episode_title' => 'required|max:255|unique:episode_lists,episode_title',
            'episode_title_slug' => 'required|max:255|unique:episode_lists,episode_title_slug',
            'episode_description' => 'required|max:255',
            'episode_image' => 'required|mimes:jpeg,jpg,png|max:2048',
            'podcaster_id' => 'required',
            'genre_id' => 'required',
            'episode_spotify_link' => 'url',
            'episode_youtube_link' => 'required|url',
            'episode_date' => 'required',
        ];
        $messages = [
            'episode_season.required' => 'Required',
            'episode_season.max' => 'Max: 50 characters',
            'episode_no.required' => 'Required',
            'episode_no.max' => 'Max: 50 characters',
            'episode_title.required' => 'Required',
            'episode_title.max' => 'Max: 255 characters',
            'episode_title.unique' => 'Episode title exists',
            'episode_title_slug.required' => 'Required',
            'episode_title_slug.max' => 'Max: 255 characters',
            'episode_title_slug.unique' => 'Episode slug exists',
            'episode_description.required' => 'Required',
            'episode_description.max' => 'Max: 255 characters',
            'episode_image.required' => 'Required',
            'episode_image.mimes' => 'Upload JPG, JPEG files',
            'episode_image.max' => 'Maximum image size : 2 MB',
            'podcaster_id.required' => 'Required',
            'genre_id.required' => 'Required',
            'episode_spotify_link.url' => 'Invalid url',
            'episode_youtube_link.required' => 'Required',
            'episode_youtube_link.url' => 'Invalid url',
            'episode_date.required' => 'Required',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $episodeImagePath = "";

            if ($req->hasFile('episode_image')) {
                $getfileExtension = $req->file('episode_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->episode_image->move(base_path('./public/images/episodes'), $createnewFileName);
                $episodeImagePath = "episodes/" . $createnewFileName;
            }

            $insertData = [
                'episode_season' => $req->input("episode_season"),
                'episode_no' => $req->input("episode_no"),
                'episode_title' => $req->input("episode_title"),
                'episode_title_slug' => $req->input("episode_title_slug"),
                'episode_description' => $req->input("episode_description"),
                'episode_image' => $episodeImagePath,
                'podcaster_id' => $req->input("podcaster_id"),
                'genre_id' => $req->input("genre_id"),
                'episode_spotify_link' => $req->input("episode_spotify_link"),
                'episode_youtube_link' => $req->input("episode_youtube_link"),
                'episode_date' => date("Y-m-d", strtotime($req->input("episode_date"))),
                'is_popular' => $req->input("is_popular"),
                'is_active' => 'yes',
            ];

            $episodeCreate = DB::table('episode_lists')->insert([ ...$insertData]);

            if ($episodeCreate) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully created episode'], 201);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }

    public function updateEpisode(Request $req)
    {
        $episodeID = $req->episode_id;

        $rules = [
            'episode_season' => 'required|max:50',
            'episode_no' => 'required|max:50',
            'episode_title' => 'required|max:255|unique:episode_lists,episode_title, ' . $episodeID . ',episode_id',
            'episode_title_slug' => 'required|max:255|unique:episode_lists,episode_title_slug, ' . $episodeID . ',episode_id',
            'episode_description' => 'required|max:255',
            'episode_image' => 'mimes:jpeg,jpg,png|max:2048',
            'podcaster_id' => 'required',
            'genre_id' => 'required',
            'episode_spotify_link' => 'url',
            'episode_youtube_link' => 'required|url',
            'episode_date' => 'required',
        ];
        $messages = [
            'episode_season.required' => 'Required',
            'episode_season.max' => 'Max: 50 characters',
            'episode_no.required' => 'Required',
            'episode_no.max' => 'Max: 50 characters',
            'episode_title.required' => 'Required',
            'episode_title.max' => 'Max: 255 characters',
            'episode_title.unique' => 'Episode title exists',
            'episode_title_slug.required' => 'Required',
            'episode_title_slug.max' => 'Max: 255 characters',
            'episode_title_slug.unique' => 'Episode slug exists',
            'episode_description.required' => 'Required',
            'episode_description.max' => 'Max: 255 characters',
            'episode_image.mimes' => 'Upload JPG, JPEG files',
            'episode_image.max' => 'Maximum image size : 2 MB',
            'podcaster_id.required' => 'Required',
            'genre_id.required' => 'Required',
            'episode_spotify_link.url' => 'Invalid url',
            'episode_youtube_link.required' => 'Required',
            'episode_youtube_link.url' => 'Invalid url',
            'episode_date.required' => 'Required',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $episodeImagePath = "";

            $episodesTable = DB::table('episode_lists')->where('episode_id', '=', $episodeID)->first();
            $episodeImagePath = $episodesTable->episode_image;
            $actualImagePath = base_path('./public/images/' . $episodeImagePath);

            if ($req->hasFile('episode_image')) {
                $getfileExtension = $req->file('episode_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->episode_image->move(base_path('./public/images/episodes'), $createnewFileName);
                $episodeImagePath = "episodes/" . $createnewFileName;
                if (file_exists($actualImagePath)) {
                    unlink($actualImagePath);
                }
            }

            $updateData = [
                'episode_season' => $req->input("episode_season"),
                'episode_no' => $req->input("episode_no"),
                'episode_title' => $req->input("episode_title"),
                'episode_title_slug' => $req->input("episode_title_slug"),
                'episode_description' => $req->input("episode_description"),
                'episode_image' => $episodeImagePath,
                'podcaster_id' => $req->input("podcaster_id"),
                'genre_id' => $req->input("genre_id"),
                'episode_spotify_link' => $req->input("episode_spotify_link"),
                'episode_youtube_link' => $req->input("episode_youtube_link"),
                'episode_date' => date("Y-m-d", strtotime($req->input("episode_date"))),
                'is_popular' => $req->input("is_popular"),
                'is_active' => $req->input("is_active"),
            ];

            DB::table('episode_lists')->where('episode_id', '=', $episodeID)->update([ ...$updateData]);

            return response()->json(['statusCode' => 201, 'message' => 'Successfully updated episode'], 201);
        }
    }

    public function deleteEpisode(Request $req)
    {
        $episodeID = $req->episode_id;

        $episodesTable = DB::table('episode_lists')->where('episode_id', '=', $episodeID)->first();
        $episodeImagePath = $episodesTable->episode_image;
        $actualImagePath = base_path('./public/images/' . $episodeImagePath);

        $deleteEpisode = Episodes::find($episodeID)->delete();

        if ($deleteEpisode) {

            if (file_exists($actualImagePath)) {
                unlink($actualImagePath);
            }
            return response()->json(['statusCode' => 201, 'message' => 'Successfully deleted episode'], 201);
        } else {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }
}
