<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class AboutController extends Controller
{
    public function getAbout()
    {

        $query = DB::table('about')
            ->select();

        $totalRows = $query->count();

        if ($totalRows > 0) {
            $response = [
                "statusCode" => 200,
                "message" => "Records found",
                "rows" => $query->get(),
            ];
        } else {
            $response = [
                "statusCode" => 200,
                "message" => "No records found",
            ];
        }
        return response()->json($response, 200);
    }

    public function saveAbout(Request $req)
    {
        $aboutID = 1;

        $rules = [
            'about_me' => 'required',
            'about_pic' => 'mimes:jpeg,jpg,png|max:2048',
            'about_button_text' => 'max:20',
            'about_button_link' => 'max:255|url',
        ];
        $messages = [
            'about_me.required' => 'Required',
            'about_pic.mimes' => 'Upload JPG, JPEG, PNG files',
            'about_pic.max' => 'Maximum image size : 2 MB',
            'about_button_text.max' => 'Maximum characters : 20',
            'about_button_link.max' => 'Maximum characters : 255',
            'about_button_link.url' => 'Invalid URL',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {
            $aboutImagePath = "";

            $aboutsTable = DB::table('about')->where('about_id', '=', $aboutID)->first();
            $aboutImagePath = $aboutsTable->about_pic;
            $actualImagePath = base_path('./public/images/' . $aboutImagePath);

            if ($req->hasFile('about_pic')) {
                $getfileExtension = $req->file('about_pic')->getClientOriginalExtension();
                $createnewFileName = date('YmdHis') . '.' . $getfileExtension;
                $req->about_pic->move(base_path('./public/images/about'), $createnewFileName);
                $aboutImagePath = "about/" . $createnewFileName;
                if (file_exists($actualImagePath)) {
                    unlink($actualImagePath);
                }
            }

            $insertData = [
                'about_me' => $req->input("about_me"),
                'about_button_text' => $req->input("about_button_text"),
                'about_button_link' => $req->input("about_button_link"),
                'about_pic' => $aboutImagePath,
            ];

            DB::table('about')->updateOrInsert(['about_id' => $aboutID], [ ...$insertData]);

            return response()->json(['statusCode' => 201, 'message' => 'Successfully saved'], 201);
        }
    }
}
