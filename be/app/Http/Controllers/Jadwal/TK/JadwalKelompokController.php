<?php

namespace App\Http\Controllers\Jadwal\TK;

use App\Http\Controllers\Controller;
use App\Models\Jadwal\TK\JadwalKelompok;
use App\Http\Resources\Jadwal\TK\JadwalKelompokResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class JadwalKelompokController extends Controller
{
    public function index()
    {
        $data = JadwalKelompok::all();
        return JadwalKelompokResource::collection($data);
    }

    public function show($id)
    {
        $data = JadwalKelompok::find($id);
        if (!$data) {
            return JadwalKelompokResource::notFoundResponse();
        }

        return new JadwalKelompokResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return JadwalKelompokResource::validationErrorResponse($validator);
        }

        $data = $request->file('icon');
        $data->storeAs('/jadwal-icons/tk/', $data->hashName());

        $datas = JadwalKelompok::create([
            'icon' => $data->hashName(),
            'deskripsi' => $request->deskripsi,
        ]);
        return new JadwalKelompokResource($datas);
    }

    public function update(Request $request, $id)
    {
        $data = JadwalKelompok::find($id);
        if (!$data) {
            return JadwalKelompokResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'deskripsi' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return JadwalKelompokResource::validationErrorResponse($validator);
        }

        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $icon->storeAs('/jadwal-icons/tk/', $icon->hashName());
            Storage::delete('/jadwal-icons/tk/' . basename($data->icon));

            $data->update([
                'icon' => $icon->hashName(),
                'deskripsi' => $request->deskripsi,
            ]);
        }else{
            $data->update([
                'deskripsi' => $request->deskripsi,
            ]);
        }

        return new JadwalKelompokResource($data);
    }

    public function destroy($id)
    {
        $data = JadwalKelompok::find($id);
        if (!$data) {
            return JadwalKelompokResource::notFoundResponse();
        }

        Storage::delete('/jadwal-icons/tk/' . basename($data->icon));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Jadwal TK data deleted successfully',
        ]);
    }
}
