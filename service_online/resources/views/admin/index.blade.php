<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Admin</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .btn { padding: 6px 12px; border: none; cursor: pointer; border-radius: 5px; }
        .btn-acc { background-color: #28a745; color: white; }
        .btn-reject { background-color: #dc3545; color: white; }
        .btn-wa { background-color: #25D366; color: white; text-decoration: none; padding: 6px 12px; border-radius: 5px; }
    </style>
</head>
<body>
    <h2>Daftar Pengajuan Service</h2>

    @if(session('success'))
        <p style="color:green;">{{ session('success') }}</p>
    @endif

    @if(session('error'))
        <p style="color:red;">{{ session('error') }}</p>
    @endif
    <form method="GET" action="{{ route('admin.service_requests.index') }}" style="margin-bottom: 20px; display:flex; gap:10px;">
    <input type="text" name="search" placeholder="Cari nama / no telepon" value="{{ request('search') }}">
    <select name="status">
        <option value="">Semua Status</option>
        <option value="menunggu" {{ request('status') == 'menunggu' ? 'selected' : '' }}>Menunggu</option>
        <option value="disetujui" {{ request('status') == 'disetujui' ? 'selected' : '' }}>Disetujui</option>
        <option value="ditolak" {{ request('status') == 'ditolak' ? 'selected' : '' }}>Ditolak</option>
    </select>
    <button type="submit">Filter</button>
</form>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Pemilik</th>
                <th>No. Telepon</th>
                <th>Alamat</th>
                <th>Jadwal</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($requests as $index => $req)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $req->nama_pemilik }}</td>
                    <td>{{ $req->no_telp }}</td>
                    <td>{{ $req->alamat }}</td>
                    <td>{{ $req->tanggal_service }} {{ $req->jam_service }}</td>
                    <td>
    @if($req->bukti_transfer)
        <img src="{{ asset('storage/' . $req->bukti_transfer) }}"
             alt="Bukti Transfer"
             style="width: 80px; cursor: pointer;"
             onclick="showImage('{{ asset('storage/' . $req->bukti_transfer) }}')">
    @else
        Tidak ada
    @endif
</td>

                    <td>{{ ucfirst($req->status) }}</td>
                    <td>
                        @if($req->status == 'menunggu')
                            <form action="{{ route('admin.approve', $req->id) }}" method="POST" style="display:inline;">
                                @csrf
                                <button class="btn btn-acc" type="submit">ACC</button>
                            </form>
                            <form action="{{ route('admin.reject', $req->id) }}" method="POST" style="display:inline;">
                                @csrf
                                <button class="btn btn-reject" type="submit">Tolak</button>
                            </form>
                        @endif
                        <a class="btn-wa" target="_blank" href="https://wa.me/62{{ preg_replace('/[^0-9]/', '', $req->no_telp) }}?text=Halo%20{{ urlencode($req->nama_pemilik) }},%20terkait%20pengajuan%20service%20Anda.">
                            WhatsApp
                        </a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
<div id="imageModal" style="display:none; position:fixed; z-index:9999; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.8); text-align:center;">
    <span onclick="closeModal()" style="position:absolute; top:20px; right:40px; color:white; font-size:30px; cursor:pointer;">&times;</span>
    <img id="modalImage" style="margin-top:60px; max-width:90%; max-height:80%;">
</div>

<script>
function showImage(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}
</script>

</html>
