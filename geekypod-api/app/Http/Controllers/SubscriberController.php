<?php

namespace App\Http\Controllers;

use App\Models\Subscribers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as Validator;

class SubscriberController extends Controller
{
    public function getSubscriber(Request $req)
    {
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "subscriber_email" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';


        $query = DB::table('subscriber_lists')
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

    public function createSubscriber(Request $req)
    {
        $rules = [
            'subscriber_email' => 'required|email|unique:subscriber_lists,subscriber_email'
        ];
        $messages = [
            'subscriber_email.required' => 'Required',
            'subscriber_email.email' => 'Invalid email',
            'subscriber_email.unique' => 'Email exists'
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {
            $insertData = [
                'subscriber_email' => $req->input("subscriber_email"),
                'registered_date' => date("Y-m-d H:i:s")
            ];

            $subscriberCreate = DB::table('subscriber_lists')->insert([...$insertData]);

            if ($subscriberCreate) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully created subscriber'], 201);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }

    public function deleteSubscriber(Request $req)
    {
        $subscriberID = $req->subscriber_id;

        $deleteSubscriber = Subscribers::find($subscriberID)->delete();

        if ($deleteSubscriber) {
            return response()->json(['statusCode' => 201, 'message' => 'Successfully deleted subscriber'], 201);
        } else {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }
}
