<?php

namespace Gw1nblayd\LivewireGToaster\Providers;

use Gw1nblayd\LivewireGToaster\Console\Commands\LivewireGToasterInstall;
use Illuminate\Foundation\Support\Providers\EventServiceProvider;
use Illuminate\Support\Facades\Blade;

class LivewireGToasterProvider extends EventServiceProvider
{
    public function register(): void
    {
        parent::register();

        $this->commands([
            LivewireGToasterInstall::class,
        ]);
    }

    public function boot(): void
    {
        $this->publish();

        Blade::directive(
            'gtoast',
            fn($expression) => <<<HTML
              <div id="g-toaster" style="position: fixed; bottom: 15px; right: 15px; z-index: 9999;"></div>
            HTML,
        );
    }

    protected function publish(): void
    {
        $this->publishes([
            __DIR__ . '/../../resource/' => resource_path('/'),
        ], ['livewire-gtoaster', 'laravel-assets']);
    }
}
