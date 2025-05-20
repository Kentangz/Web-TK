<?php

namespace App\Http\Controllers\FasilitasPrestasi;

use App\Http\Controllers\Controller;
use App\Models\FasilitasPrestasi\PrestasiGuru;
use App\Http\Resources\FasilitasPrestasi\PrestasiGuruResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrestasiGuruController extends Controller
{
    public function index()
    {
        $data = PrestasiGuru::all();
        return PrestasiGuruResource::collection($data);
    }

    public function show($id)
    {
        $data = PrestasiGuru::find($id);
        if (!$data) {
            return PrestasiGuruResource::notFoundResponse();
        }

        return new PrestasiGuruResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prestasi_guru' => 'required|string',
        ]);

        if ($validator->fails()) {
            return PrestasiGuruResource::validationErrorResponse($validator);
        }

        $data = PrestasiGuru::create([
            'prestasi_guru' => $request->prestasi_guru,
        ]);

        return new PrestasiGuruResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = PrestasiGuru::find($id);
        if (!$data) {
            return PrestasiGuruResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'prestasi_guru' => 'required|string',
        ]);
        if ($validator->fails()) {
            return PrestasiGuruResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new PrestasiGuruResource($data);
    }

    public function destroy($id)
    {
        $data = PrestasiGuru::find($id);
        if (!$data) 
            return PrestasiGuruResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Prestasi Guru Data deleted successfully',
        ]);
    }
}
