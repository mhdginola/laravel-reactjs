<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
        if(!Auth::attempt($credentials)) {
            return response()->json([
                'errors' => [
                    'password' => ["Password does't match"]
                ],
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response('', 204);
    }

    public function testQuery(Request $request)
    {
        $query = $request->query->all();
        return response($query ,200);
    }
}
