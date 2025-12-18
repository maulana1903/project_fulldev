<!DOCTYPE html>
<html>
<head>
    <title>Register Admin</title>
</head>
<body>
    <h2>Register Admin Baru (oleh Superuser)</h2>

    @if(session('success'))
        <p style="color:green;">{{ session('success') }}</p>
    @endif

    @if($errors->any())
        <div style="color:red;">
            <ul>
                @foreach($errors->all() as $err)
                    <li>{{ $err }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ url('/register-admin') }}">
        @csrf

        <label>Nama:</label><br>
        <input type="text" name="name" value="{{ old('name') }}"><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" value="{{ old('email') }}"><br><br>

        <label>Password:</label><br>
        <input type="password" name="password"><br><br>

        <label>Confirm Password:</label><br>
        <input type="password" name="password_confirmation"><br><br>

        <button type="submit">Buat Admin</button>
    </form>

    <p><a href="{{ url('/dashboard') }}">Kembali ke Dashboard</a></p>
</body>
</html>
