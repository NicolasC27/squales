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
        Schema::create('pictures', function (Blueprint $table) {
          $table->id();
          $table->boolean('default_album')->default(false);
          $table->boolean('top')->default(false);
          $table->string('name');
          $table->string('path');
          $table->boolean('crop')->default(false);

          //define foreign key
          $table->foreignId('album_id')
                ->contrained('albums')
                ->onUpdate('cascade')
                ->onDelete('cascade');
                
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
        Schema::dropIfExists('pictures');

    }
};
