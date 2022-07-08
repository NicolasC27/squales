<?php

namespace App\Http\Controllers;

use Image;
use App\Models\Album;
use App\Models\Picture;

use App\Models\AlbumPicture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class AdminGalleryController extends Controller
{
    public function show()
    {
        $gallery = Album::all();

        return response()->json(["data" => $gallery, "success" => false, "type" => 'success']);
    }

    public function createAlbum(Request $request)
    {

        $gallery = Album::create([
            'name' => $request->name,
            'folder' => strtolower(str_replace(' ', '-', $request->name))
        ]);
        $gallery->save();
        return response()->json(["data" => $request->name, "success" => true, "type" => 'success']);
    }

    public function getPictures(Request $request, int|string $params)
    {
        $auth = Auth::user();
        $db = $request->user()->currentAccessToken()->token;
        dd($auth->currentAccessToken());
        $gallery = Album::where('folder', $params)->orWhere('id', $params)->first()->pictures->toArray();


        return response()->json(["data" => $gallery, "success" => true, "type" => "success"]);
    }


    public function uploadPictures(Request $request)
    {


        $content = file_get_contents($request->file->path());



        $newPath = $request->file->store($request->folder, 'public');
        $img = Image::make($request->file->path());

        /*
        * Store size before resize of the picture
        */
        $fullWidth = $img->width();
        $fullHeight = $img->height();

        $img->resize(500, 500, function ($const) {
            $const->aspectRatio();
        });

        /*
        * Store resize into thumbnail and orignal picture
        */
        $path = $request->file->hashName('thumbnail/' . $request->folder);
        Storage::put('public/' . $path, (string) $img->encode('jpg', 75));


        $picture = new Picture;
        $picture->name = $request->file->getClientOriginalName();
        $picture->path = $newPath;
        $picture->width = $fullWidth;
        $picture->height =  $fullHeight;
        $picture->album_id = '0';


        $album = Album::find($request->folder_id);
        $album->pictures()->save($picture);
        return response()->json([
            'status' => true,
            'type' => 'success',
            'picture' => $album
        ]);
    }

    public function deletePicture(Request $request)
    {
    }
}
