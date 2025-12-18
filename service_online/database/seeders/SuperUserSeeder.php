<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SuperUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'super@itservice.com'],
            [
                'name' => 'Super IT',
                'password' => Hash::make('super123'),
                'role' => 'superuser'
            ]
        );
    }
}