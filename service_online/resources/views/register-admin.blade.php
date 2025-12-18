<!DOCTYPE html>
<html>
<head>
    <title>Register Admin</title>
</head>
<body>
    <h1>Daftar Admin Baru</h1>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    @if ($errors->any())
        <ul style="color:red;">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('register.admin.post') }}" method="POST">
        @csrf
        <label>Nama:</label><br>
        <input type="text" name="name" required><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Buat Admin</button>
    </form>
</body>
</html>