<?php

use App\Participation;
use Illuminate\Database\Seeder;

class ParticipationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Participation::create([
            'name'          => 'Host',
            'description'   => 'A room creator able to invite other people',
        ]);

        Participation::create([
            'name'          => 'Guest',
            'description'   => 'An person invited by the Host',
        ]);
    }
}
