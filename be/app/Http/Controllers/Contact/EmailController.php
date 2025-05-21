<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact\Email;
use App\Http\Resources\Contact\EmailResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    public function index()
    {
        $data = Email::all();
        return EmailResource::collection($data);
    }

    public function show($id)
    {
        $data = Email::find($id);
        if (!$data) {
            return EmailResource::notFoundResponse();
        }

        return new EmailResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
        ]);

        if ($validator->fails()) {
            return EmailResource::validationErrorResponse($validator);
        }

        $data = Email::create([
            'email' => $request->email,

        ]);

        return new EmailResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Email::find($id);
        if (!$data) {
            return EmailResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'email' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return EmailResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new EmailResource($data);
    }

    public function destroy($id)
    {
        $data = Email::find($id);
        if (!$data) 
            return EmailResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Email data deleted successfully',
        ]);
    }
}
