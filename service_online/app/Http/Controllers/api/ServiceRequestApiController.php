<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ServiceRequest;
use Illuminate\Support\Facades\Storage;
use App\Helpers\DistanceHelper;
class ServiceRequestApiController extends Controller
{
    public function index(Request $request)
    {
        // optional: filter status / search
        $q = ServiceRequest::query();
        if ($request->filled('status')) {
            $q->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $q->where(function($qq) use ($request) {
                $qq->where('nama_pemilik', 'like', '%' . $request->search . '%')
                   ->orWhere('no_telp', 'like', '%' . $request->search . '%');
            });
        }
        $data = $q->orderBy('created_at','desc')->get();
        return response()->json($data);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:disetujui,ditolak'
        ]);

        $user = $request->user();
        if (!in_array($user->role_id, [1,2])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $sr = ServiceRequest::findOrFail($id);

        $sr->status = $request->status;
        $sr->save();

        return response()->json([
            'message' => 'Status berhasil diperbarui',
            'data' => $sr
        ]);
    }

    public function store(Request $request)
{
    $request->validate([
        'nama_pemilik'     => 'required|string|max:255',
        'no_telp'          => 'required|string|max:20',
        'alamat'           => 'required|string',
        'link_gmaps'       => 'nullable|url',
        'latitude'         => 'required|numeric',
        'longitude'        => 'required|numeric',
        'tanggal_service'  => 'required|date',
        'jam_service'      => 'required',
        'keterangan'       => 'required|string',
        'bukti_transfer'   => 'required|image|mimes:jpg,jpeg,png|max:2048', // wajib upload gambar bukti
    ]);

    $officeLat = -7.123456;
    $officeLon = 110.123456;

    $distance = DistanceHelper::calculateDistance(
        $officeLat,
        $officeLon,
        $request->latitude,
        $request->longitude
    );

    if ($distance > 20) {
        return response()->json([
            'message'   => 'Maaf, lokasi Anda di luar jangkauan layanan (lebih dari 20 km).',
            'jarak_km'  => round($distance, 2)
        ], 422);
    }

    $path = $request->file('bukti_transfer')->store('bukti_transfer', 'public');

    $data = ServiceRequest::create([
        'nama_pemilik'     => $request->nama_pemilik,
        'no_telp'          => $request->no_telp,
        'alamat'           => $request->alamat,
        'link_gmaps'       => $request->link_gmaps,
        'latitude'         => $request->latitude,
        'longitude'        => $request->longitude,
        'tanggal_service'  => $request->tanggal_service,
        'jam_service'      => $request->jam_service,
        'keterangan'       => $request->keterangan,
        'bukti_transfer'   => $path,
        'jarak_km'         => round($distance, 2), // biar bisa ditampilkan di dashboard
    ]);

    return response()->json([
        'message' => 'Permintaan service berhasil dikirim dan sedang menunggu konfirmasi.',
        'data'    => $data
    ], 201);
}
}