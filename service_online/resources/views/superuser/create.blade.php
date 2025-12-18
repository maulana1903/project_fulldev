<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah User Baru</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        label { display:block; margin-top:10px; }
        input, select { width: 100%; padding:8px; margin-top:5px; }
        button { margin-top:15px; padding:10px 15px; background-color:#28a745; color:white; border:none; border-radius:5px; cursor:pointer; }
        a { text-decoration:none; color:#007bff; }
    </style>
</head>
<body>
    <h2>Tambah User Baru</h2>
<a href="{{ route('superuser.create') }}" style="display:inline-block; padding:8px 12px; background:#007bff; color:white; border-radius:5px; text-decoration:none;">+ Tambah User</a>
    @if ($errors->any())
        <div style="color:red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('superuser.store') }}" method="POST">
        @csrf
        <label>Nama Lengkap:</label>
        <input type="text" name="name" value="{{ old('name') }}" required>

        <label>Email:</label>
        <input type="email" name="email" value="{{ old('email') }}" required>

        <label>Password:</label>
        <input type="password" name="password" required>

        <label>Konfirmasi Password:</label>
        <input type="password" name="password_confirmation" required>

        <label>Role:</label>
        <select name="role_id" required>
            <option value="">-- Pilih Role --</option>
            @foreach($roles as $id => $role)
                <option value="{{ $id }}" {{ old('role_id') == $id ? 'selected' : '' }}>
                    {{ $role }}
                </option>
            @endforeach
        </select>

        <button type="submit">Simpan</button>
    </form>

    <p><a href="{{ route('superuser.index') }}">← Kembali ke Daftar User</a></p>
</body>
</html>
