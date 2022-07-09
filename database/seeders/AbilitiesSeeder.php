<?php

namespace Database\Seeders;

use App\Models\Abilities;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AbilitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Abilities::insert([
            ["desc" => 'pouvoir créer un album photo', "permissions" => 'album-create'],
            ["desc" => 'pouvoir mettre en ligne des images', "permissions" => 'image-upload'],
        ]);
    }
}
