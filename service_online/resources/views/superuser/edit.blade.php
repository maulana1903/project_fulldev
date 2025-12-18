@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Edit User</h2>

    <form action="{{ route('superuser.update', $user->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label>Nama:</label><br>
        <input type="text" name="name" value="{{ $user->name }}" required><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" value="{{ $user->email }}" required><br><br>

        <label>Password (biarkan kosong jika tidak diubah):</label><br>
        <input type="password" name="password"><br><br>

        <button type="submit">Simpan Perubahan</button>
    </form>
</div>
@endsection
