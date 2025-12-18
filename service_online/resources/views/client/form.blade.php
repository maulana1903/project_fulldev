<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Form Service Online</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        #map { height: 300px; width: 100%; margin-bottom: 20px; }
    </style>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>
    <h2>Form Pengajuan Service Online</h2>

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

    <form action="{{ route('client.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <label>Nama Pemilik / Penanggung Jawab:</label><br>
        <input type="text" name="nama_pemilik" value="{{ old('nama_pemilik') }}"><br><br>

        <label>No. Telepon / WhatsApp:</label><br>
        <input type="text" name="no_telp" value="{{ old('no_telp') }}"><br><br>

        <label>Alamat Lengkap:</label><br>
        <textarea name="alamat">{{ old('alamat') }}</textarea><br><br>

        <label>Link Google Maps:</label><br>
        <input type="url" name="link_gmaps" value="{{ old('link_gmaps') }}"><br><br>
        <label>Pilih Lokasi di Peta:</label><br>
        <div id="map"></div>
        <label>Latitude:</label><br>
        <input type="text" name="latitude" value="{{ old('latitude') }}"><br><br>

        <label>Longitude:</label><br>
        <input type="text" name="longitude" value="{{ old('longitude') }}"><br><br>

        <label>Tanggal Service:</label><br>
        <input type="date" name="tanggal_service" value="{{ old('tanggal_service') }}"><br><br>

        <label>Jam Service:</label><br>
        <input type="time" name="jam_service" value="{{ old('jam_service') }}"><br><br>

        <label>Keterangan Kerusakan:</label><br>
        <textarea name="keterangan">{{ old('keterangan') }}</textarea><br><br>

        <label>Upload Bukti Transfer (jpg/png maks 2MB):</label><br>
        <input type="file" name="bukti_transfer" accept="image/*"><br><br>

        <button type="submit" id="btnSubmit">Kirim Permintaan</button>
    </form>

    <script>
    const kantorLat = -7.718996012879748;
    const kantorLng = 110.74708556128061;

    const map = L.map('map').setView([kantorLat, kantorLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let marker;
    const btnSubmit = document.getElementById('btnSubmit');

    function hitungJarak(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    map.on('click', function (e) {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);

        const jarak = hitungJarak(kantorLat, kantorLng, lat, lng);

        document.querySelector('input[name="latitude"]').value = lat;
        document.querySelector('input[name="longitude"]').value = lng;


        if (marker) map.removeLayer(marker);


        marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`Lokasi Anda<br>Lat: ${lat}<br>Lng: ${lng}<br>Jarak: ${jarak.toFixed(2)} km`)
            .openPopup();


        if (jarak > 20) {
            alert(`❌ Lokasi terlalu jauh (${jarak.toFixed(2)} km). Maksimal 20 km dari kantor.`);
            btnSubmit.disabled = true;
            btnSubmit.style.backgroundColor = '#ccc';
        } else {
            btnSubmit.disabled = false;
            btnSubmit.style.backgroundColor = '';
        }
    });
</script>


</body>
</html>
