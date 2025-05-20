<?php

namespace App\Http\Controllers\FasilitasPrestasi;

use App\Http\Controllers\Controller;
use App\Models\FasilitasPrestasi\GalleryFasilitas;
use App\Http\Resources\FasilitasPrestasi\GalleryFasilitasResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class GalleryFasilitasController extends Controller
{
    public function index()
    {
        $data = GalleryFasilitas::all();
        return GalleryFasilitasResource::collection($data);
    }


    public function show($id)
    {
        $data = GalleryFasilitas::find($id);
        if (!$data) {
            return GalleryFasilitasResource::notFoundResponse();
        }

        return new GalleryFasilitasResource($data);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return GalleryFasilitasResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/fasilitas-prestasi-images/fasilitas/', $image->hashName());

        $data = GalleryFasilitas::create([
            'image' => $image->hashName(),
        ]);
        return new GalleryFasilitasResource($data);
    }


    public function update(Request $request, $id)
    {
        $data = GalleryFasilitas::find($id);
        if (!$data) {
            return GalleryFasilitasResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return GalleryFasilitasResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/fasilitas-prestasi-images/fasilitas/', $image->hashName());
        Storage::delete('/fasilitas-prestasi-images/fasilitas/' . basename($data->image));

        $data->update([
            'image' => $image->hashName(),
        ]);
        return new GalleryFasilitasResource($data);
    }

    
    public function destroy($id)
    {
        $data = GalleryFasilitas::find($id);
        if (!$data) {
            return GalleryFasilitasResource::notFoundResponse();
        }
        Storage::delete('/fasilitas-prestasi-images/fasilitas/' . basename($data->image));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Fasilitas Image data deleted successfully',
        ]);
    }
}
