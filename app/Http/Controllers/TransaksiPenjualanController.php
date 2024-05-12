<?php

namespace App\Http\Controllers;

use App\Models\DataPelanggan;
use App\Models\MasterBarang;
use App\Models\TransaksiPenjualan;
use Illuminate\Http\Request;
use DB;

class TransaksiPenjualanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['page_title'] = 'Transaksi Penjualan';
        $data['breadcumb'] = 'Transaksi Penjualan';

        $data['transaksi'] = DB::table('transaksi_penjualans')
        ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
        ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
        ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
        ->get();

        return view('transaksi.index', $data); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['page_title'] = 'Transaksi Penjualan';
        $data['breadcumb'] = 'Transaksi Penjualan';
        $data['barang'] = MasterBarang::orderby('id', 'asc')->get();
        $data['pelanggan'] = DataPelanggan::orderby('id', 'asc')->get();

        return view('transaksi.create', $data); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'id_barang' => 'required',
            'id_member' => 'required',
            'jumlah' => 'required',
        ]);

        $barang = MasterBarang::find($request->id_barang);
        $getHargaJual = $barang->harga_jual;
        $getStok = $barang->stok;

        $getTotalTerjual = TransaksiPenjualan::where('id_barang',$request->id_barang)->sum('jumlah');
        $sisaStok = $getStok - $getTotalTerjual;

        if ($sisaStok == 0) {
            return redirect()->route('barang-list')->with(['success' => ' Maaf Stok barang ini telah habis!']);
        }
        if ($request->jumlah > $sisaStok) {
            return redirect()->route('barang-list')->with(['success' => ' Maaf Jumlah Melebihi Stok!']);
        }


        $data = new TransaksiPenjualan();
        $data->id_barang = $validateData['id_barang'];
        $data->id_member = $validateData['id_member'];
        $data->jumlah = $validateData['jumlah'];
        $data->total = $getHargaJual * $validateData['jumlah'];
        $data->created_at = date('Y-m-d');
        $data->save();

        return redirect()->route('transaksi-list')->with(['success' => ' successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransaksiPenjualan  $transaksiPenjualan
     * @return \Illuminate\Http\Response
     */
    public function show(TransaksiPenjualan $transaksiPenjualan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TransaksiPenjualan  $transaksiPenjualan
     * @return \Illuminate\Http\Response
     */
    public function edit(TransaksiPenjualan $transaksiPenjualan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TransaksiPenjualan  $transaksiPenjualan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TransaksiPenjualan $transaksiPenjualan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransaksiPenjualan  $transaksiPenjualan
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransaksiPenjualan $transaksiPenjualan)
    {
        //
    }
}
