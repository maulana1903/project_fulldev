<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceRequest;
use App\Helpers\DistanceHelper;

class ClientServiceController extends Controller
{
    public function create()
    {
        return view('client.form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_pemilik' => 'required|string|max:100',
            'no_telp' => 'required|string|max:20',
            'alamat' => 'required|string',
            'link_gmaps' => 'required|url',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'tanggal_service' => 'required|date',
            'jam_service' => 'required',
            'keterangan' => 'required|string',
            'bukti_transfer' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        $distance = DistanceHelper::calculateDistance(
            env('OFFICE_LAT'),
            env('OFFICE_LNG'),
            $request->latitude,
            $request->longitude
        );

        if ($distance > env('MAX_DISTANCE_KM')) {
            return back()->withErrors([
                'link_gmaps' => 'Lokasi melebihi 20 km dari kantor service.'
            ])->withInput();
        }

        // Simpan file bukti transfer
        $path = $request->file('bukti_transfer')->store('bukti_transfer', 'public');

        ServiceRequest::create([
            'nama_pemilik' => $request->nama_pemilik,
            'no_telp' => $request->no_telp,
            'alamat' => $request->alamat,
            'link_gmaps' => $request->link_gmaps,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'tanggal_service' => $request->tanggal_service,
            'jam_service' => $request->jam_service,
            'keterangan' => $request->keterangan,
            'bukti_transfer' => $path,
        ]);

        return redirect()->back()->with('success', 'Permintaan service berhasil dikirim!');
    }
}
