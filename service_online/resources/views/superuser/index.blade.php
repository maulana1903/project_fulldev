@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Daftar User</h2>

    @if(session('success'))
        <div style="color: green">{{ session('success') }}</div>
    @endif

    <a href="{{ route('superuser.create') }}">Tambah User Baru</a>

    <table border="1" cellpadding="8" cellspacing="0" style="margin-top: 20px; width: 100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->role }}</td>
                    <td>
    <a href="{{ route('superuser.edit', $user->id) }}" class="btn btn-warning btn-sm">Edit</a>
    <form action="{{ route('superuser.destroy', $user->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Yakin ingin menghapus user ini?')">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
    </form>
</td>

                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
