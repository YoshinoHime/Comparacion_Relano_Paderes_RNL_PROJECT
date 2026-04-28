<?php

namespace Database\Seeders;

use App\Models\Gender;
use App\Models\User;
//use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        






        Gender::factory()->createMany([
            ['gender' => 'Male'],
            ['gender' => 'Female'],
            ['gender' => 'Prefer Not to Say'],
        ]);

        $birthDate = fake()->date();
        $age = date_diff(date_create($birthDate), date_create('today'))->y;

        User::factory()->create([
            'first_name' => 'John',
            'middle_name' => 'Santos',
            'last_name' => 'Doe',
            'suffix_name' => null,
            'gender_id' => Gender::inRandomOrder()->first()->gender_id,
            'birth_date' => $birthDate,
            'age' => $age,
            'username' => 'johndoe',
            'password' => 'Johndoe'
        ]);
    }
}
