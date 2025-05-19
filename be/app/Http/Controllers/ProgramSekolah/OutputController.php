<?php

namespace App\Http\Controllers\ProgramSekolah;

use App\Http\Controllers\Controller;
use App\Models\ProgramSekolah\Output;
use App\Http\Resources\ProgramSekolah\OutputResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OutputController extends Controller
{
    public function index()
    {
        $data = Output::all();
        return OutputResource::collection($data);
    }

    public function show($id)
    {
        $data = Output::find($id);
        if (!$data) {
            return OutputResource::notFoundResponse();
        }

        return new OutputResource($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'output_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return OutputResource::validationErrorResponse($validator);
        }

        $data = Output::create([
            'output_description' => $request->output_description,
        ]);

        return new OutputResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Output::find($id);
        if (!$data) {
            return OutputResource::notFoundResponse();
        }

        $validator = Validator::make($request->all(), [
            'output_description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return OutputResource::validationErrorResponse($validator);
        }

        $data->update($request->all());

        return new OutputResource($data);
    }

    public function destroy($id)
    {
        $data = Output::find($id);
        if (!$data) 
            return OutputResource::notFoundResponse();
        
        $data->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Data Output yang Dihasilkan deleted successfully',
        ]);
    }
}
