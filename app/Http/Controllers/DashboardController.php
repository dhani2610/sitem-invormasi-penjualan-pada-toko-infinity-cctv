<?php

namespace App\Http\Controllers;

use App\Models\DataPelanggan;
use App\Models\MasterBarang;
use App\Models\MasterPetugas;
use DateTime;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\TransaksiPenjualan;


class DashboardController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:dashboard', ['only'=> 'dashboard']);
    }

    public function dashboard(Request $request)
    {
        $data['page_title'] = 'Dashboard';
        $data['breadcumb'] = 'Dashboard';
        
        $data['countPenjualan'] = TransaksiPenjualan::count();
        $data['countPelanggan'] = DataPelanggan::count();
        $data['countBarang'] = MasterBarang::count();
        $data['countPetugas'] = MasterPetugas::count();


        $start_date = $request->start_date;
        $end_date = $request->end_date;
        // CHART 
        if ($request->start_date != null && $request->end_date != null) {
            $start_date = new DateTime(Carbon::parse($request->start_date)->format('Y/m/d'));
            $end_date = new DateTime(Carbon::parse($request->start_date)->endOfMonth()->format('Y/m/d'));
        }else {
            $start_date = new DateTime(date('Y/m/01 00.00.00'));
            $end_date = new DateTime(date('Y/m/t 23.59.59'));
        }

        $data['date'] = [];
        $data['total_transaksi'] = [];
        // $data['like'] = [];
        for ($day = clone $start_date; $day <= $end_date; $day->modify( '+1 day')){
            array_push( $data['date'], $day->format('d'));
            $total_transaksi = TransaksiPenjualan::whereBetween('created_at', [$day->format('Y-m-d H:i:s'), $day->format('Y-m-d H:i:s')])->get()->count();

            // Push Array chart
            array_push($data['total_transaksi'], $total_transaksi);
        }

       
        return view('dashboard.index', $data);
        
    }


 
}
