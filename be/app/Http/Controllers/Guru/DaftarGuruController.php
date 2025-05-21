<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\Guru\DaftarGuru;
use App\Http\Resources\Guru\DaftarGuruResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DaftarGuruController extends Controller
{
        public function index()
    {
        $data = DaftarGuru::all();
        return DaftarGuruResource::collection($data);
    }

    public function show($id)
    {
        $data = DaftarGuru::find($id);
        if (!$data) {
            return DaftarGuruResource::notFoundResponse();
        }

        return new DaftarGuruResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
            'jabatan' => 'required|string|max:255',
            'nama' => 'required|string|max:255',    
            'ttl' => 'nullable|string|max:255',
            'nomor' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return DaftarGuruResource::validationErrorResponse($validator);
        }

        $data = $request->file('image');
        $data->storeAs('guru-images/', $data->hashName());

        $datas = DaftarGuru::create([
            'image' => $data->hashName(),
            'jabatan' => $request->jabatan,
            'nama' => $request->nama,
            'ttl' => $request->ttl,
            'nomor' => $request->nomor,
        ]);
        return new DaftarGuruResource($datas);
    }

    public function update(Request $request, $id)
    {
        $data = DaftarGuru::find($id);
        if (!$data) {
            return DaftarGuruResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'jabatan' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'ttl' => 'nullable|string|max:255',
            'nomor' => 'nullable|string|max:255',
            
        ]);

        if ($validator->fails()) {
            return DaftarGuruResource::validationErrorResponse($validator);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->storeAs('guru-images/', $image->hashName());
            Storage::delete('guru-images/' . basename($data->image));

            $data->update([
                'image' => $image->hashName(),
                'jabatan' => $request->jabatan,
                'nama' => $request->nama,
                'ttl' => $request->ttl,
                'nomor' => $request->nomor,
            ]);
        }else{
            $data->update([
                'jabatan' => $request->jabatan,
                'nama' => $request->nama,
                'ttl' => $request->ttl,
                'nomor' => $request->nomor,
            ]);

        }
        return new DaftarGuruResource($data);
    }

    public function destroy($id)
    {
        $data = DaftarGuru::find($id);
        if (!$data) {
            return DaftarGuruResource::notFoundResponse();
        }

        Storage::delete('guru-images/' . basename($data->image));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Guru data deleted successfully',
        ]);
    }
}
