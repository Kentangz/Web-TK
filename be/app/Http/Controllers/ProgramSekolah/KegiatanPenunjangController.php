<?php

namespace App\Http\Controllers\ProgramSekolah;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\KegiatanPenunjang;
use App\Http\Resources\ProgramSekolah\KegiatanPenunjangResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KegiatanPenunjangController extends Controller
{
    public function index()
    {
        $datas = KegiatanPenunjang::all();
        return KegiatanPenunjangResource::collection($datas);
    }

    public function show($id)
    {
        $data = KegiatanPenunjang::find($id);
        if (!$data) {
            return KegiatanPenunjangResource::notFoundResponse('Data not found');
        }

        return new KegiatanPenunjangResource($data);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kegiatan_penunjang' => 'required|string',
        ]);

        if ($validator->fails()) {
            return KegiatanPenunjangResource::validationErrorResponse($validator);
        }

        $data = KegiatanPenunjang::create([
            'kegiatan_penunjang' => $request->kegiatan_penunjang,
        ]);

        return new KegiatanPenunjangResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = KegiatanPenunjang::find($id);
        if (!$data) {
            return KegiatanPenunjangResource::notFoundResponse('Data not found');
        }

        $validator = Validator::make($request->all(), [
            'kegiatan_penunjang' => 'required|string',
        ]);
        if ($validator->fails()) {
            return KegiatanPenunjangResource::validationErrorResponse($validator);
        }

        $data->update($request->all());
        return new KegiatanPenunjangResource($data);
    }

    public function destroy($id)
    {
        $data = KegiatanPenunjang::find($id);
        if (!$data) {
            return KegiatanPenunjangResource::notFoundResponse('Data not found');
        }

        $data->delete();
        return response()->json([
            'status' => true,
            'message' => 'Data deleted successfully',
        ]);
    }

}
