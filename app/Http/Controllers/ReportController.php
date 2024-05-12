<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PermintaanBarang;
use App\Models\BarangMasuk;
use App\Models\DataBarang;
use App\Models\TransaksiPenjualan;
use Illuminate\Support\Facades\Auth;
use PDF;
use DB;
use DateTime;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function laporanPemintaan(Request $request){
        $data['page_title'] = 'Permintaan Barang';
        $data['breadcumb'] = 'Permintaan Barang';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['permintaan'] = PermintaanBarang::orderby('id', 'asc')->get();
        }else{
            $data['permintaan'] = PermintaanBarang::orderby('id', 'asc')->whereBetween('created_at',[$start_date,$end_date])->get();
        }

        return view('report.permintaan-barang', $data);
    }

    public function laporanPermintaanBarangPDF(Request $request){
        $data['page_title'] = 'Permintaan Barang';
        $data['breadcumb'] = 'Permintaan Barang';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['permintaan'] = PermintaanBarang::orderby('id', 'asc')->get();
        }else{
            $data['permintaan'] = PermintaanBarang::orderby('id', 'asc')->whereBetween('created_at',[$start_date,$end_date])->get();
        }

          $pdf = PDF::loadView('report.pdf-permintaan-barang', $data);
        // $pdf->setPaper([0, 0, 480, 700], 'landscape');
        return $pdf->stream('Laporan Permintaan Barang.pdf');
    }

    public function laporanPenjualan(Request $request){
        $data['page_title'] = 'Penjualan';
        $data['breadcumb'] = 'Penjualan';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->get();
    
        }else{
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->whereBetween('transaksi_penjualans.created_at',[$start_date,$end_date])->get();
        }

        return view('report.penjualan', $data);
    }

    public function laporanPenjualanPDF(Request $request){
        $data['page_title'] = 'Penjualan';
        $data['breadcumb'] = 'Penjualan';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->get();
    
        }else{
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->whereBetween('transaksi_penjualans.created_at',[$start_date,$end_date])->get();
        }


          $pdf = PDF::loadView('report.pdf-penjualan', $data);
        // $pdf->setPaper([0, 0, 480, 700], 'landscape');
        return $pdf->stream('Laporan Penjualan.pdf');
    }

    public function laporanStok(Request $request){
        $data['page_title'] = 'Stok';
        $data['breadcumb'] = 'Stok';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){

            $data['barang'] = DB::table('master_barangs')
            ->join('master_kategoris', 'master_kategoris.id', '=', 'master_barangs.id_kategori')
            ->select('master_barangs.*','master_kategoris.nama_kategori as nama_kategori')
            ->get();
    
        }else{
            $data['barang'] = DB::table('master_barangs')
            ->join('master_kategoris', 'master_kategoris.id', '=', 'master_barangs.id_kategori')
            ->select('master_barangs.*','master_kategoris.nama_kategori as nama_kategori')
            ->whereBetween('master_barangs.created_at',[$start_date,$end_date])->get();
        }

        return view('report.stok', $data);
    }

    public function laporanStokPDF(Request $request){
        $data['page_title'] = 'Stok';
        $data['breadcumb'] = 'Stok';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){

            $data['barang'] = DB::table('master_barangs')
            ->join('master_kategoris', 'master_kategoris.id', '=', 'master_barangs.id_kategori')
            ->select('master_barangs.*','master_kategoris.nama_kategori as nama_kategori')
            ->get();
    
        }else{
            $data['barang'] = DB::table('master_barangs')
            ->join('master_kategoris', 'master_kategoris.id', '=', 'master_barangs.id_kategori')
            ->select('master_barangs.*','master_kategoris.nama_kategori as nama_kategori')
            ->whereBetween('master_barangs.created_at',[$start_date,$end_date])->get();
        }


          $pdf = PDF::loadView('report.pdf-stok', $data);
        // $pdf->setPaper([0, 0, 480, 700], 'landscape');
        return $pdf->stream('Laporan Stok Barang.pdf');
    }

    public function laporanPelanggan(Request $request){
        $data['page_title'] = 'Pelanggan';
        $data['breadcumb'] = 'Pelanggan';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->get();
    
        }else{
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->whereBetween('transaksi_penjualans.created_at',[$start_date,$end_date])->get();
        }

        return view('report.pelanggan', $data);
    }

    public function laporanPelangganPDF(Request $request){
        $data['page_title'] = 'Pelanggan';
        $data['breadcumb'] = 'Pelanggan';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->get();
    
        }else{
            $data['transaksi'] = DB::table('transaksi_penjualans')
            ->join('master_barangs', 'master_barangs.id', '=', 'transaksi_penjualans.id_barang')
            ->join('data_pelanggans', 'data_pelanggans.id', '=', 'transaksi_penjualans.id_member')
            ->select('transaksi_penjualans.*','master_barangs.nama_barang as nama_barang','data_pelanggans.nama_pelanggan as nama_pembeli')
            ->whereBetween('transaksi_penjualans.created_at',[$start_date,$end_date])->get();
        }


          $pdf = PDF::loadView('report.pdf-pelanggan', $data);
        // $pdf->setPaper([0, 0, 480, 700], 'landscape');
        return $pdf->stream('Laporan Pelanggan.pdf');
    }

    public function laporanBarangMasuk(Request $request){
        $data['page_title'] = 'Barang Masuk';
        $data['breadcumb'] = 'Barang Masuk';

        $start_date = $request->start_date;
        $end_date = $request->end_date;

        if ($start_date == null && $end_date == null){
            $data['barangIn'] = DB::table('barang_masuks')
            ->join('master_barangs', 'master_barangs.id', '=', 'barang_masuks.id_barang')
            ->select('barang_masuks.*','master_barangs.nama_barang as nama_barang')
            ->get();
        }else{
            $data['barangIn'] = DB::table('barang_masuks')
            ->join('master_barangs', 'master_barangs.id', '=', 'barang_masuks.id_barang')
            ->select('barang_masuks.*','master_barangs.nama_barang as nama_barang')
            ->whereBetween('barang_masuks.created_at',[$start_date,$end_date])
            ->get();
        }

        return view('report.barang-masuk', $data);
    }

    public function laporanBarangMasukPDF(Request $request){
        $data['page_title'] = 'Barang Masuk';
        $data['breadcumb'] = 'Barang Masuk';

        $start_date = $request->start_date;
        $end_date = $request->end_date;
       
        if ($start_date == null && $end_date == null){
            $data['barangIn'] = DB::table('barang_masuks')
            ->join('master_barangs', 'master_barangs.id', '=', 'barang_masuks.id_barang')
            ->select('barang_masuks.*','master_barangs.nama_barang as nama_barang')
            ->get();
        }else{
            $data['barangIn'] = DB::table('barang_masuks')
            ->join('master_barangs', 'master_barangs.id', '=', 'barang_masuks.id_barang')
            ->select('barang_masuks.*','master_barangs.nama_barang as nama_barang')
            ->whereBetween('barang_masuks.created_at',[$start_date,$end_date])
            ->get();
        }

          $pdf = PDF::loadView('report.pdf-barang-masuk', $data);
        // $pdf->setPaper([0, 0, 480, 700], 'landscape');
        return $pdf->stream('Laporan Barang Masuk.pdf');
    }

    public function laporanGrafik(Request $request){
        
        $data['page_title'] = 'Garfik';
        $data['breadcumb'] = 'Garfik';

        $start_date = $request->start_date;
        // CHART 
        if ($request->start_date != null) {
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

        return view('report.laporan-grafik', $data);

    }

}
