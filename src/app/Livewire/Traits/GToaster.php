<?php

declare(strict_types=1);

namespace Gw1nblayd\LivewireGToaster\Livewire\Traits;

trait GToaster
{
    public function toast(string $type, string $message): void
    {
        $this->dispatch('gtoast', type: $type, message: $message);
    }

    public function toastSuccess(string $message): void
    {
        $this->toast('success', $message);
    }

    public function toastError(string $message): void
    {
        $this->toast('error', $message);
    }

    public function toastWarning(string $message): void
    {
        $this->toast('warning', $message);
    }

    public function toastInfo(string $message): void
    {
        $this->toast('info', $message);
    }
}
