<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('description', 250);
            $table->UnsignedBigInteger('invite_id');
            $table->unsignedBigInteger('backup_id');
            $table->timestamps();

            $table->foreign('backup_id')->on('backup')->references('id');
            $table->foreign('invite_id')->on('invites')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meets');
    }
}
