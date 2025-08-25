<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Episodes;
use App\Models\Genres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class GenreController extends Controller
{

    public function getGenre(Request $req)
    {
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "genre_name" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';

        $query = DB::table('genre_lists')
            ->select();

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

    public function createGenre(Request $req)
    {
        $rules = [
            'genre_name' => 'required|max:255|unique:genre_lists,genre_name',
            'genre_slug' => 'required|max:255|unique:genre_lists,genre_slug',
            'genre_image' => 'required|mimes:jpeg,jpg,png|max:2048',
        ];
        $messages = [
            'genre_name.required' => 'Required',
            'genre_name.max' => 'Max: 255 characters',
            'genre_name.unique' => 'Genre name exists',
            'genre_slug.required' => 'Required',
            'genre_slug.max' => 'Max: 255 characters',
            'genre_slug.unique' => 'Genre slug exists',
            'genre_image.required' => 'Required',
            'genre_image.mimes' => 'Upload JPG, JPEG files',
            'genre_image.max' => 'Maximum image size : 2 MB',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $genreImagePath = "";

            if ($req->hasFile('genre_image')) {
                $getfileExtension = $req->file('genre_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->genre_image->move(base_path('./public/images/genres'), $createnewFileName);
                $genreImagePath = "genres/" . $createnewFileName;
            }

            $insertData = [
                'genre_name' => $req->input("genre_name"),
                'genre_slug' => $req->input("genre_slug"),
                'genre_image' => $genreImagePath,
                'is_popular' => $req->input("is_popular"),
                'is_active' => 'yes',
            ];

            $genreCreate = DB::table('genre_lists')->insert([ ...$insertData]);

            if ($genreCreate) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully created genre'], 201);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }

    public function updateGenre(Request $req)
    {
        $genreID = $req->genre_id;
        $rules = [

            'genre_name' => 'required|max:255|unique:genre_lists,genre_name,' . $genreID . ',genre_id',
            'genre_slug' => 'required|max:255|unique:genre_lists,genre_slug,' . $genreID . ',genre_id',
            'genre_image' => 'mimes:jpeg,jpg,png|max:2048',
        ];
        $messages = [
            'genre_name.required' => 'Required',
            'genre_name.max' => 'Max: 255 characters',
            'genre_name.unique' => 'Genre name exists',
            'genre_slug.required' => 'Required',
            'genre_slug.max' => 'Max: 255 characters',
            'genre_slug.unique' => 'Genre slug exists',
            'genre_image.mimes' => 'Upload JPG, JPEG files',
            'genre_image.max' => 'Maximum image size : 2 MB',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $genreImagePath = "";

            $genresTable = DB::table('genre_lists')->where('genre_id', '=', $genreID)->first();
            $genreImagePath = $genresTable->genre_image;
            $actualImagePath = base_path('./public/images/' . $genreImagePath);

            if ($req->hasFile('genre_image')) {
                $getfileExtension = $req->file('genre_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->genre_image->move(base_path('./public/images/genres'), $createnewFileName);
                $genreImagePath = "genres/" . $createnewFileName;
                if (file_exists($actualImagePath)) {
                    unlink($actualImagePath);
                }
            }

            $updateData = [
                'genre_name' => $req->input("genre_name"),
                'genre_slug' => $req->input("genre_slug"),
                'genre_image' => $genreImagePath,
                'is_popular' => $req->input("is_popular"),
                'is_active' => $req->input("is_active"),
            ];

            DB::table('genre_lists')->where('genre_id', '=', $genreID)->update([ ...$updateData]);

            return response()->json(['statusCode' => 201, 'message' => 'Successfully updated genre'], 201);
        }
    }

    public function deleteGenre(Request $req)
    {
        $check = 0;
        $genreID = $req->genre_id;

        $genresTable = DB::table('genre_lists')->where('genre_id', '=', $genreID)->first();
        $genreImagePath = $genresTable->genre_image;
        $actualGenreImagePath = base_path('./public/images/' . $genreImagePath);

        if (DB::table('episode_lists')->where('genre_id', '=', $genreID)->count() > 0) {
            $check = 1;
        }
        if ($check === 1) {
            $episodesTable = DB::table('episode_lists')->where('genre_id', '=', $genreID)->first();
            $episodeID = $episodesTable->episode_id;
            $episodeImagePath = $episodesTable->episode_image;
            $actualEpisodeImagePath = base_path('./public/images/' . $episodeImagePath);

            $deleteEpisode = Episodes::find($episodeID)->delete();
        }

        $deleteGenre = Genres::find($genreID)->delete();

        if ($deleteGenre || $deleteEpisode) {

            if (file_exists($actualGenreImagePath)) {
                unlink($actualGenreImagePath);
            }
            if ($check === 1) {
                if (file_exists($actualEpisodeImagePath)) {
                    unlink($actualEpisodeImagePath);
                }
            }
            return response()->json(['statusCode' => 201, 'message' => 'Successfully deleted genre'], 201);
        } else {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }
}
