<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\Strategi;
use App\Http\Resources\Beranda\StrategiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class StrategiController extends Controller
{
    public function index()
    {
        $data = Strategi::all();
        return StrategiResource::collection($data);
    }

    public function show($id)
    {
        $data = Strategi::find($id);
        if (!$data) {
            return StrategiResource::notFoundResponse();
        }

        return new StrategiResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'strategi_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return StrategiResource::validationErrorResponse($validator);
        }

        $data = Strategi::create([
            'strategi_description' => $request->strategi_description,
        ]);

        return new StrategiResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Strategi::find($id);
        if (!$data) {
            return StrategiResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'strategi_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return StrategiResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new StrategiResource($data);
    }
    public function destroy($id)
    {
        $data = Strategi::find($id);
        if (!$data) {
            return StrategiResource::notFoundResponse();
        }
        $data->delete();
        return response()->json([
            'status' => true,
            'message' => 'Strategi data deleted successfully',
        ]);
    }
}
