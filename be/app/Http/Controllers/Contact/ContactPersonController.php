<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact\ContactPerson;
use App\Http\Resources\Contact\ContactPersonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactPersonController extends Controller
{
    public function index()
    {
        $data = ContactPerson::all();
        return ContactPersonResource::collection($data);
    }

    public function show($id)
    {
        $data = ContactPerson::find($id);
        if (!$data) {
            return ContactPersonResource::notFoundResponse();
        }

        return new ContactPersonResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomor' => 'required|string',
            'nama' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ContactPersonResource::validationErrorResponse($validator);
        }

        $data = ContactPerson::create([
            'nomor' => $request->nomor,
            'nama' => $request->nama,
        ]);

        return new ContactPersonResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = ContactPerson::find($id);
        if (!$data) {
            return ContactPersonResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'nomor' => 'sometimes|string',
            'nama' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return ContactPersonResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new ContactPersonResource($data);
    }

    public function destroy($id)
    {
        $data = ContactPerson::find($id);
        if (!$data) 
            return ContactPersonResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Contact Person data deleted successfully',
        ]);
    }
}
