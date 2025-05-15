<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\Visi; 
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
        $visi = Visi::find($id);
        if (!$visi) {
            return VisiResource::notFoundResponse('Visi data not found');
        }

        return new VisiResource($visi);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request-
            'visi_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return VisiResource::validationErrorResponse($validator);
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
            return VisiResource::notFoundResponse('Visi data not found');
        }

        $validator = Validator::make($request->all(), [
            'visi_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return VisiResource::validationErrorResponse($validator);
        }

        $visi->update($request->all());

        return new VisiResource($visi);
    }

    public function destroy($id)
    {
        $visi = Visi::find($id);
        if (!$visi) 
            return VisiResource::notFoundResponse('Visi data not found');
        }
        
        $visi->delete();

        return response()->json([
            'status' => true,
            'message' => 'Visi data deleted successfully',
        ]);
    }
}
