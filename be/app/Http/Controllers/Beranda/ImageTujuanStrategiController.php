<?php

namespace App\Http\Controllers\Beranda;

use App\Http\Controllers\Controller;
use App\Models\Beranda\ImageTujuanStrategi;
use App\Http\Resources\Beranda\ImageTujuanStrategiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ImageTujuanStrategiController extends Controller
{
    public function index()
    {
        $images = ImageTujuanStrategi::all();
        return ImageTujuanStrategiResource::collection($images);
    }


    public function show($id)
    {
        $image = ImageTujuanStrategi::find($id);
        if (!$image) {
            return ImageTujuanStrategiResource::notFoundResponse('Image data not found');
        }

        return new ImageTujuanStrategiResource($image);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return ImageTujuanStrategiResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/beranda-images/tujuan-strategi/', $image->hashName());

        $images = ImageTujuanStrategi::create([
            'image' => $image->hashName(),
        ]);
        return new ImageTujuanStrategiResource($images);
    }


    public function update(Request $request, $id)
    {
        $images = ImageTujuanStrategi::find($id);
        if (!$images) {
            return ImageTujuanStrategiResource::notFoundResponse('Image data not found');
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return ImageTujuanStrategiResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/beranda-images/tujuan-strategi/', $image->hashName());
        Storage::delete('/beranda-images/tujuan-strategi/' . basename($images->image));

        $images->update([
            'image' => $image->hashName(),
        ]);
        return new ImageTujuanStrategiResource($images);
    }

    
    public function destroy($id)
    {
        $images = ImageTujuanStrategi::find($id);
        if (!$images) {
            return ImageTujuanStrategiResource::notFoundResponse('Image data not found');
        }
        Storage::delete('/beranda-images/tujuan-strategi/' . basename($images->image));
        $images->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}