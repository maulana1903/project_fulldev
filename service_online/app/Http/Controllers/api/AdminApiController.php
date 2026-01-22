<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminApiController extends Controller
{
   protected function ensureSuperuser(Request $request)
    {
        $user = $request->user();
        if (!$user || $user->role_id != 1) {
            abort(response()->json(['message'=>'Forbidden - superuser only'], 403));
        }
    }

    public function show(Request $request, $id)
    {
    $this->ensureSuperuser($request);

    $admin = User::findOrFail($id);
    return response()->json($admin);
    }
    public function index(Request $request)
    {
        $this->ensureSuperuser($request);

        $admins = User::all();
        return response()->json($admins);
    }

    public function store(Request $request)
    {
    $userLogin = $request->user();

    if ($userLogin->role_id != 1) {
        return response()->json(['message'=>'Forbidden'], 403);
    }

    if (
        $request->role_id == 1 &&
        !$userLogin->is_root
    ) {
        return response()->json([
            'message' => 'Hanya Kepala IT yang boleh menambahkan superadmin'
        ], 403);
    }

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
        'jabatan' => 'required|string|max:255',
        'role_id' => 'required|in:1,2'
    ]);
     $roleName = match ((int) $request->role_id) {
        1 => 'SuperAdmin',
        2 => 'Admin',
    };
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'jabatan' => $request->jabatan,
        'role_id' => $request->role_id,
        'role' => $roleName,
        'is_root' => false
    ]);

    return response()->json([
        'message' => 'User created',
        'data' => $user
    ], 201);
    }


    public function update(Request $request, $id)
    {
    $userLogin = $request->user();
    $admin = User::findOrFail($id);

    // ❌ superadmin biasa tidak boleh edit superadmin lain
    if (
        $admin->role_id == 1 &&
        !$userLogin->is_root &&
        $admin->id !== $userLogin->id
    ) {
        return response()->json([
            'message' => 'Anda hanya boleh mengedit akun Anda sendiri'
        ], 403);
    }

    // ❌ non-root tidak boleh mengubah role menjadi superadmin
    if ($request->role_id == 1 && !$userLogin->is_root) {
        return response()->json([
            'message' => 'Hanya Kepala IT yang boleh mengubah role menjadi SuperAdmin'
        ], 403);
    }

    $data = $request->validate([
        'name' => [
            'required',
            Rule::unique('users', 'name')->ignore($id),
        ],
        'email' => [
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($id),
        ],
        'jabatan' => 'nullable|string|max:255',
        'role_id' => 'required|in:1,2',
        'password' => 'nullable|min:6',
    ]);

    // 🔐 mapping role otomatis
    $data['role'] = match ((int) $data['role_id']) {
        1 => 'SuperAdmin',
        2 => 'Admin',
    };

    // 🔑 password optional
    if (!empty($data['password'])) {
        $data['password'] = Hash::make($data['password']);
    } else {
        unset($data['password']);
    }

    $admin->update($data);

    return response()->json([
        'message' => 'User berhasil diupdate'
    ]);
    }



    public function destroy(Request $request, $id)
    {
    $userLogin = $request->user();
    $target = User::findOrFail($id);

    if ($userLogin->id === $target->id) {
        return response()->json([
            'message' => 'Tidak boleh menghapus akun sendiri'
        ], 403);
    }

    if ($userLogin->role_id != 1) {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    if ($target->role_id == 1 && !$userLogin->is_root) {
        return response()->json([
            'message' => 'Hanya Kepala IT yang boleh menghapus superadmin'
        ], 403);
    }

    $target->delete();

    return response()->json(['message' => 'User deleted']);
    }
}
