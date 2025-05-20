<?php

namespace App\Http\Controllers\Jadwal\KB;

use App\Http\Controllers\Controller;
use App\Models\Jadwal\KB\JadwalKegiatankb;
use App\Http\Resources\Jadwal\KB\JadwalKegiatankbResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class JadwalKegiatankbController extends Controller
{
    public function index()
    {
        $data = JadwalKegiatankb::all();
        return JadwalKegiatankbResource::collection($data);
    }

    public function show($id)
    {
        $data = JadwalKegiatankb::find($id);
        if (!$data) {
            return JadwalKegiatankbResource::notFoundResponse();
        }

        return new JadwalKegiatankbResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'deskripsi' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return JadwalKegiatankbResource::validationErrorResponse($validator);
        }

        $data = $request->file('icon');
        $data->storeAs('/jadwal-icons/kb/', $data->hashName());

        $datas = JadwalKegiatankb::create([
            'icon' => $data->hashName(),
            'deskripsi' => $request->deskripsi,
        ]);
        return new JadwalKegiatankbResource($datas);
    }

    public function update(Request $request, $id)
    {
        $data = JadwalKegiatankb::find($id);
        if (!$data) {
            return JadwalKegiatankbResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'deskripsi' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return JadwalKegiatankbResource::validationErrorResponse($validator);
        }

        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $icon->storeAs('/jadwal-icons/kb/', $icon->hashName());
            Storage::delete('/jadwal-icons/kb/' . basename($data->icon));

            $data->update([
                'icon' => $icon->hashName(),
                'deskripsi' => $request->deskripsi,
            ]);
        }else{
            $data->update([
                'deskripsi' => $request->deskripsi,
            ]);

        }
        return new JadwalKegiatankbResource($data);
    }

    public function destroy($id)
    {
        $data = JadwalKegiatankb::find($id);
        if (!$data) {
            return JadwalKegiatankbResource::notFoundResponse();
        }

        Storage::delete('/jadwal-icons/kb/' . basename($data->icon));
        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Jadwal KB data deleted successfully',
        ]);
    }
}
