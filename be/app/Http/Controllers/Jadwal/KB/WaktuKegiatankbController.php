<?php

namespace App\Http\Controllers\Jadwal\KB;

use App\Http\Controllers\Controller;
use App\Models\Jadwal\KB\WaktuKegiatankb;
use App\Http\Resources\Jadwal\KB\WaktuKegiatankbResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WaktuKegiatankbController extends Controller
{
    public function index()
    {
        $data = WaktuKegiatankb::all();
        return WaktuKegiatankbResource::collection($data);
    }

    public function show($id)
    {
        $data = WaktuKegiatankb::find($id);
        if (!$data) {
            return WaktuKegiatankbResource::notFoundResponse();
        }

        return new WaktuKegiatankbResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hari' => 'required|string',
            'jam' => 'required|string',
        ]);

        if ($validator->fails()) {
            return WaktuKegiatankbResource::validationErrorResponse($validator);
        }

        $data = WaktuKegiatankb::create([
            'hari' => $request->hari,
            'jam' => $request->jam,
        ]);

        return new WaktuKegiatankbResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = WaktuKegiatankb::find($id);
        if (!$data) {
            return WaktuKegiatankbResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'hari' => 'sometimes|string',
            'jam' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return WaktuKegiatankbResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new WaktuKegiatankbResource($data);
    }

    public function destroy($id)
    {
        $data = WaktuKegiatankb::find($id);
        if (!$data) 
            return WaktuKegiatankbResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Waktu Kegiatan data deleted successfully',
        ]);
    }
}
