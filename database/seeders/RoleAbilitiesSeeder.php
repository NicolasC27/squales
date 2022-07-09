<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleAbilitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role_abilities')->insert([
            ['ability_id' => 1, 'role_id' => 1],
            ['ability_id' => 2, 'role_id' => 1],
        ]);
    }
}
