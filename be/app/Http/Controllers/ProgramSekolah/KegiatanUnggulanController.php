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
        $images = KegiatanUnggulan::all();
        return KegiatanUnggulanResource::collection($images);
    }

    public function show($id)
    {
        $image = KegiatanUnggulan::find($id);
        if (!$image) {
            return KegiatanUnggulanResource::notFoundResponse('Image data not found');
        }

        return new KegiatanUnggulanResource($image);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi_kegiatan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return KegiatanUnggulanResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/program-sekolah-images/kegiatan-unggulan/', $image->hashName());

        $images = KegiatanUnggulan::create([
            'image' => $image->hashName(),
            'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
        ]);
        return new KegiatanUnggulanResource($images);
    }
    public function update(Request $request, $id)
    {
        $images = KegiatanUnggulan::find($id);
        if (!$images) {
            return KegiatanUnggulanResource::notFoundResponse('Image data not found');
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi_kegiatan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return KegiatanUnggulanResource::validationErrorResponse($validator);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->storeAs('/program-sekolah-images/kegiatan-unggulan/', $image->hashName());
            Storage::delete('/program-sekolah-images/kegiatan-unggulan/' . basename($images->image));

            $images->update([
                'image' => $image->hashName(),
                'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
            ]);
        }else{
            $images->update([
                'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
            ]);

        }


        $images->update([
            'image' => $image->hashName(),
            'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
        ]);
        return new KegiatanUnggulanResource($images);
    }

    public function destroy($id)
    {
        $images = KegiatanUnggulan::find($id);
        if (!$images) {
            return KegiatanUnggulanResource::notFoundResponse('Image data not found');
        }

        Storage::delete('/program-sekolah-images/kegiatan-unggulan/' . basename($images->image));
        $images->delete();

        return response()->json([
            'status' => true,
            'message' => 'Image data deleted successfully',
        ]);
    }
}

