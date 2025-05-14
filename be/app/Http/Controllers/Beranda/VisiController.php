<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Models\Beranda\Visi; 
use App\Http\Resources\Beranda\VisiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisiController extends Controller
{
    
    public function index()
    {
        $visis = Visi::all();
        return VisiResource::collection($visis);
    }


    public function show($id)
    {
        $visi = Visi::findOrFail($id);
        return new VisiResource($visi);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'visi_description' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $visi = Visi::create([
            'visi_description' => $request->visi_description,
        ]);
        return new VisiResource($visi);
    }


public function update(Request $request, $id)
{
    $visi = Visi::find($id);
    if (!$visi) {
        return response()->json([
            'status' => false,
            'message' => 'Data Visi tidak ditemukan',
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'visi_description' => 'required|string|max:255',
    ]);
    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Validasi gagal',
            'errors' => $validator->errors(),
        ], 422);
    }
    $visi->update($request->all());

    return new VisiResource($visi);
}


    public function destroy($id)
    {
        $visi = Visi::find($id);
        if (!$visi) {
            return response()->json([
                'status' => false,
                'message' => 'Data Visi tidak ditemukan',
            ], 404);
        }
        
        $visi->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data Visi berhasil dihapus',
        ]);
    }
}
