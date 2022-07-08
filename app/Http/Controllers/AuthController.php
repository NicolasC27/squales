<?php

namespace App\Http\Controllers;

use Trowable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birthday' => $request->birthday,
            'email' => $request->email,
            'pseudo' => $request->pseudo,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User created success',
            'user' => $user->createToken("API TOKEN")->plainTextToken
        ], 200);
    }

    /**
     * Login the user
     * @param Request $request
     * @return user
     */
    function loginUser(Request $request)
    {
        try {

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email and Password inco nrrect',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'User created success',
                'user' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (Trowable $th) {
        }
    }
}
