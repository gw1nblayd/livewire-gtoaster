<?php

namespace Gw1nblayd\LivewireGToaster\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class LivewireGToasterInstall extends Command
{
    protected $signature = 'gtoaster:install';

    protected $description = 'Install Livewire G-Toaster package';

    public function handle(): void
    {
        $filePath = resource_path('js/GToaster.js');

        if (File::exists($filePath)) {
            File::delete($filePath);
            $this->info('Old GToaster.js has been removed successfully.');
        }

        $this->call('vendor:publish', ['--tag' => 'livewire-gtoaster']);
    }
}
