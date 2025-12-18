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

    public function index(Request $request)
    {
        $this->ensureSuperuser($request);

        $admins = User::where('role_id', 2)->get();
        return response()->json($admins);
    }

    public function store(Request $request)
    {
        $this->ensureSuperuser($request);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 2,
        ]);

        return response()->json(['message'=>'Admin created', 'data'=>$admin], 201);
    }

    public function update(Request $request, $id)
    {
        $this->ensureSuperuser($request);

        $admin = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required','email', Rule::unique('users','email')->ignore($admin->id)],
            'password' => 'nullable|string|min:8',
        ]);

        $admin->name = $request->name;
        $admin->email = $request->email;
        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }
        $admin->role_id = 2;
        $admin->save();

        return response()->json(['message'=>'Admin updated','data'=>$admin]);
    }

    public function destroy(Request $request, $id)
    {
        $this->ensureSuperuser($request);

        $admin = User::findOrFail($id);

        // jangan biarkan superuser menghapus dirinya sendiri (atau hapus superuser)
        if ($admin->role_id == 1) {
            return response()->json(['message'=>'Cannot delete superuser'], 403);
        }
        if ($request->user()->id == $admin->id) {
            return response()->json(['message'=>'Cannot delete yourself'], 403);
        }

        $admin->delete();
        return response()->json(['message'=>'Admin deleted']);
    }
}
