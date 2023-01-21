<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDiver;
use Illuminate\Http\Request;

class UserDiverController extends Controller
{
    public function update(Request $request, User $user)
    {
        $response = UserDiver::where('user_id', $user->id)->update($request->userDiver);

        return response()->json([
            'response' => $response,
        ]);
    }
}
