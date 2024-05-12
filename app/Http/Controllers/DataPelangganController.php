<?php

namespace App\Http\Controllers;

use App\Models\DataPelanggan;
use Illuminate\Http\Request;

class DataPelangganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['page_title'] = 'Pelanggan';
        $data['breadcumb'] = 'Pelanggan';
        $data['pelanggan'] = DataPelanggan::orderby('id', 'asc')->get();

        return view('data-pelanggan.index', $data); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['page_title'] = 'Pelanggan';
        $data['breadcumb'] = 'Pelanggan';
        $data['pelanggan'] = DataPelanggan::orderby('id', 'asc')->get();

        return view('data-pelanggan.create', $data); 
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
            'nama_pelanggan' => 'required',
            'alamat' => 'required',
            'no_tlp' => 'required',
        ]);

    

        $data = new DataPelanggan();
        $data->nama_pelanggan = $validateData['nama_pelanggan'];
        $data->alamat = $validateData['alamat'];
        $data->no_tlp = $validateData['no_tlp'];
        $data->save();

        return redirect()->route('pelanggan-list')->with(['success' => ' successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DataPelanggan  $dataPelanggan
     * @return \Illuminate\Http\Response
     */
    public function show(DataPelanggan $dataPelanggan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DataPelanggan  $dataPelanggan
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['page_title'] = 'Pelanggan';
        $data['breadcumb'] = 'Pelanggan';
        $data['pelanggan'] = DataPelanggan::find($id);

        return view('data-pelanggan.edit', $data); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DataPelanggan  $dataPelanggan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'nama_pelanggan' => 'required',
            'alamat' => 'required',
            'no_tlp' => 'required',
        ]);

    

        $data = DataPelanggan::find($id);
        $data->nama_pelanggan = $validateData['nama_pelanggan'];
        $data->alamat = $validateData['alamat'];
        $data->no_tlp = $validateData['no_tlp'];
        $data->save();

        return redirect()->route('pelanggan-list')->with(['success' => ' successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DataPelanggan  $dataPelanggan
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        $data = DataPelanggan::find($id);
        $data->delete();

        return redirect()->route('pelanggan-list')->with(['success' => ' successfully!']);
    }
}
