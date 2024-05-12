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
              <th>Tanggal</th>
              <th>Nama Barang</th>
              <th>Harga Pokok</th>
              <th>Harga Jual</th>
              <th>Jumlah Beli</th>
              <th>Total</th>
              <th>Keuntungan Perunit</th>
              <th>Keuntungan Bersih</th>
            </tr>
          </thead>
          <tbody>
            @php
                $total = 0;
            @endphp
            @foreach ($labaRugi as $item)
               @php
                  $total +=  intval( $items['keuntungan_bersih'] ?? "0");
              @endphp
              <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item['tanggal'] }}</td>
                <td>{{ $item['nama_barang'] }}</td>
                <td>@currency($item['harga_pokok'])</td>
                <td>@currency($item['harga_jual'])</td>
                <td>{{ $item['jumlah_terjual'] }}</td>
                <td>@currency($item['total'])</td>
                <td>@currency($item['keuntungan_perunit'])</td>
                <td>@currency($item['keuntungan_bersih'])</td>
              </tr>
            @endforeach
               <tr>
                <td colspan="8">
                <center>
                  Total Keuntungan
                </center>
                </td>
                <td>@currency($total)</td>
              </tr>
          </tbody>
    </table>
    <br>
    <br>
    <div style="width: 30%; text-align: left; float: right;">Banjarmasin, 20 Januari 2020</div><br><br><br><br><br><br>
    <div style="width: 30%; text-align: left; float: right;">Roenissa, S.STP.,MIP <br>NIP. 19800328 199810 2 001</div>
</body>
</html>