<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_pemilik',
        'no_telp',
        'alamat',
        'link_gmaps',
        'latitude',
        'longitude',
        'tanggal_service',
        'jam_service',
        'keterangan',
        'bukti_transfer',
        'status', // optional, karena default sudah 'menunggu'
    ];
}
