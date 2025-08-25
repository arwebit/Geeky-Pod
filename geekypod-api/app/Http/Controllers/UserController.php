<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as Validator;

class UserController extends Controller
{
    public function getUsers(Request $req)
    {
        $condition = $req->input('filter')['condition'];
        $start = $req->input('start_row');
        $records = $req->input('page_records');
        $sortField = $req->input('sort_field') == "" ? "doctor_full_name" : $req->input('sort_field');
        $sort = $req->input('sort') == -1 ? 'desc' : 'asc';


        $query = DB::table('user_details')
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
    public function login(Request $req)
    {
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];
        $messages = [
            'username.required' => 'Required',
            'password.required' => 'Required',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {
            $data = DB::table('user_details')
                ->select()
                ->where("username", "=", $req->input("username"))
                ->where("ptext", "=", $req->input("password"));

            if ($data->count() == 0) {
                return response()->json(['status' => 406, 'message' => 'Login failed'], 406);
            }

            $details = $data->get();

            return response()->json(['statusCode' => 200, 'message' => 'Successfully logged in', 'rows' => $details,], 200);
        }
    }

    public function updateUser(Request $req)
    {

        $userID = $req->user_id;
        $rules = [
            'username' => 'required|unique:user_details,username,' . $userID . ',user_id',
            'full_name' => 'required'
        ];
        $messages = [
            'username.required' => 'Required',
            'username.unique' => 'Username doesnot exists',
            'full_name.required' => 'Required'
        ];

        $validator = Validator::make($req->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {
            $update = DB::table('user_details')->where('user_id', '=', $userID)
                ->update([
                    'username' => $req->input("username"),
                    'full_name' => $req->input("full_name")
                ]);
            if ($update) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully updated user'], 200);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }

    public function changePassword(Request $req)
    {

        $userID = $req->user_id;
        $rules = [
            'old_password' => 'required|exists:user_details,ptext,user_id,' . $userID,
            'new_password' => 'required',
            'confirm_password' => 'required|same:new_password',
        ];
        $messages = [
            'old_password.required' => 'Required',
            'old_password.exists' => 'Old password doesnot match',
            'new_password.required' => 'Required',
            'confirm_password.required' => 'Required',
            'confirm_password.same' => 'Must match with new password',
        ];

        $validator = Validator::make($req->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['statusCode' => 400, 'message' => 'Recorrect errors', 'errors' => $validator->errors()], 400);
        } else {
            $changed = DB::table('user_details')->where('user_id', '=', $userID)
                ->update([
                    'password' => Hash::make($req->input("new_password")),
                    'ptext' => $req->input("new_password")
                ]);
            if ($changed) {
                return response()->json(['statusCode' => 201, 'message' => 'Successfully changed password'], 200);
            } else {
                return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
            }
        }
    }
}
