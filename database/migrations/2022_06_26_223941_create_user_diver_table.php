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
        Schema::create('user_diver', function (Blueprint $table) {
            $table->id();
            $table->string('licence')->default('');
            $table->integer('level_diver')->default(0);
            $table->integer('level_apnea')->default(0);
            $table->integer('level_instruction')->default(0);
            
            $table->timestamps();

             $table->foreignId('user_id')
                ->contrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_diver');
    }
};
