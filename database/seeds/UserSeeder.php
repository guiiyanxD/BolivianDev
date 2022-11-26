<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        User::create([
            'name'              => 'Williams W. Alvarez',
            'email'             => 'willdev@gmail.com',
            'password'          => Hash::make('12345678'),
            'email_verified_at' => now(),
            'remember_token'    => \Illuminate\Support\Str::random(10),

        ]);

        User::create([
            'name'              => 'Laura Peredo Dorado',
            'email'             => 'laudev@gmail.com',
            'password'          => Hash::make('12345678'),
            'email_verified_at' => now(),
            'remember_token'    => \Illuminate\Support\Str::random(10),

        ]);
//        User::factory()->count(10)->create();
//        factory(User::class,10)->create();

    }
}
