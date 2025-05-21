<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact\Alamat;
use App\Http\Resources\Contact\AlamatResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlamatController extends Controller
{
    public function index()
    {
        $data = Alamat::all();
        return AlamatResource::collection($data);
    }

    public function show($id)
    {
        $data = Alamat::find($id);
        if (!$data) {
            return AlamatResource::notFoundResponse();
        }

        return new AlamatResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'alamat' => 'required|string',
        ]);

        if ($validator->fails()) {
            return AlamatResource::validationErrorResponse($validator);
        }

        $data = Alamat::create([
            'alamat' => $request->alamat,

        ]);

        return new AlamatResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Alamat::find($id);
        if (!$data) {
            return AlamatResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'alamat' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return AlamatResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new AlamatResource($data);
    }

    public function destroy($id)
    {
        $data = Alamat::find($id);
        if (!$data) 
            return AlamatResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Alamat data deleted successfully',
        ]);
    }
}
