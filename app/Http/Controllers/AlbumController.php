<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AlbumController extends Controller
{

    public function __construct()
    {
        // $response = $this->middleware('can:view, ' . Album::class)->only('view');
        // if ($response) {
        //     // The action is authorized...
        // } else {
        //     echo $response->message();
        // }
    }

    public function show()
    {
        $album = Album::with(['pictures' => function($q) {
            $q->where('default_album', '=', '1');
        }])->get()->toArray();


        return response()->json(["data" => $album, "success" => true, "type" => 'success']);
    }

    public function view(Request $request, int|string $params)
    {
        $default_picture = Album::with(['pictures' => function ($q) {
            $q->where('default_album', '=', '1');
        }])->where('folder', $params)
            ->orWhere('id', $params)->first();

        $album = Album::with(['pictures' => function ($q) {
            $q->where('default_album', '=', '0');
        }])->where('folder', $params)
            ->orWhere('id', $params)->first();

        return response()->json(["data" => ["album" => $album->toArray(), "default_picture" => $default_picture->pictures?->first()?->toArray()], "success" => true, "type" => "success"]);
    }

    public function updateDescription(Request $request, Album $id)
    {
       $id->updateOrFail(['desc' =>  $request->desc]);

        return response()->json(["success" => true]);
    }
}
