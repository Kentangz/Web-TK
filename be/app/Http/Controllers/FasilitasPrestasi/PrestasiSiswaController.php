<?php

namespace App\Http\Controllers\FasilitasPrestasi;

use App\Http\Controllers\Controller;
use App\Models\FasilitasPrestasi\PrestasiSiswa;
use App\Http\Resources\FasilitasPrestasi\PrestasiSiswaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrestasiSiswaController extends Controller
{
    public function index()
    {
        $data = PrestasiSiswa::all();
        return PrestasiSiswaResource::collection($data);
    }

    public function show($id)
    {
        $data = PrestasiSiswa::find($id);
        if (!$data) {
            return PrestasiSiswaResource::notFoundResponse();
        }

        return new PrestasiSiswaResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prestasi_siswa' => 'required|string',
        ]);

        if ($validator->fails()) {
            return PrestasiSiswaResource::validationErrorResponse($validator);
        }

        $data = PrestasiSiswa::create([
            'prestasi_siswa' => $request->prestasi_siswa,
        ]);

        return new PrestasiSiswaResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = PrestasiSiswa::find($id);
        if (!$data) {
            return PrestasiSiswaResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'prestasi_siswa' => 'required|string',
        ]);
        if ($validator->fails()) {
            return PrestasiSiswaResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new PrestasiSiswaResource($data);
    }

    public function destroy($id)
    {
        $data = PrestasiSiswa::find($id);
        if (!$data) 
            return PrestasiSiswaResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Prestasi Siswa Data deleted successfully',
        ]);
    }
}
