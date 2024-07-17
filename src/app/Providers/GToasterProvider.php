<?php

namespace Gw1nblayd\GToaster\Providers;

use Gw1nblayd\GToaster\Console\Commands\GToasterInstall;
use Illuminate\Foundation\Support\Providers\EventServiceProvider;
use Illuminate\Support\Facades\Blade;

class GToasterProvider extends EventServiceProvider
{
    public function register(): void
    {
        parent::register();

        //$this->commands([
        //    GToasterInstall::class,
        //]);
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
        //$this->publishes([
        //    __DIR__ . '/../../resource/' => resource_path('/'),
        //], ['livewire-gtoaster', 'laravel-assets']);
    }
}
