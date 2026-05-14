<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'User1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('test1234'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'User2',
            'email' => 'user2@gmail.com',
            'password' => Hash::make('test1234'),
            'role' => 'admin',
        ]);

        $this->call(ExchangeRateSeeder::class);
    }
}