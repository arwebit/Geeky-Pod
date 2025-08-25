<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class ContactController extends Controller
{
    public function getContact()
    {

        $query = DB::table('contact')
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

    public function saveContact(Request $req)
    {
        $contactID = 1;

        $rules = [
            'google_form_link' => 'required|url',
            'contact_email' => 'required|email',
            'mobile_no' => 'required|digits:10|numeric',
            'address' => 'required|max:255',
            'instagram_link' => 'url',
            'youtube_link' => 'url',
            'spotify_link' => 'url',
        ];
        $messages = [
            'google_form_link.required' => 'Required',
            'google_form_link.url' => 'Invalid URL',
            'address.required' => 'Required',
            'address.max' => 'Max characters : 255',
            'contact_email.required' => 'Required',
            'contact_email.email' => 'Invalid email',
            'mobile_no.required' => 'Required',
            'mobile_no.numeric' => 'Must be numeric',
            'mobile_no.digits' => 'Must be 10 digits',
            'instagram_link.url' => 'Invalid URL',
            'youtube_link.url' => 'Invalid URL',
            'spotify_link.url' => 'Invalid URL',

        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {

            $insertData = [
                'google_form_link' => $req->input("google_form_link"),
                'address' => $req->input("address"),
                'contact_email' => $req->input("contact_email"),
                'mobile_no' => $req->input("mobile_no"),
                'instagram_link' => $req->input("instagram_link"),
                'youtube_link' => $req->input("youtube_link"),
                'spotify_link' => $req->input("spotify_link"),
            ];

            DB::table('contact')->updateOrInsert(['contact_id' => $contactID], [ ...$insertData]);

            return response()->json(['statusCode' => 201, 'message' => 'Successfully saved contact details'], 201);
        }
    }
}
