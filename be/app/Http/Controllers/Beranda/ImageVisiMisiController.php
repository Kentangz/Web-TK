<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\ImageVisiMisi;
use App\Http\Resources\Beranda\ImageVisiMisiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ImageVisiMisiController extends Controller
{
    public function index()
    {
        $images = ImageVisiMisi::all();
        return ImageVisiMisiResource::collection($images);
    }


    public function show($id)
    {
        $image = ImageVisiMisi::find($id);
        if (!$image) {
            return ImageVisiMisiResource::notFoundResponse('Image data not found');
        }

        return new ImageVisiMisiResource($image);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return ImageVisiMisiResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('beranda-images/visi-misi/', $image->hashName());

        $images = ImageVisiMisi::create([
            'image' => $image->hashName(),
        ]);
        return new ImageVisiMisiResource($images);
    }


    public function update(Request $request, $id)
    {
        $images = ImageVisiMisi::find($id);
        if (!$images) {
            return ImageVisiMisiResource::notFoundResponse('Image data not found');
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return ImageVisiMisiResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('beranda-images/visi-misi/', $image->hashName());
        Storage::delete('beranda-images/visi-misi/' . basename($images->image));

        $images->update([
            'image' => $image->hashName(),
        ]);
        return new ImageVisiMisiResource($images);
    }


    public function destroy($id)
    {
        $images = ImageVisiMisi::find($id);
        if (!$images) {
            return ImageVisiMisiResource::notFoundResponse('Image data not found');
        }
        Storage::delete('beranda-images/visi-misi/' . basename($images->image));
        $images->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}