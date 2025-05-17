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
        $strategis = Strategi::all();
        return StrategiResource::collection($strategis);
    }

    public function show($id)
    {
        $strategi = Strategi::find($id);
        if (!$strategi) {
            return StrategiResource::notFoundResponse('Strategi data not found');
        }

        return new StrategiResource($strategi);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'strategi_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return StrategiResource::validationErrorResponse($validator);
        }

        $strategi = Strategi::create([
            'strategi_description' => $request->strategi_description,
        ]);

        return new StrategiResource($strategi);
    }

    public function update(Request $request, $id)
    {
        $strategi = Strategi::find($id);
        if (!$strategi) {
            return StrategiResource::notFoundResponse('Strategi data not found');
        }

        $validator = Validator::make($request->all(), [
            'strategi_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return StrategiResource::validationErrorResponse($validator);
        }

        $strategi->update($request->all());

        return new StrategiResource($strategi);
    }
    public function destroy($id)
    {
        $strategi = Strategi::find($id);
        if (!$strategi) {
            return StrategiResource::notFoundResponse('Strategi data not found');
        }

        $strategi->delete();
        return response()->json(['message' => 'Strategi deleted successfully'], 200);
    }
}
