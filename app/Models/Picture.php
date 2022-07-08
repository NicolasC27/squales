<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'album_id'
    ];

    public function album(): hasOne
    {
        return $this->belongsTo(Album::class);
    }

    public function toArray()
    {
        $array = parent::toArray();
        $array['src'] = url('/') . '/storage/' . $this->path;
        $array['thumbnail'] = url('/') . '/storage/thumbnail/' . $this->path;
        $array['w'] = $this->width;
        $array['h'] = $this->height;

        return $array;
    }
}   
