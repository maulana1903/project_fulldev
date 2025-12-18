<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Manajemen Admin - Superuser</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .btn { padding: 6px 12px; border: none; cursor: pointer; border-radius: 5px; }
        .btn-edit { background-color: #007bff; color: white; }
        .btn-delete { background-color: #dc3545; color: white; }
    </style>
</head>
<body>
    <h2>Manajemen Admin</h2>

    @if(session('success'))
        <p style="color:green;">{{ session('success') }}</p>
    @endif

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($admins as $index => $admin)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $admin->name }}</td>
                    <td>{{ $admin->email }}</td>
                    <td>
                        <a href="{{ route('superuser.admins.edit', $admin->id) }}" class="btn btn-edit">Edit</a>
                        <form action="{{ route('superuser.admins.destroy', $admin->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button class="btn btn-delete" onclick="return confirm('Yakin hapus admin ini?')">Hapus</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
