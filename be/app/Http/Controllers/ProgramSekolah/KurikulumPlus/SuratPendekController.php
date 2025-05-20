<?php

namespace App\Http\Controllers\ProgramSekolah\KurikulumPlus;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\KurikulumPlus\SuratPendek;
use App\Http\Resources\ProgramSekolah\KurikulumPlus\SuratPendekResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SuratPendekController extends Controller
{
    public function index()
    {
        $data = SuratPendek::all();
        return SuratPendekResource::collection($data);
    }

    public function show($id)
    {
        $data = SuratPendek::find($id);
        if (!$data) {
            return SuratPendekResource::notFoundResponse();
        }

        return new SuratPendekResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'surat_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return SuratPendekResource::validationErrorResponse($validator);
        }

        $data = SuratPendek::create([
            'surat_name' => $request->surat_name,
        ]);

        return new SuratPendekResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = SuratPendek::find($id);
        if (!$data) {
            return SuratPendekResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'surat_name' => 'required|string',
        ]);
        if ($validator->fails()) {
            return SuratPendekResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new SuratPendekResource($data);
    }

    public function destroy($id)
    {
        $data = SuratPendek::find($id);
        if (!$data) 
            return SuratPendekResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Surat Surat Pendek data yang Dihasilkan deleted successfully',
        ]);
    }
}
