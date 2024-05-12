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
      Sistem Informasi Toko Invinity CCTV
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
    <h5>Filter : {{ Request::get('start_date') - Request::get('end_date') }}</h5>
    <h3>Laporan {{ ($breadcumb ?? '') }}</h3>
  </center>
    <br>
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Kategori</th>
          <th>Nama Barang</th>
          <th>Merk</th>
          <th>Warna</th>
          <th>Dimensi</th>
          <th>Spek</th>
          <th>Harga Beli</th>
          <th>Harga Jual</th>
          <th>Satuan Barang</th>
          <th>Stok</th>
        </tr>
      </thead>
      <tbody>

        @foreach ($barang as $item)
          <tr>
            <td>{{ $loop->iteration }}</td>
            <td>{{ $item->nama_kategori }}</td>
            <td>{{ $item->nama_barang }}</td>
            <td>{{ $item->merk }}</td>
            <td>{{ $item->warna }}</td>
            <td>{{ $item->dimensi }}</td>
            <td>{{ $item->spek }}</td>
            <td>@currency($item->harga_jual)</td>
            <td>@currency($item->harga_beli)</td>
            <td>{{ $item->satuan_barang }}</td>
            <td>{{ $item->stok }}</td>
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