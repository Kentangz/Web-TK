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
        $data = Misi::all();
        return MisiResource::collection($data);
    }

    public function show($id)
    {
        $data = Misi::find($id);
        if (!$data) {
            return MisiResource::notFoundResponse();
        }

        return new MisiResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'misi_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return MisiResource::validationErrorResponse($validator);
        }

        $data = Misi::create([
            'misi_description' => $request->misi_description,
        ]);

        return new MisiResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Misi::find($id);
        if (!$data) {
            return MisiResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'misi_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return MisiResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new MisiResource($data);
    }

    public function destroy($id)
    {
        $data = Misi::find($id);
        if (!$data) {
            return MisiResource::notFoundResponse();
        }

        $data->delete();
        return response()->json([
            'status' => true,
            'message' => 'Misi data deleted successfully',
        ]);
    }
}
