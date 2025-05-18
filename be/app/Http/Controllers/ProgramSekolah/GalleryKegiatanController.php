<?php

namespace App\Http\Controllers\ProgramSekolah;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\GalleryKegiatan;
use App\Http\Resources\ProgramSekolah\GalleryKegiatanResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class GalleryKegiatanController extends Controller
{

    public function index()
    {
        $datas = GalleryKegiatan::all();
        return GalleryKegiatanResource::collection($datas);
    }


    public function show($id)
    {
        $data = GalleryKegiatan::find($id);
        if (!$data) {
            return GalleryKegiatanResource::notFoundResponse('Data data not found');
        }

        return new GalleryKegiatanResource($data);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'nama_kegiatan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return GalleryKegiatanResource::validationErrorResponse($validator);
        }

        $data = $request->file('image');
        $data->storeAs('/program-sekolah-images/gallery-kegiatan/', $data->hashName());

        $datas = GalleryKegiatan::create([
            'image' => $data->hashName(),
            'nama_kegiatan' => $request->nama_kegiatan,
        ]);
        return new GalleryKegiatanResource($datas);
    }


    public function update(Request $request, $id)
    {
        $datas = GalleryKegiatan::find($id);
        if (!$datas) {
            return GalleryKegiatanResource::notFoundResponse('Data data not found');
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'nama_kegiatan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return GalleryKegiatanResource::validationErrorResponse($validator);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->storeAs('/program-sekolah-images/gallery-kegiatan/', $image->hashName());
            Storage::delete('/program-sekolah-images/gallery-kegiatan/' . basename($datas->image));

            $datas->update([
                'image' => $image->hashName(),
                'nama_kegiatan' => $request->nama_kegiatan,
            ]);
        } else {
            $datas->update([
                'nama_kegiatan' => $request->nama_kegiatan,
            ]);
        }
        return new GalleryKegiatanResource($datas);
    }


    public function destroy($id)
    {
        $datas = GalleryKegiatan::find($id);
        if (!$datas) {
            return GalleryKegiatanResource::notFoundResponse('Data data not found');
        }

        Storage::delete('/program-sekolah-images/gallery-kegiatan/' . basename ($datas->image));
        $datas->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data deleted successfully',
        ]);
    }
}
