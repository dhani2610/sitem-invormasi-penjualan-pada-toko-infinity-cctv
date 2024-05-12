<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Lapotan {{ ($breadcumb ?? '') }}</title>
</head>
<body>
  <table style="width:100%">
    <tr>
      <th rowspan="3">
        {{-- <img src="img/IMG_4349.png"  alt=""> --}}
      </th>
    </tr>
    <tr>
      <td>
        <center>
        <b>
      PEMERINTAH KOTA BANJARMASIN <br>
      DINAS KEBUDAYAAN DAN KEPEMUDAAN <br>
        OLAHRAGA DAN PARIWISATA KOTA BANJARMASIN
      </b>
          </center>
      </td>
    </tr>
    <tr>
      <td>
       <center>
      Alamat: Jl.Pangeran Hidayatullah (Lingkar Benua Anyar) Banjarmasin <br>
      Telp./Fax. (0511) 3201350
      </center>
      </td>
    </tr>
    <tr>
      
    </tr>
  </table>
  <hr>
  <center>
    <h3>Laporan {{ ($breadcumb ?? '') }}</h3>
  </center>
    <br>
    <table border="1" width="100%">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Harga Pokok</th>
              <th>Harga Eceran</th>
              <th>Harga Grosir</th>
              <th>Stok</th>
              <th>Min Stok</th>
            </tr>
          </thead>
          <tbody>

            @foreach ($barang as $item)
              <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item->kode_barang }}</td>
                <td>{{ $item->nama_barang }}</td>
                <td>{{ $item->kategori }}</td>
                <td>@currency($item->harga_pokok)</td>
                <td>@currency($item->harga_eceran)</td>
                <td>@currency($item->harga_grosir)</td>
                <td>{{ $item->stok - $item->totalJual() }}</td>
                <td>{{ $item->min_stok }}</td>
              </tr>
            @endforeach
          </tbody>
    </table>
    <br>
    <br>
    <div style="width: 30%; text-align: left; float: right;">Banjarmasin, 20 Januari 2020</div><br><br><br><br><br><br>
    <div style="width: 30%; text-align: left; float: right;">Roenissa, S.STP.,MIP <br>NIP. 19800328 199810 2 001</div>
</body>
</html>