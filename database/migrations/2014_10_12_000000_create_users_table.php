<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->string('pin')->nullable();
            $table->string('saldo')->nullable();
            $table->string('koin')->nullable();
            $table->string('refferal')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('city')->nullable();
            $table->enum('status', ['Aktif','Tidak Aktif','Suspend'])->nullable();
            $table->enum('level', ['Member','Reseller','Agen','Admin','Developer'])->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
