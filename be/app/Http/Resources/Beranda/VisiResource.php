<?php

namespace App\Http\Resources\Beranda;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VisiResource extends JsonResource
{

    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'visi_description' => $this->visi_description,
        ];
    }


    public function with(Request $request)
    {
        if ($this instanceof ResourceCollection) {
            return [
                'status' => true,
                'message' => 'Data Visi Berhasil Diambil',
            ];
        }

        return [
            'status' => true,
            'message' => 'Data Visi Sukses Diedit',
        ];
    }
}
