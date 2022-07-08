<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserDiver;

class UserController extends Controller
{
    public function getUserDiver() {

        $user = User::with('diver')->paginate();

        return response()->json($user);

    }
}
