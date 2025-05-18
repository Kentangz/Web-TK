<?php

namespace App\Http\Controllers\ProgramSekolah;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\KegiatanUnggulan;
use App\Http\Resources\ProgramSekolah\KegiatanUnggulanResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class KegiatanUnggulanController extends Controller
{
        public function index()
    {
        $datas = KegiatanUnggulan::all();
        return KegiatanUnggulanResource::collection($datas);
    }

    public function show($id)
    {
        $data = KegiatanUnggulan::find($id);
        if (!$data) {
            return KegiatanUnggulanResource::notFoundResponse('Data data not found');
        }

        return new KegiatanUnggulanResource($data);
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi_kegiatan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return KegiatanUnggulanResource::validationErrorResponse($validator);
        }

        $data = $request->file('icon');
        $data->storeAs('/program-sekolah-images/kegiatan-unggulan/', $data->hashName());

        $datas = KegiatanUnggulan::create([
            'icon' => $data->hashName(),
            'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
        ]);
        return new KegiatanUnggulanResource($datas);
    }

    public function update(Request $request, $id)
    {
        $datas = KegiatanUnggulan::find($id);
        if (!$datas) {
            return KegiatanUnggulanResource::notFoundResponse('Data data not found');
        }

        $validator = Validator::make($request->all(), [
            'deskripsi_kegiatan' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return KegiatanUnggulanResource::validationErrorResponse($validator);
        }

        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $icon->storeAs('/program-sekolah-images/kegiatan-unggulan/', $icon->hashName());
            Storage::delete('/program-sekolah-images/kegiatan-unggulan/' . basename($datas->icon));

            $datas->update([
                'icon' => $icon->hashName(),
                'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
            ]);
        }else{
            $datas->update([
                'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
            ]);

        }
        return new KegiatanUnggulanResource($datas);
    }

    public function destroy($id)
    {
        $datas = KegiatanUnggulan::find($id);
        if (!$datas) {
            return KegiatanUnggulanResource::notFoundResponse('Data data not found');
        }

        Storage::delete('/program-sekolah-images/kegiatan-unggulan/' . basename($datas->icon));
        $datas->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data deleted successfully',
        ]);
    }
}

