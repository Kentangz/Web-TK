<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\Visi; 
use App\Http\Resources\Beranda\VisiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class VisiController extends Controller
{
    public function index()
    {
        $data = Visi::all();
        return VisiResource::collection($data);
    }

    public function show($id)
    {
        $data = Visi::find($id);
        if (!$data) {
            return VisiResource::notFoundResponse();
        }

        return new VisiResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'visi_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return VisiResource::validationErrorResponse($validator);
        }

        $data = Visi::create([
            'visi_description' => $request->visi_description,
        ]);

        return new VisiResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Visi::find($id);
        if (!$data) {
            return VisiResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'visi_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return VisiResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new VisiResource($data);
    }

    public function destroy($id)
    {
        $data = Visi::find($id);
        if (!$data) 
            return VisiResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Visi data deleted successfully',
        ]);
    }
}

