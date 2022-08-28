<?php

namespace App\Http\Controllers;

use Image;
use App\Models\User;
use App\Models\Album;

use App\Models\Picture;
use App\Models\AlbumPicture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
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
        $role = $request->user()->role();
        $user = $request->user();

        if (!Gate::allows('album-view', $user)) {
            dd('You are not allowed to update this post.');
        } else {
            dd('You are allowed to update this post.');
        }
        $gallery = Album::where('folder', $params)->orWhere('id', $params)->first()->pictures->toArray();


        return response()->json(["data" => $gallery, "success" => true, "type" => "success"]);
    }


    public function cropPictures(Request $request)
    {

        $picture = Picture::where('album_id', $request->folder_id)->where('default_album', 1)->first();

        $img = Image::make(storage_path('app/public/' . $picture->path));

        $img->crop(
            $request->coordinates['width'],
            $request->coordinates['height'],
            $request->coordinates['left'],
            $request->coordinates['top']
        );

        $img->resize(600, 500, function ($const) {
            $const->aspectRatio();
        });


        Storage::put('public/crop/' . $picture->path, (string) $img->encode('jpg', 100));


        $picture = Picture::where('album_id', $request->folder_id)->where('default_album', 1)->update(['crop' => 1]);
        return response()->json([
            'status' => true,
            'type' => 'success',
            'width' => $request->coordinates['width']
        ]);
    }

    public function uploadPictures(Request $request)
    {


        $content = file_get_contents($request->file->path());


        /*
        * Store size before resize of the picture
        */
        $newPath = $request->file->store($request->folder, 'public');
        $img_default = Image::make($request->file->path());

        /*
        * Start resizing picture
        */
        $img = Image::make($request->file->path());


        $fullWidth = $img->width();
        $fullHeight = $img->height();

        $img->resize(500, 500, function ($const) {
            $const->aspectRatio();
        });

        $img_default->resize(2048, 1080, function ($const) {
            $const->aspectRatio();
        });
        /*
        * Store resize into thumbnail and orignal picture
        */
        // $path = $request->file->hashName('thumbnail/' . $request->folder);

        if ($request->default === "true") {
            $path = $request->file->hashName('crop/' . $request->folder);
            $pathOriginal = $request->file->hashName($request->folder);
            Storage::put('public/' . $path, (string) $img->encode('jpg', 75));

            if (strlen((string)$img_default->encode('jpg', 75)) > 75000) {
                Storage::put('public/' . $pathOriginal, (string) $img_default->encode('jpg', 50));
            } else {
                Storage::put('public/' . $pathOriginal, (string) $img_default->encode('jpg', 75));
            }
        } else {
            $path = $request->file->hashName('thumbnail/' . $request->folder);

            Storage::put('public/' . $path, (string) $img->encode('jpg', 75));
        }



        $picture = [
            'name' =>  $request->file->getClientOriginalName(),
            'path' => $newPath,
            'width' => $fullWidth,
            'height' => $fullHeight,
            'album_id' => '0',
            'default_album' => ($request->default === "true") ? '1' : '0',
            'album_id' => $request->folder_id,
        ];

        $album = Album::find($request->folder_id);

        if ($request->default === "true") {

            $album->pictures()->updateOrInsert(
                ['default_album' => '1'],
                $picture
            );
        } else {
            // return response()->json(['status' => false]);
            $album->pictures()->insert($picture);
        }


        return response()->json([
            'status' => true,
            'type' => 'success',
            'picture' => $album,
            'default' => 'public/' . $path,
        ]);
    }


    public function deletePicture(Request $request)
    {
        $picture = Picture::find($request->id);
        $picture->delete();

        return response()->json(['success' => true], 200);
    }
}
