<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MiniInstall extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Mini:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install MiniShop';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->call('admin:install');
        $this->call('migrate');
        $this->call('db:seed');
        $this->call('passport:install');
    }
}
