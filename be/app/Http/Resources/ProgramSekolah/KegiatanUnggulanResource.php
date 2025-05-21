<?php

namespace App\Http\Resources\ProgramSekolah;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class KegiatanUnggulanResource extends JsonResource
{  
    public function toArray(Request $request)
    {
        return[
            'id'=>$this->id,
            'nama_kegiatan'=>$this->nama_kegiatan,
            'icon'=>$this->icon,
            'deskripsi_kegiatan'=>$this->deskripsi_kegiatan,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
        ];
    }

    public function with(Request $request)
    {
        if ($this instanceof ResourceCollection) {
            return [
                'status' => true,
                'message' => 'Kegiatan Unggulan data retrieved successfully',
            ];
        }

        return [
            'status' => true,
            'message' => 'Success',
        ];
    }
    public static function notFoundResponse($message = 'Kegiatan Unggulan data not found')
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], 404);
    }

    public static function validationErrorResponse($validator)
    {
        return response()->json([
            'status' => false,
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
        ], 422);
    }
};
