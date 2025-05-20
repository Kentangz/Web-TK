<?php

namespace App\Http\Controllers\FasilitasPrestasi;

use App\Http\Controllers\Controller;
use App\Models\FasilitasPrestasi\Gallery;
use App\Http\Resources\FasilitasPrestasi\GalleryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $data = Gallery::all();
        return GalleryResource::collection($data);
    }


    public function show($id)
    {
        $data = Gallery::find($id);
        if (!$data) {
            return GalleryResource::notFoundResponse();
        }

        return new GalleryResource($data);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return GalleryResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/fasilitas-prestasi-images/gallery/', $image->hashName());

        $data = Gallery::create([
            'image' => $image->hashName(),
        ]);
        return new GalleryResource($data);
    }


    public function update(Request $request, $id)
    {
        $data = Gallery::find($id);
        if (!$data) {
            return GalleryResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return GalleryResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/fasilitas-prestasi-images/gallery/', $image->hashName());
        Storage::delete('/fasilitas-prestasi-images/gallery/' . basename($data->image));

        $data->update([
            'image' => $image->hashName(),
        ]);
        return new GalleryResource($data);
    }

    
    public function destroy($id)
    {
        $data = Gallery::find($id);
        if (!$data) {
            return GalleryResource::notFoundResponse();
        }
        Storage::delete('/fasilitas-prestasi-images/gallery/' . basename($data->image));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Fasilitas Image data deleted successfully',
        ]);
    }
}
