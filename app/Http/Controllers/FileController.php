<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class FileController extends Controller
{
    public function showOriginal(Request $request)
    {
        return Image::make(storage_path('app/public/' . $request->folder . '/' . $request->filename))->response();
    }

    public function showCrop(Request $request)
    {
        return Image::make(storage_path('app/public/crop/' . $request->folder . '/' . $request->filename))->response();
    }
}
