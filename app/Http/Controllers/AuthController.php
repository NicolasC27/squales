<?php

namespace App\Http\Controllers;

use Trowable;
use Carbon\Carbon;
use App\Models\User;
use App\Models\UserDiver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function createUser(Request $request) : JsonResponse
    {
        $birthday = Carbon::createFromFormat('d/m/Y', $request->birthday[0])->format('Y/m/d');
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birthday' => $birthday,
            'email' => $request->email,
            'pseudo' => $request->firstname,
            'password' => Hash::make($request->password)
        ]);

        $userDiver = UserDiver::create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User created success',
            'user' => $user->createToken("API TOKEN")->plainTextToken,
        ], 200);
    }

    /**
     * Login the user
     * @param Request $request
     * @return user
     */
    public function loginUser(Request $request)
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

    public function auth(Request $request)
    {

        return response()->json(['status_code' => 200, 'success' => true, 'message' => 'Authenticated']);
    }
}
