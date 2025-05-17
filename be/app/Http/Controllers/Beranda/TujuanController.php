<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\Tujuan;
use App\Http\Resources\Beranda\TujuanResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TujuanController extends Controller
{
    public function index()
    {
        $tujuans = Tujuan::all();
        return TujuanResource::collection($tujuans);
    }

    public function show($id)
    {
        $tujuan = Tujuan::find($id);
        if (!$tujuan) {
            return TujuanResource::notFoundResponse('Tujuan data not found');
        }

        return new TujuanResource($tujuan);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tujuan_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return TujuanResource::validationErrorResponse($validator);
        }

        $tujuan = Tujuan::create([
            'tujuan_description' => $request->tujuan_description,
        ]);

        return new TujuanResource($tujuan);
    }

    public function update(Request $request, $id)
    {
        $tujuan = Tujuan::find($id);
        if (!$tujuan) {
            return TujuanResource::notFoundResponse('Tujuan data not found');
        }

        $validator = Validator::make($request->all(), [
            'tujuan_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return TujuanResource::validationErrorResponse($validator);
        }

        $tujuan->update($request->all());
        return new TujuanResource($tujuan);
    }
    public function destroy($id)
    {
        $tujuan = Tujuan::find($id);
        if (!$tujuan) {
            return TujuanResource::notFoundResponse('Tujuan data not found');
        }

        $tujuan->delete();
        return response()->json([
            'status' => true,
            'message' => 'Tujuan data deleted successfully',
        ]);
    }
}
