<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // 🔹 Form registrasi admin
    public function showRegisterForm()
    {
        return view('register-admin');
    }

    // 🔹 Proses tambah admin baru
    public function registerAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        $role = Role::where('name', 'admin')->first();

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        return redirect('/dashboard')->with('success', 'Admin berhasil dibuat!');
    }

     public function index()
    {
        $admins = User::whereHas('role', fn($q) => $q->where('name', 'admin'))->get();
        return view('superuser.admins', compact('admins'));
    }

    public function edit($id)
    {
        $admin = User::findOrFail($id);
        return view('superuser.edit-admin', compact('admin'));
    }

    public function update(Request $request, $id)
    {
        $admin = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $admin->id,
            'password' => 'nullable|min:8',
        ]);

        $admin->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $admin->password,
        ]);

        return redirect()->route('superuser.admins.index')->with('success', 'Admin berhasil diperbarui!');
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('superuser.admins.index')->with('success', 'Admin berhasil dihapus!');
    }
}
