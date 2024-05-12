<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TransaksiPenjualan;


class MasterBarang extends Model
{
    use HasFactory;

    public function totalJual()
    {
        // dd($this->id);
        $data = TransaksiPenjualan::where('id_barang',$this->id)->get();
        $total =  $data->sum('jumlah');
        return $total;
        
    }
}

