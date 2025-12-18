<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;

class ServiceRequestAdminController extends Controller
{
public function index(Request $request)
{
    $query = \App\Models\ServiceRequest::query();

    // Filter status
    if ($request->has('status') && $request->status != '') {
        $query->where('status', $request->status);
    }

    // Search (nama pemilik atau no telp)
    if ($request->has('search') && $request->search != '') {
        $query->where(function ($q) use ($request) {
            $q->where('nama_pemilik', 'like', '%' . $request->search . '%')
              ->orWhere('no_telp', 'like', '%' . $request->search . '%');
        });
    }

    $requests = $query->orderBy('created_at', 'desc')->get();

    return view('admin.index', compact('requests'));
}
    public function reject($id)
    {
        $req = ServiceRequest::findOrFail($id);
        $req->status = 'ditolak';
        $req->save();

        return redirect()->back()->with('error', '❌ Permintaan ditolak.');
    }
}
