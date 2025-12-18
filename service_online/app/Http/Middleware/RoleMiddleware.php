<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        $user = Auth::user();

        // 1) Jika kolom role langsung menyimpan string (misal 'admin')
        if (is_string($user->role) && $user->role !== '') {
            $userRole = $user->role;
        }
        // 2) Jika role() adalah relasi dan mengembalikan model Role
        elseif (is_object($user->role) && isset($user->role->name)) {
            $userRole = $user->role->name;
        }
        // 3) Fallback: kalau ada role_id, cari di tabel roles
        elseif (!empty($user->role_id)) {
            $roleModel = Role::find($user->role_id);
            $userRole = $roleModel->name ?? null;
        } else {
            $userRole = null;
        }

        if ($userRole && in_array($userRole, $roles)) {
            return $next($request);
        }

        abort(403, 'Akses ditolak — Anda tidak punya izin untuk halaman ini.');
    }
}
