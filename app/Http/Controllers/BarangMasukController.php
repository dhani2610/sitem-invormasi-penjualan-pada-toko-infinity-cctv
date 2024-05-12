<?php

namespace App\Http\Controllers;

use App\Models\BarangMasuk;
use App\Models\DataBarang;
use App\Models\MasterBarang;
use Illuminate\Http\Request;
use DB;

class BarangMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['page_title'] = 'Barang Masuk';
        $data['breadcumb'] = 'Barang Masuk';
        $data['barangIn'] = DB::table('barang_masuks')
        ->join('master_barangs', 'master_barangs.id', '=', 'barang_masuks.id_barang')
        ->select('barang_masuks.*','master_barangs.nama_barang as nama_barang')
        ->get();
        // dd($data['barangIn']);
        $data['barang'] = MasterBarang::orderby('id', 'asc')->get();


        return view('barang-masuk.index', $data); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validateData = $request->validate([
            'id_barang' => 'required',
            'stok' => 'required',
        ]);

        $data = new BarangMasuk();
        $data->id_barang = $validateData['id_barang'];
        $data->stok = $validateData['stok'];

        $stok = MasterBarang::find($request->id_barang)->stok;
        if ($data->save()) {
            $barang = MasterBarang::find($request->id_barang);
            $barang->stok = $stok + $validateData['stok'];
            $barang->save();
        }

        return redirect()->back()->with(['success' => ' successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BarangMasuk  $barangMasuk
     * @return \Illuminate\Http\Response
     */
    public function show(BarangMasuk $barangMasuk)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BarangMasuk  $barangMasuk
     * @return \Illuminate\Http\Response
     */
    public function edit(BarangMasuk $barangMasuk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BarangMasuk  $barangMasuk
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BarangMasuk $barangMasuk)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BarangMasuk  $barangMasuk
     * @return \Illuminate\Http\Response
     */
    public function destroy(BarangMasuk $barangMasuk)
    {
        //
    }
}
