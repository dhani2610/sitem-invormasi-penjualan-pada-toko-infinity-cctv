<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterBarangsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('master_barangs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_kategori');
            $table->string('nama_barang');
            $table->string('merk');
            $table->string('warna');
            $table->string('dimensi');
            $table->string('spek');
            $table->string('harga_beli');
            $table->string('harga_jual');
            $table->string('satuan_barang');
            $table->integer('stok');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('master_barangs');
    }
}
