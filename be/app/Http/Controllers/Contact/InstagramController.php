<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact\Instagram;
use App\Http\Resources\Contact\InstagramResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstagramController extends Controller
{
    public function index()
    {
        $data = Instagram::all();
        return InstagramResource::collection($data);
    }

    public function show($id)
    {
        $data = Instagram::find($id);
        if (!$data) {
            return InstagramResource::notFoundResponse();
        }

        return new InstagramResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ig_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return InstagramResource::validationErrorResponse($validator);
        }

        $data = Instagram::create([
            'ig_name' => $request->ig_name,

        ]);

        return new InstagramResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Instagram::find($id);
        if (!$data) {
            return InstagramResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'ig_name' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return InstagramResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new InstagramResource($data);
    }

    public function destroy($id)
    {
        $data = Instagram::find($id);
        if (!$data) 
            return InstagramResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Instagram data deleted successfully',
        ]);
    }
}
