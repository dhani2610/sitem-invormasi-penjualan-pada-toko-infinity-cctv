<?php

namespace App\Http\Controllers;

use App\Models\MasterKategori;
use Illuminate\Http\Request;

class MasterKategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['page_title'] = 'Master Kategori';
        $data['breadcumb'] = 'Master Kategori';
        $data['kategori'] = MasterKategori::orderby('id', 'asc')->get();

        return view('kategori.index', $data); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['page_title'] = 'Master Kategori';
        $data['breadcumb'] = 'Master Kategori';

        return view('kategori.create', $data); 
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
            'nama_kategori' => 'required',
        ]);

        $data = new MasterKategori();
        $data->nama_kategori = $validateData['nama_kategori'];
        $data->save();

        return redirect()->route('kategori-list')->with(['success' => ' successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MasterKategori  $masterKategori
     * @return \Illuminate\Http\Response
     */
    public function show(MasterKategori $masterKategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MasterKategori  $masterKategori
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['page_title'] = 'Master Kategori';
        $data['breadcumb'] = 'Master Kategori';
        $data['kategori'] = MasterKategori::find($id);

        return view('kategori.edit', $data); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MasterKategori  $masterKategori
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'nama_kategori' => 'required',
        ]);

        $data = MasterKategori::find($id);
        $data->nama_kategori = $validateData['nama_kategori'];
        $data->save();

        return redirect()->route('kategori-list')->with(['success' => ' successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MasterKategori  $masterKategori
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MasterKategori::find($id);
        $data->delete();

        return redirect()->route('kategori-list')->with(['success' => ' successfully!']);
    }
}
