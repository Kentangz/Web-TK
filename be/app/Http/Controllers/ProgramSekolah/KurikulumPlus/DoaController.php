<?php

namespace App\Http\Controllers\ProgramSekolah\KurikulumPlus;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\KurikulumPlus\Doa;
use App\Http\Resources\ProgramSekolah\KurikulumPlus\DoaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoaController extends Controller
{
    public function index()
    {
        $data = Doa::all();
        return DoaResource::collection($data);
    }

    public function show($id)
    {
        $data = Doa::find($id);
        if (!$data) {
            return DoaResource::notFoundResponse();
        }

        return new DoaResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doa_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return DoaResource::validationErrorResponse($validator);
        }

        $data = Doa::create([
            'doa_name' => $request->doa_name,
        ]);

        return new DoaResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Doa::find($id);
        if (!$data) {
            return DoaResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'doa_name' => 'required|string',
        ]);
        if ($validator->fails()) {
            return DoaResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new DoaResource($data);
    }

    public function destroy($id)
    {
        $data = Doa::find($id);
        if (!$data) 
            return DoaResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Doa data yang Dihasilkan deleted successfully',
        ]);
    }
}
