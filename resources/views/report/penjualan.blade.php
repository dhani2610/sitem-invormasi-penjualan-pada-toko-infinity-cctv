@extends('layouts.app')

@section('style')

@endsection

@section('breadcumb')
  <div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">{{ ($breadcumb ?? '') }}</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">home</li>
                    <li class="breadcrumb-item">/</li>
                    <li class="breadcrumb-item"><a href="{{ route('master-data.index') }}">Master Data</a></li>
                    <li class="breadcrumb-item">/</li>
                    <li class="breadcrumb-item active"><a href="{{ route('users.index') }}">{{ ($breadcumb ?? '') }}</a></li>
                </ol>
            </div>

        </div>
    </div>
  </div>
@endsection

@section('content')
<div class="row mt-4">
  <div class="col-12">
     <form action="" method="get">
        <div class="d-flex flex-nowrap bd-highlight">
                @csrf
                <div class="order-4 p-2 bd-highlight">
                    <a href="{{ route('laporan-penjualan-pdf', ['start_date' => Request::get('start_date'), 'end_date' => Request::get('end_date')]) }}" target="_blank" class="btn btn-success f-12">
                        <i class="fas fa-file-pdf"></i>
                        PDF
                    </a>
                </div>
                <div class="order-3 p-2 bd-highlight">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="order-2 p-2 bd-highlight">
                    <input type="date" class="form-control" name="end_date" value="{{ Request::get('end_date') }}">
                </div>
                <div class="order-1 p-2 bd-highlight">
                    <input type="date" class="form-control" name="start_date" value="{{ Request::get('start_date') }}">
                </div>
            </div>
        </form>
    <div class="card">
      <div class="card-header bg-gray1" style="border-radius:10px 10px 0px 0px;">
        <div class="row">
          <div class="col-6 mt-1">
            <span class="tx-bold text-lg text-white" style="font-size:1.2rem;">
              <i class="far fa-user text-lg"></i> 
              {{ ($breadcumb ?? '') }} List
            </span>
          </div>

        </div>

        <div class="row">
          <div class="col-6">
            @include('sweetalert::alert')
          </div>
        </div>
      </div>

      <div class="card-body">
        <table id="example" class="table table-hover table-bordered dt-responsive" style="width:100%">
            <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Barang</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
    
                @foreach ($transaksi as $item)
                  <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->nama_barang }}</td>
                    <td>{{ $item->jumlah }}</td>
                    <td>@currency($item->total)</td>
                  </tr>
                @endforeach
              </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
@endsection

@section('script')
<script>
$('#example').dataTable();
</script>
@endsection