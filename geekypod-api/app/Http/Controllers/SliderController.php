<?php

namespace App\Http\Controllers;

use App\Models\Sliders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class SliderController extends Controller
{
    public function getSlider(Request $req)
    {
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "slider_id" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';

        $query = DB::table('slider_lists')
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

    public function createSlider(Request $req)
    {
        $rules = [

            'slider_button_text' => 'max:20',
            'slider_button_url' => 'max:150',
            'slider_image' => 'required|mimes:jpeg,jpg,png|max:2048',
            'slider_header_text' => 'max:20',
            'slider_para_text' => 'max:100',
        ];
        $messages = [
            'slider_button_text.max' => 'Max: 20 characters',
            'slider_button_url.max' => 'Max: 150 characters',
            'slider_header_text.max' => 'Max: 150 characters',
            'slider_para_text.max' => 'Max: 150 characters',
            'slider_image.required' => 'Required',
            'slider_image.mimes' => 'Upload JPG, JPEG files',
            'slider_image.max' => 'Maximum image size : 2 MB',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $sliderImagePath = "";

            if ($req->hasFile('slider_image')) {
                $getfileExtension = $req->file('slider_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->slider_image->move(base_path('./public/images/sliders'), $createnewFileName);
                $sliderImagePath = "sliders/" . $createnewFileName;
            }

            $insertData = [
                'slider_button_text' => $req->input("slider_button_text"),
                'slider_button_url' => $req->input("slider_button_url"),
                'slider_header_text' => $req->input("slider_header_text"),
                'slider_para_text' => $req->input("slider_para_text"),
                'slider_image' => $sliderImagePath,
                'is_active' => 'yes',
            ];

            $sliderCreate = DB::table('slider_lists')->insert([ ...$insertData]);

            if ($sliderCreate) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully created slider'], 201);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }

    public function updateSlider(Request $req)
    {
        $sliderID = $req->slider_id;

        $rules = [

            'slider_button_text' => 'max:20',
            'slider_button_url' => 'max:150',
            'slider_image' => 'mimes:jpeg,jpg,png|max:2048',
            'slider_header_text' => 'max:20',
            'slider_para_text' => 'max:100',
        ];
        $messages = [
            'slider_button_text.max' => 'Max: 20 characters',
            'slider_button_url.max' => 'Max: 150 characters',
            'slider_header_text.max' => 'Max: 150 characters',
            'slider_para_text.max' => 'Max: 150 characters',
            'slider_image.mimes' => 'Upload JPG, JPEG files',
            'slider_image.max' => 'Maximum image size : 2 MB',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $sliderImagePath = "";

            $slidersTable = DB::table('slider_lists')->where('slider_id', '=', $sliderID)->first();
            $sliderImagePath = $slidersTable->slider_image;
            $actualImagePath = base_path('./public/images/' . $sliderImagePath);

            if ($req->hasFile('slider_image')) {
                $getfileExtension = $req->file('slider_image')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->slider_image->move(base_path('./public/images/sliders'), $createnewFileName);
                $sliderImagePath = "sliders/" . $createnewFileName;
                if (file_exists($actualImagePath)) {
                    unlink($actualImagePath);
                }
            }

            $updateData = [
                'slider_button_text' => $req->input("slider_button_text"),
                'slider_button_url' => $req->input("slider_button_url"),
                'slider_header_text' => $req->input("slider_header_text"),
                'slider_para_text' => $req->input("slider_para_text"),
                'slider_image' => $sliderImagePath,
                'is_active' => $req->input("is_active"),
            ];

            DB::table('slider_lists')->where('slider_id', '=', $sliderID)->update([ ...$updateData]);

            return response()->json(['statusCode' => 201, 'message' => 'Successfully updated slider'], 201);
        }
    }

    public function deleteSlider(Request $req)
    {
        $sliderID = $req->slider_id;

        $slidersTable = DB::table('slider_lists')->where('slider_id', '=', $sliderID)->first();
        $sliderImagePath = $slidersTable->slider_image;
        $actualSliderImagePath = base_path('./public/images/' . $sliderImagePath);

        $deleteSlider = Sliders::find($sliderID)->delete();

        if ($deleteSlider) {

            if (file_exists($actualSliderImagePath)) {
                unlink($actualSliderImagePath);
            }

            return response()->json(['statusCode' => 201, 'message' => 'Successfully deleted slider'], 201);
        } else {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }
}
