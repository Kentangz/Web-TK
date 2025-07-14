<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user->tokens()->delete();

        //testing
        // $expiresAt = now()->addMinutes(1/2);

        $expiresAt = now()->addDays(2);
        $token = $user -> createToken('adminToken', ['*'],$expiresAt)->plainTextToken;

        return response()->json([
            'token' => $token,
            'expired_at' => $expiresAt->toDateTimeString(),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message'=>'logout successfully']);
    }

    public function checkuser(Request $request)
    {
        $user = $request->user();

        $accessToken = $user->tokens()->latest()->first();
        $lastUsedAt = $accessToken->last_used_at;

        return response()->json([
            'status' => true,
            'data' => $user,
            'last_activity' => $lastUsedAt ->toDateTimeString()
        ]);
    }

}
