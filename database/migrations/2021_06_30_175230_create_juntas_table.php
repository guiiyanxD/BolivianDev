<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJuntasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('juntas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('codigo_id');
            $table->unsignedBigInteger('tipo_participacion_id');


            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('codigo_id')->references('id')->on('invites');
            $table->foreign('tipo_participacion_id')->references('id')->on('participaciones');
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
        Schema::dropIfExists('juntas');
    }
}
