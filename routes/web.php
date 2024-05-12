<?php

use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataPelangganController;
use App\Http\Controllers\HistoryLogController;
use App\Http\Controllers\MasterBarangController;
use App\Http\Controllers\MasterKategoriController;
use App\Http\Controllers\MasterPetugasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransaksiPenjualanController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $data['page_title'] = "Login";
    return view('auth.login', $data);
})->name('user.login');

Route::get('login-admin', function () {
    $data['page_title'] = "Login Admin";
    return view('auth.login-admin', $data);
})->name('login-admin');

Route::get('register', [RegisterController::class, 'index'])->name('register');
Route::post('loginPost2', [UserController::class, 'loginPost2'])->name('loginPost2');
Route::post('loginPostAdmin', [UserController::class, 'loginPostAdmin'])->name('loginPostAdmin');

Route::middleware('auth:web')->group(function () {
    // Dashboard admin
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard.index');
    // Dashboard umum

    Route::get('pelanggan-list', [DataPelangganController::class, 'index'])->name('pelanggan-list');
    Route::get('pelanggan-create', [DataPelangganController::class, 'create'])->name('pelanggan-create');
    Route::post('pelanggan-store', [DataPelangganController::class, 'store'])->name('pelanggan-store');
    Route::get('pelanggan-edit/{id}', [DataPelangganController::class, 'edit'])->name('pelanggan-edit');
    Route::post('pelanggan-update/{id}', [DataPelangganController::class, 'update'])->name('pelanggan-update');
    Route::get('pelanggan-destroy/{id}', [DataPelangganController::class, 'destroy'])->name('pelanggan-destroy');
 
    Route::get('kategori-list', [MasterKategoriController::class, 'index'])->name('kategori-list');
    Route::get('kategori-create', [MasterKategoriController::class, 'create'])->name('kategori-create');
    Route::post('kategori-store', [MasterKategoriController::class, 'store'])->name('kategori-store');
    Route::get('kategori-edit/{id}', [MasterKategoriController::class, 'edit'])->name('kategori-edit');
    Route::post('kategori-update/{id}', [MasterKategoriController::class, 'update'])->name('kategori-update');
    Route::get('kategori-destroy/{id}', [MasterKategoriController::class, 'destroy'])->name('kategori-destroy');
 
    Route::get('petugas-list', [MasterPetugasController::class, 'index'])->name('petugas-list');
    Route::get('petugas-create', [MasterPetugasController::class, 'create'])->name('petugas-create');
    Route::post('petugas-store', [MasterPetugasController::class, 'store'])->name('petugas-store');
    Route::get('petugas-edit/{id}', [MasterPetugasController::class, 'edit'])->name('petugas-edit');
    Route::post('petugas-update/{id}', [MasterPetugasController::class, 'update'])->name('petugas-update');
    Route::get('petugas-destroy/{id}', [MasterPetugasController::class, 'destroy'])->name('petugas-destroy');

    Route::get('barang-list', [MasterBarangController::class, 'index'])->name('barang-list');
    Route::get('barang-create', [MasterBarangController::class, 'create'])->name('barang-create');
    Route::post('barang-store', [MasterBarangController::class, 'store'])->name('barang-store');
    Route::get('barang-edit/{id}', [MasterBarangController::class, 'edit'])->name('barang-edit');
    Route::post('barang-update/{id}', [MasterBarangController::class, 'update'])->name('barang-update');
    Route::get('barang-destroy/{id}', [MasterBarangController::class, 'destroy'])->name('barang-destroy');

    Route::get('transaksi-list', [TransaksiPenjualanController::class, 'index'])->name('transaksi-list');
    Route::get('transaksi-create', [TransaksiPenjualanController::class, 'create'])->name('transaksi-create');
    Route::post('transaksi-store', [TransaksiPenjualanController::class, 'store'])->name('transaksi-store');
    Route::get('transaksi-destroy/{id}', [TransaksiPenjualanController::class, 'destroy'])->name('transaksi-destroy');

    Route::get('laporan-penjualan', [ReportController::class, 'laporanPenjualan'])->name('laporan-penjualan');
    Route::get('laporan-penjualan-pdf', [ReportController::class, 'laporanPenjualanPDF'])->name('laporan-penjualan-pdf');
    
    Route::get('laporan-stok', [ReportController::class, 'laporanStok'])->name('laporan-stok');
    Route::get('laporan-stok-pdf', [ReportController::class, 'laporanStokPDF'])->name('laporan-stok-pdf');

    Route::get('barang-masuk-list', [BarangMasukController::class, 'index'])->name('barang-masuk-list');
    Route::post('barang-masuk-store', [BarangMasukController::class, 'store'])->name('barang-masuk-store');

    Route::get('laporan-barang-masuk', [ReportController::class, 'laporanBarangMasuk'])->name('laporan-barang-masuk');
    Route::get('laporan-barang-masuk-pdf', [ReportController::class, 'laporanBarangMasukPDF'])->name('laporan-barang-masuk-pdf');

    Route::get('laporan-pelanggan', [ReortController::class, 'laporanPelanggan'])->name('laporan-pelanggan');
    Route::get('laporan-pelanggan-pdf', [ReportController::class, 'laporanPelangganPDF'])->name('laporan-pelanggan-pdf');
    
    Route::get('laporan-grafik', [ReportController::class, 'laporanGrafik'])->name('laporan-grafik');

    // Master Data
     Route::get('master-data', function () {
        $data['page_title'] = 'Master Data';
        $data['breadcumb'] = 'Master Data';
        return view('master-data.index', $data);
    })->name('master-data.index');

    // Departement
    Route::resource('departements', DepartementController::class);

    // Users
    Route::patch('change-password', [UserController::class, 'changePassword'])->name('users.change-password');
    Route::resource('users', UserController::class)->except([
        'show'
    ]);;

    Route::get('user-destroy/{id}', [UserController::class, 'destroy'])->name('user-destroy');

    
    // History Log
    Route::resource('history-log', HistoryLogController::class)->except([
        'show', 'create', 'store', 'edit', 'update'
    ]);;

    // profilr edit
    Route::resource('profile', ProfileController::class)->except([
        'show','create', 'store'
    ]);;
    Route::patch('change-password-profile', [ProfileController::class, 'changePassword'])->name('profile.change-password');


});

