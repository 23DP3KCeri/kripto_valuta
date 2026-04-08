<?php

namespace Database\Seeders;

use App\Models\ExchangeRate;
use Illuminate\Database\Seeder;

class ExchangeRateSeeder extends Seeder
{
    public function run(): void
    {
        $rates = [
            'BTC' => 85000,
            'ETH' => 2000,
            'BNB' => 300,
            'SOL' => 130,
        ];

        foreach ($rates as $crypto => $rate) {
            ExchangeRate::updateOrCreate(
                ['crypto' => $crypto],
                ['rate'   => $rate]
            );
        }
    }
}
