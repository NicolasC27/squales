<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Abilities>
 */
class AbilitiesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            ["desc" => 'pouvoir créer un album photo', "permissions" => 'album-create'],
            ["desc" => 'pouvoir mettre en ligne des images', "permissions" => 'image-upload'],
        ];
    }
}
