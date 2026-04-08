<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $transactions = $user->role === 'admin'
            ? Transaction::all()
            : Transaction::where('user_id', $user->id)->get();

        return response()->json($transactions);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'user_id'      => ['required', 'integer', 'exists:users,id'],
            'type'         => ['required', 'string', 'in:buy,sell,exchange'],
            'crypto'       => ['required', 'string'],
            'from_crypto'  => ['nullable', 'string'],
            'to_crypto'    => ['nullable', 'string'],
            'amount'       => ['required', 'numeric', 'min:0'],
            'result'       => ['required', 'numeric', 'min:0'],
            'iban'         => ['nullable', 'string'],
        ]);

        $transaction = DB::transaction(function () use ($data) {
            $tx = Transaction::create($data);

            $userId = $data['user_id'];

            match ($data['type']) {
                'buy' => $this->adjustBalance($userId, $data['crypto'], $data['result']),

                'sell' => $this->adjustBalance($userId, $data['crypto'], -$data['amount']),

                'exchange' => (function () use ($userId, $data) {
                    $this->adjustBalance($userId, $data['from_crypto'], -$data['amount']);
                    $this->adjustBalance($userId, $data['to_crypto'],   $data['result']);
                })(),
            };

            return $tx;
        });

        return response()->json($transaction, 201);
    }

    public function update(Request $request, Transaction $transaction): JsonResponse
    {
        $data = $request->validate([
            'type'        => ['sometimes', 'string', 'in:buy,sell,exchange'],
            'crypto'      => ['sometimes', 'string'],
            'from_crypto' => ['nullable', 'string'],
            'to_crypto'   => ['nullable', 'string'],
            'amount'      => ['sometimes', 'numeric', 'min:0'],
            'result'      => ['sometimes', 'numeric', 'min:0'],
            'iban'        => ['nullable', 'string'],
        ]);

        $transaction->update($data);

        return response()->json($transaction);
    }

    public function destroy(Transaction $transaction): JsonResponse
    {
        $transaction->delete();

        return response()->json(null, 204);
    }

    private function adjustBalance(int $userId, string $crypto, float $delta): void
    {
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $userId, 'crypto' => $crypto],
            ['balance' => 0]
        );

        $wallet->increment('balance', $delta);
    }
}
