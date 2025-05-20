<?php

namespace App\Http\Resources\Jadwal\KB;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class JadwalKegiatankbResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return[
            'id'=>$this->id,
            'icon'=>$this->icon,
            'deskripsi'=>$this->deskripsi,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
        ];
    }

    public function with(Request $request)
    {
        if ($this instanceof ResourceCollection) {
            return [
                'status' => true,
                'message' => 'Jadwal KB data retrieved successfully',
            ];
        }

        return [
            'status' => true,
            'message' => 'Success',
        ];
    }
    public static function notFoundResponse($message = 'Jadwal KB data not found')
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
}
