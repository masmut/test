<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PenggunaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 1000; $i++) {
            $username = $faker->userName;
            $name = $faker->name;
            $email = $faker->unique()->email;
            $saldo = $faker->randomNumber(4);
            $koin = $faker->randomNumber(3);
            $whatsapp = $faker->phoneNumber;
            $city = $faker->city;
            $status = $faker->randomElement(['Aktif', 'Tidak Aktif', 'Suspend']);
            $level = $faker->randomElement(['Member', 'Reseller', 'Agen', 'Admin', 'Developer']);
            $refferal = $faker->randomNumber(5);
            $password = Hash::make($username);

            DB::table('users')->insert([
                'username' => $username,
                'name' => $name,
                'email' => $email,
                'saldo' => $saldo,
                'koin' => $koin,
                'whatsapp' => $whatsapp,
                'city' => $city,
                'status' => $status,
                'level' => $level,
                'refferal' => $refferal,
                'password' => $password,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
