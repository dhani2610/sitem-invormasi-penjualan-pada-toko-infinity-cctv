<?php

namespace App\Http\Controllers;

use App\Models\MasterPetugas;
use Illuminate\Http\Request;
use File;

class MasterPetugasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['page_title'] = 'Master Petugas';
        $data['breadcumb'] = 'Master Petugas';
        $data['petugas'] = MasterPetugas::orderby('id', 'asc')->get();

        return view('petugas.index', $data); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['page_title'] = 'Master Petugas';
        $data['breadcumb'] = 'Master Petugas';
        $data['petugas'] = MasterPetugas::orderby('id', 'asc')->get();

        return view('petugas.create', $data); 
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
            'nm_member' => 'required',
            'alamat' => 'required',
            'no_tlp' => 'required',
            'email' => 'required',
            'gambar' => 'required',
            'nik' => 'required',
        ]);

        $data = new MasterPetugas();
        $data->nm_member = $validateData['nm_member'];
        $data->alamat = $validateData['alamat'];
        $data->no_tlp = $validateData['no_tlp'];
        $data->email = $validateData['email'];
        $data->nik = $validateData['nik'];
        // $data->gambar = $validateData['gambar'];
        if ($request->hasFile('gambar')) {
            $image = $request->file('gambar');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('img/petugas/');
            $image->move($destinationPath, $name);
            $data->gambar = $name;
        }
        $data->save();

        return redirect()->route('petugas-list')->with(['success' => ' successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MasterPetugas  $masterPetugas
     * @return \Illuminate\Http\Response
     */
    public function show(MasterPetugas $masterPetugas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MasterPetugas  $masterPetugas
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['page_title'] = 'Master Petugas';
        $data['breadcumb'] = 'Master Petugas';
        $data['petugas'] = MasterPetugas::find($id);

        return view('petugas.edit', $data); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MasterPetugas  $masterPetugas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'nm_member' => 'required',
            'alamat' => 'required',
            'no_tlp' => 'required',
            'email' => 'required',
            'gambar' => 'required',
            'nik' => 'required',
        ]);

        $data = MasterPetugas::find($id);
        $data->nm_member = $validateData['nm_member'];
        $data->alamat = $validateData['alamat'];
        $data->no_tlp = $validateData['no_tlp'];
        $data->email = $validateData['email'];
        $data->nik = $validateData['nik'];
        // $data->gambar = $validateData['gambar'];
        if ($request->hasFile('gambar')) {
            // Delete Img
            if ($data->gambar) {
                $image_path = public_path('img/petugas/'.$data->gambar); // Value is not URL but directory file path
                if (File::exists($image_path)) {
                    File::delete($image_path);
                }
            }
            
            $image = $request->file('gambar');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('img/petugas/');
            $image->move($destinationPath, $name);
            $data->gambar = $name;
        }
        $data->save();

        return redirect()->route('petugas-list')->with(['success' => ' successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MasterPetugas  $masterPetugas
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MasterPetugas::find($id);
          if ($data->gambar) {
                $image_path = public_path('img/petugas/'.$data->gambar); // Value is not URL but directory file path
                if (File::exists($image_path)) {
                    File::delete($image_path);
                }
            }

        $data->delete();

        return redirect()->route('petugas-list')->with(['success' => ' successfully!']);
    }
}
