<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SuperUserController extends Controller
{
    
    // tampilkan semua user termasuk admin
    public function index()
    {
        $users = User::all();
        return view('superuser.index', compact('users'));
    }

    // form edit user
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('superuser.edit', compact('user'));
    }

    // update user (termasuk admin)
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'nullable|string|min:6',
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return redirect()->route('superuser.index')->with('success', 'Data user berhasil diperbarui.');
    }

    public function create()
{
    $roles = [
        1 => 'Superuser',
        2 => 'Admin'
    ];
    return view('superuser.create', compact('roles'));
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:8|confirmed',
        'role_id' => 'required|in:1,2',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role_id' => $request->role_id,
    ]);

    return redirect()->route('superuser.index')->with('success', 'User berhasil ditambahkan!');
}
    public function destroy($id)
{
    $user = User::findOrFail($id);

    // Pastikan superuser tidak bisa hapus dirinya sendiri
    if (auth()->id() == $user->id) {
        return redirect()->back()->with('error', 'Tidak dapat menghapus akun Anda sendiri.');
    }

    $user->delete();

    return redirect()->route('superuser.index')->with('success', 'User berhasil dihapus.');
}

}
