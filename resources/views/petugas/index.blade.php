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
    <div class="card">
      <div class="card-header bg-gray1" style="border-radius:10px 10px 0px 0px;">
        <div class="row">
          <div class="col-6 mt-1">
            <span class="tx-bold text-lg text-white" style="font-size:1.2rem;">
              <i class="far fa-user text-lg"></i> 
              {{ ($breadcumb ?? '') }} List
            </span>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <a href="{{ route('petugas-create') }}" class="btn btn-md btn-info">
              <i class="fa fa-plus"></i> 
              Add New
            </a>
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
              <th>Gambar</th>
              <th>NM Member</th>
              <th>No Tlp</th>
              <th>Email</th>
              <th>NIK</th>
            </tr>
          </thead>
          <tbody>

            @foreach ($petugas as $item)
              <tr>
                <td>{{ $loop->iteration }}</td>
                <td>
                <img src="{{ asset('img/petugas/'.($item->gambar ?? 'user.png')) }}" width="40px" class="img-circle">
                </td>
                <td>{{ $item->nm_member }}</td>
                <td>{{ $item->no_tlp }}</td>
                <td>{{ $item->email }}</td>
                <td>{{ $item->nik }}</td>
                <td>
                  <div class="btn-group">
                    <a href="{{ route('petugas-edit', $item->id) }}" class="btn btn-warning text-white">
                      <i class="far fa-edit"></i>
                      Edit
                    </a>
                    <a href="{{ route('petugas-destroy', $item->id) }}" class="btn btn-danger f-12">
                      <i class="far fa-trash-alt"></i>
                      Delete
                    </a>
                  </div>
                </td>
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