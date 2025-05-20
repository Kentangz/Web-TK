<?php

namespace App\Http\Controllers\Jadwal\TK;

use App\Http\Controllers\Controller;
use App\Models\Jadwal\TK\WaktuKegiatan;
use App\Http\Resources\Jadwal\TK\WaktuKegiatanResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WaktuKegiatanController extends Controller
{
    public function index()
    {
        $data = WaktuKegiatan::all();
        return WaktuKegiatanResource::collection($data);
    }

    public function show($id)
    {
        $data = WaktuKegiatan::find($id);
        if (!$data) {
            return WaktuKegiatanResource::notFoundResponse();
        }

        return new WaktuKegiatanResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hari' => 'required|string',
            'jam' => 'required|string',
        ]);

        if ($validator->fails()) {
            return WaktuKegiatanResource::validationErrorResponse($validator);
        }

        $data = WaktuKegiatan::create([
            'hari' => $request->hari,
            'jam' => $request->jam,
        ]);

        return new WaktuKegiatanResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = WaktuKegiatan::find($id);
        if (!$data) {
            return WaktuKegiatanResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'hari' => 'sometimes|string',
            'jam' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return WaktuKegiatanResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new WaktuKegiatanResource($data);
    }

    public function destroy($id)
    {
        $data = WaktuKegiatan::find($id);
        if (!$data) 
            return WaktuKegiatanResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Waktu Kegiatan TK data deleted successfully',
        ]);
    }
}
