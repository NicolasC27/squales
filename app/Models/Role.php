<?php

namespace App\Models;

use App\Models\User;
use App\Models\Abilities;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function abilities()
    {
        return $this->belongsToMany(Abilities::class, 'role_abilities', 'role_id', 'ability_id');
    }
}
