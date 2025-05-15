<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\Misi;
use App\Http\Resources\Beranda\MisiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MisiController extends Controller
{
    public function index()
    {
        $misis = Misi::all();
        return MisiResource::collection($misis);
    }

    public function show($id)
    {
        $misi = Misi::find($id);
        if (!$misi) {
            return MisiResource::notFoundResponse('Misi data not found');
        }

        return new MisiResource($misi);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'misi_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return MisiResource::validationErrorResponse($validator);
        }

        $misi = Misi::create([
            'misi_description' => $request->misi_description,
        ]);

        return new MisiResource($misi);
    }

    public function update(Request $request, $id)
    {
        $misi = Misi::find($id);
        if (!$misi) {
            return MisiResource::notFoundResponse('Misi data not found');
        }

        $validator = Validator::make($request->all(), [
            'misi_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return MisiResource::validationErrorResponse($validator);
        }

        $misi->update($request->all());

        return new MisiResource($misi);
    }

    public function destroy($id)
    {
        $misi = Misi::find($id);
        if (!$misi) {
            return MisiResource::notFoundResponse('Misi data not found');
        }

        $misi->delete();

        return response()->json([
            'status' => true,
            'message' => 'Misi data deleted successfully',
        ]);
    }
}
