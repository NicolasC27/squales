<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;

class AlbumController extends Controller
{
    public function show()
    {
        $album = Album::all()->toArray();
        return response()->json(["data" => $album, "success" => true, "type" => 'success']);
    }
}
