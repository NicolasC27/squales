<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDiver extends Model
{
    use HasFactory;

    protected $table = 'user_diver';

    protected $fillable = [
        'level_diver',
        'level_apnea',
        'level_instruction',
        'user_id',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
