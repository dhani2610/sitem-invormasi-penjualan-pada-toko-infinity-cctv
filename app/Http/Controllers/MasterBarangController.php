<?php

namespace App\Http\Controllers;

use App\Models\MasterBarang;
use App\Models\MasterKategori;
use Illuminate\Http\Request;
use DB;

class MasterBarangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['page_title'] = 'Master Barang';
        $data['breadcumb'] = 'Master Barang';

        $data['barang'] = DB::table('master_barangs')
        ->join('master_kategoris', 'master_kategoris.id', '=', 'master_barangs.id_kategori')
        ->select('master_barangs.*','master_kategoris.nama_kategori as nama_kategori')
        ->get();

        return view('barang.index', $data); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['page_title'] = 'Master Barang';
        $data['breadcumb'] = 'Master Barang';
        $data['barang'] = MasterBarang::orderby('id', 'asc')->get();
        $data['kategori'] = MasterKategori::orderby('id', 'asc')->get();

        return view('barang.create', $data); 
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
            'id_kategori' => 'required',
            'nama_barang' => 'required',
            'merk' => 'required',
            'warna' => 'required',
            'dimensi' => 'required',
            'spek' => 'required',
            'harga_beli' => 'required',
            'harga_jual' => 'required',
            'satuan_barang' => 'required',
            'stok' => 'required',
        ]);

        $data = new MasterBarang();
        $data->id_kategori = $validateData['id_kategori'];
        $data->nama_barang = $validateData['nama_barang'];
        $data->merk = $validateData['merk'];
        $data->warna = $validateData['warna'];
        $data->dimensi = $validateData['dimensi'];
        $data->spek = $validateData['spek'];
        $data->harga_beli = $validateData['harga_beli'];
        $data->harga_jual = $validateData['harga_jual'];
        $data->satuan_barang = $validateData['satuan_barang'];
        $data->stok = $validateData['stok'];
        $data->save();

        return redirect()->route('barang-list')->with(['success' => ' successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MasterBarang  $masterBarang
     * @return \Illuminate\Http\Response
     */
    public function show(MasterBarang $masterBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MasterBarang  $masterBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['page_title'] = 'Master Barang';
        $data['breadcumb'] = 'Master Barang';
        $data['barang'] = MasterBarang::find($id);
        $data['kategori'] = MasterKategori::orderby('id', 'asc')->get();

        return view('barang.edit', $data); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MasterBarang  $masterBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'id_kategori' => 'required',
            'nama_barang' => 'required',
            'merk' => 'required',
            'warna' => 'required',
            'dimensi' => 'required',
            'spek' => 'required',
            'harga_beli' => 'required',
            'harga_jual' => 'required',
            'satuan_barang' => 'required',
            'stok' => 'required',
        ]);

        $data = MasterBarang::find($id);
        $data->id_kategori = $validateData['id_kategori'];
        $data->nama_barang = $validateData['nama_barang'];
        $data->merk = $validateData['merk'];
        $data->warna = $validateData['warna'];
        $data->dimensi = $validateData['dimensi'];
        $data->spek = $validateData['spek'];
        $data->harga_beli = $validateData['harga_beli'];
        $data->harga_jual = $validateData['harga_jual'];
        $data->satuan_barang = $validateData['satuan_barang'];
        $data->stok = $validateData['stok'];
        $data->save();

        return redirect()->route('barang-list')->with(['success' => ' successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MasterBarang  $masterBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MasterBarang::find($id);
        $data->delete();

        return redirect()->route('barang-list')->with(['success' => ' successfully!']);
    }
}
