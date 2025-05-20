<?php

namespace App\Http\Controllers\ProgramSekolah\KurikulumPlus;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\KurikulumPlus\Hadits;
use App\Http\Resources\ProgramSekolah\KurikulumPlus\HaditsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HaditsController extends Controller
{
    public function index()
    {
        $data = Hadits::all();
        return HaditsResource::collection($data);
    }

    public function show($id)
    {
        $data = Hadits::find($id);
        if (!$data) {
            return HaditsResource::notFoundResponse();
        }

        return new HaditsResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hadits_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return HaditsResource::validationErrorResponse($validator);
        }

        $data = Hadits::create([
            'hadits_name' => $request->hadits_name,
        ]);

        return new HaditsResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Hadits::find($id);
        if (!$data) {
            return HaditsResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'hadits_name' => 'required|string',
        ]);
        if ($validator->fails()) {
            return HaditsResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new HaditsResource($data);
    }

    public function destroy($id)
    {
        $data = Hadits::find($id);
        if (!$data) 
            return HaditsResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Hadits data yang Dihasilkan deleted successfully',
        ]);
    }
}
