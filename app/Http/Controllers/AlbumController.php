<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AlbumController extends Controller
{

    public function __construct()
    {
        $response = $this->middleware('can:view, ' . Album::class)->only('view');
        if ($response) {
            // The action is authorized...
        } else {
            echo $response->message();
        }
    }

    public function show()
    {
        $album = Album::all()->toArray();
        return response()->json(["data" => $album, "success" => true, "type" => 'success']);
    }

    public function view(Request $request, int|string $params)
    {

        $role = $request->user()->role();
        $user = $request->user();
        $album = Album::all();

        $gallery = Album::where('folder', $params)->orWhere('id', $params)->first()->pictures->toArray();


        return response()->json(["data" => $gallery, "success" => true, "type" => "success"]);
    }
}
