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
        $data = Tujuan::all();
        return TujuanResource::collection($data);
    }

    public function show($id)
    {
        $data = Tujuan::find($id);
        if (!$data) {
            return TujuanResource::notFoundResponse();
        }

        return new TujuanResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tujuan_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return TujuanResource::validationErrorResponse($validator);
        }

        $data = Tujuan::create([
            'tujuan_description' => $request->tujuan_description,
        ]);

        return new TujuanResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Tujuan::find($id);
        if (!$data) {
            return TujuanResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'tujuan_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return TujuanResource::validationErrorResponse($validator);
        }

        $data->update($request->all());
        return new TujuanResource($data);
    }
    public function destroy($id)
    {
        $data = Tujuan::find($id);
        if (!$data) {
            return TujuanResource::notFoundResponse();
        }

        $data->delete();
        return response()->json([
            'status' => true,
            'message' => 'Tujuan data deleted successfully',
        ]);
    }
}
