<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Episodes;
use App\Models\Podcasters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class PodcasterController extends Controller
{

    public function getPodcaster(Request $req)
    {
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "podcaster_full_name" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';

        $query = DB::table('podcaster_lists')
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

    public function createPodcaster(Request $req)
    {
        $rules = [
            'podcaster_full_name' => 'required|max:255',
            'podcaster_slug' => 'required|max:255|unique:podcaster_lists,podcaster_slug',
            'podcaster_image' => 'required|mimes:jpeg,jpg,png|max:2048',
            'podcaster_bio' => 'max:200',
            'podcaster_designation' => 'required|max:50',
        ];
        $messages = [
            'podcaster_full_name.required' => 'Required',
            'podcaster_full_name.max' => 'Max: 255 characters',
            'podcaster_slug.required' => 'Required',
            'podcaster_slug.max' => 'Max: 255 characters',
            'podcaster_slug.unique' => 'Podcaster slug exists',
            'podcaster_image.required' => 'Required',
            'podcaster_image.mimes' => 'Upload JPG, JPEG files',
            'podcaster_image.max' => 'Maximum image size : 2 MB',
            'podcaster_bio.max' => 'Max: 200 characters',
            'podcaster_designation.required' => 'Required',
            'podcaster_designation.max' => 'Max: 50 characters',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $podcasterImagePath = "";

            if ($req->hasFile('podcaster_image')) {
                $getfileExtension = $req->file('podcaster_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->podcaster_image->move(base_path('./public/images/podcasters'), $createnewFileName);
                $podcasterImagePath = "podcasters/" . $createnewFileName;
            }

            $insertData = [
                'podcaster_full_name' => $req->input("podcaster_full_name"),
                'podcaster_slug' => $req->input("podcaster_slug"),
                'podcaster_image' => $podcasterImagePath,
                'podcaster_bio' => $req->input("podcaster_bio"),
                'podcaster_designation' => $req->input("podcaster_designation"),
                'podcaster_popular' => $req->input("podcaster_popular"),
                'is_active' => 'yes',
            ];

            $podcasterCreate = DB::table('podcaster_lists')->insert([ ...$insertData]);

            if ($podcasterCreate) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully created podcaster'], 201);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }

    public function updatePodcaster(Request $req)
    {
        $podcasterID = $req->podcaster_id;
        $rules = [
            'podcaster_full_name' => 'required|max:255',
            'podcaster_slug' => 'required|max:255|unique:podcaster_lists,podcaster_slug,' . $podcasterID . ",podcaster_id",
            'podcaster_image' => 'mimes:jpeg,jpg,png|max:2048',
            'podcaster_bio' => 'max:200',
            'podcaster_designation' => 'required|max:50',
        ];
        $messages = [
            'podcaster_full_name.required' => 'Required',
            'podcaster_full_name.max' => 'Max: 255 characters',
            'podcaster_slug.required' => 'Required',
            'podcaster_slug.max' => 'Max: 255 characters',
            'podcaster_slug.unique' => 'Podcaster slug exists',
            'podcaster_image.mimes' => 'Upload JPG, JPEG files',
            'podcaster_image.max' => 'Maximum image size : 2 MB',
            'podcaster_bio.max' => 'Max: 200 characters',
            'podcaster_designation.required' => 'Required',
            'podcaster_designation.max' => 'Max: 50 characters',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $podcasterImagePath = "";

            $podcastersTable = DB::table('podcaster_lists')->where('podcaster_id', '=', $podcasterID)->first();
            $podcasterImagePath = $podcastersTable->podcaster_image;
            $actualImagePath = base_path('./public/images/' . $podcasterImagePath);

            if ($req->hasFile('podcaster_image')) {
                $getfileExtension = $req->file('podcaster_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->podcaster_image->move(base_path('./public/images/podcasters'), $createnewFileName);
                $podcasterImagePath = "podcasters/" . $createnewFileName;
                if (file_exists($actualImagePath)) {
                    unlink($actualImagePath);
                }
            }

            $updateData = [
                'podcaster_full_name' => $req->input("podcaster_full_name"),
                'podcaster_slug' => $req->input("podcaster_slug"),
                'podcaster_image' => $podcasterImagePath,
                'podcaster_bio' => $req->input("podcaster_bio"),
                'podcaster_designation' => $req->input("podcaster_designation"),
                'podcaster_popular' => $req->input("podcaster_popular"),
                'is_active' => $req->input("is_active"),
            ];

            DB::table('podcaster_lists')->where('podcaster_id', '=', $podcasterID)->update([ ...$updateData]);

            return response()->json(['statusCode' => 201, 'message' => 'Successfully updated podcaster'], 201);
        }
    }

    public function deletePodcaster(Request $req)
    {
        $podcasterID = $req->podcaster_id;
        $check = 0;
        $podcastersTable = DB::table('podcaster_lists')->where('podcaster_id', '=', $podcasterID)->first();
        $podcasterImagePath = $podcastersTable->podcaster_image;
        $actualPodcasterImagePath = base_path('./public/images/' . $podcasterImagePath);

        if (DB::table('episode_lists')->where('podcaster_id', '=', $podcasterID)->count() > 0) {
            $check = 1;
        }

        if ($check === 1) {
            $episodesTable = DB::table('episode_lists')->where('podcaster_id', '=', $podcasterID)->first();
            $episodeID = $episodesTable->episode_id;
            $episodeImagePath = $episodesTable->episode_image;
            $actualEpisodeImagePath = base_path('./public/images/' . $episodeImagePath);

            $deleteEpisode = Episodes::find($episodeID)->delete();
        }

        $deletePodcaster = Podcasters::find($podcasterID)->delete();

        if ($deletePodcaster || $deleteEpisode) {

            if (file_exists($actualPodcasterImagePath)) {
                unlink($actualPodcasterImagePath);
            }

            if ($check === 1) {
                if (file_exists($actualEpisodeImagePath)) {
                    unlink($actualEpisodeImagePath);
                }
            }
            return response()->json(['statusCode' => 201, 'message' => 'Successfully deleted podcaster'], 201);
        } else {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }
}
