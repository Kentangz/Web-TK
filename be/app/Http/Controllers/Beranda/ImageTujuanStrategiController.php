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
        $data = ImageTujuanStrategi::all();
        return ImageTujuanStrategiResource::collection($data);
    }


    public function show($id)
    {
        $data = ImageTujuanStrategi::find($id);
        if (!$data) {
            return ImageTujuanStrategiResource::notFoundResponse();
        }

        return new ImageTujuanStrategiResource($data);
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

        $data = ImageTujuanStrategi::create([
            'image' => $image->hashName(),
        ]);
        return new ImageTujuanStrategiResource($data);
    }


    public function update(Request $request, $id)
    {
        $data = ImageTujuanStrategi::find($id);
        if (!$data) {
            return ImageTujuanStrategiResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return ImageTujuanStrategiResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('/beranda-images/tujuan-strategi/', $image->hashName());
        Storage::delete('/beranda-images/tujuan-strategi/' . basename($data->image));

        $data->update([
            'image' => $image->hashName(),
        ]);
        return new ImageTujuanStrategiResource($data);
    }

    
    public function destroy($id)
    {
        $data = ImageTujuanStrategi::find($id);
        if (!$data) {
            return ImageTujuanStrategiResource::notFoundResponse();
        }
        Storage::delete('/beranda-images/tujuan-strategi/' . basename($data->image));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Image data deleted successfully',
        ]);
    }
}