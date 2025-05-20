<?php

namespace App\Http\Controllers\FasilitasPrestasi;

use App\Http\Controllers\Controller;
use App\Models\FasilitasPrestasi\Fasilitas;
use App\Http\Resources\FasilitasPrestasi\FasilitasResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FasilitasController extends Controller
{
    public function index()
    {
        $data = Fasilitas::all();
        return FasilitasResource::collection($data);
    }

    public function show($id)
    {
        $data = Fasilitas::find($id);
        if (!$data) {
            return FasilitasResource::notFoundResponse();
        }

        return new FasilitasResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fasilitas_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return FasilitasResource::validationErrorResponse($validator);
        }

        $data = Fasilitas::create([
            'fasilitas_name' => $request->fasilitas_name,
        ]);

        return new FasilitasResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Fasilitas::find($id);
        if (!$data) {
            return FasilitasResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'fasilitas_name' => 'required|string',
        ]);
        if ($validator->fails()) {
            return FasilitasResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new FasilitasResource($data);
    }

    public function destroy($id)
    {
        $data = Fasilitas::find($id);
        if (!$data) 
            return FasilitasResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Fasilitas Data deleted successfully',
        ]);
    }
}
