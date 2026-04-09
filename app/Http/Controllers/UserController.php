<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(User::select('id', 'name', 'email', 'role')->get());
    }

    public function destroy(User $user): JsonResponse
    {
        $me = Auth::user();

        if ($user->role === 'admin' || $user->id === $me->id) {
            return response()->json(['message' => 'Nevar dzēst šo lietotāju.'], 403);
        }

        $user->delete();

        return response()->json(null, 204);
    }

    public function promote(User $user): JsonResponse
    {
        if ($user->role === 'admin') {
            return response()->json(['message' => 'Lietotājs jau ir administrators.'], 422);
        }

        $user->update(['role' => 'admin']);

        return response()->json($user);
    }
}
