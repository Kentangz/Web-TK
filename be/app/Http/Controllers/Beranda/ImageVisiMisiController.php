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
        $data = ImageVisiMisi::all();
        return ImageVisiMisiResource::collection($data);
    }

    public function show($id)
    {
        $data = ImageVisiMisi::find($id);
        if (!$data) {
            return ImageVisiMisiResource::notFoundResponse();
        }

        return new ImageVisiMisiResource($data);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return ImageVisiMisiResource::validationErrorResponse($validator);
        }

        $data = $request->file('image');
        $data->storeAs('beranda-images/visi-misi/', $data->hashName());

        $data = ImageVisiMisi::create([
            'image' => $data->hashName(),
        ]);
        return new ImageVisiMisiResource($data);
    }


    public function update(Request $request, $id)
    {
        $data = ImageVisiMisi::find($id);
        if (!$data) {
            return ImageVisiMisiResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return ImageVisiMisiResource::validationErrorResponse($validator);
        }

        $image = $request->file('image');
        $image->storeAs('beranda-images/visi-misi/', $image->hashName());
        Storage::delete('beranda-images/visi-misi/' . basename($data->image));

        $data->update([
            'image' => $image->hashName(),
        ]);
        return new ImageVisiMisiResource($data);
    }


    public function destroy($id)
    {
        $data = ImageVisiMisi::find($id);
        if (!$data) {
            return ImageVisiMisiResource::notFoundResponse();
        }
        Storage::delete('beranda-images/visi-misi/' . basename($data->image));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Image data deleted successfully',
        ]);
    }
}