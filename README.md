[<img src="https://banners.beyondco.de/Livewire%20G-Toaster.png?theme=dark&packageManager=composer+require&packageName=gw1nblayd%2Flivewire-gtoaster&pattern=architect&style=style_2&description=Toasters+for+your+Laravel+Livewire+applications&md=1&showWatermark=1&fontSize=150px&images=https%3A%2F%2Flaravel.com%2Fimg%2Flogomark.min.svg" />](https://github.com/gw1nblayd/livewire-gtoaster)
# Livewire G-Toaster

Minimalistic toasters for your laravel livewire application

## Version Compatibility

| PHP           | Laravel    | Livewire      | G-Toaster |
|---------------|:-----------|:--------------|:----------|
| 8.1, 8.2, 8.3 | 10.x, 11.x | 3.0, dev-main | 0.1.0     |

## Installation

### Step 1:

```bash
composer require gw1nblayd/livewire-gtoaster
```

### Step 2:
#### Go to `resources/js/app.js` and add the following lines:

```javascript
import GToaster from '../../vendor/gw1nblayd/livewire-gtoaster/src/resource/js/GToaster.js';


// All parameters are optional
GToaster.setParams({
  // Can be 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  position: 'bottom-right',

  // Time in milliseconds
  timer: 3000,

  // Can be 'none', 'fade'
  animation: 'none',

  // Can be 'flat', 'blank'
  style: 'flat',

  // Can be 'dark', 'light'
  theme: 'dark',

  // Show icons in toasts
  showIcons: true,
});
```

### Step 3:
#### Add `@gtoast` directive to your main layout file.
Example: `resources/views/layouts/app.blade.php`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>G-Toaster</title>
</head>
<body>

@gtoast
</body>
</html>
```

## How to use ?

### In your livewire component

```php
<?php
declare(strict_types=1);

namespace App\Livewire;

use Gw1nblayd\GToaster\Livewire\Traits\GToaster;
use Illuminate\View\View;
use Livewire\Component;

class TestComponent extends Component
{
    use GToaster;

    public function submit(): void
    {
        $this->toastSuccess('All is good');
        $this->toastError('Something went wrong');
        $this->toastInfo('Just an info message');
        $this->toastWarning('Be careful!');
    }
}

```

## Examples:
<img width="250" src="/src/public/preview1.png" />
<img width="250" src="/src/public/preview2.png" />
<img width="250" src="/src/public/preview3.png" />
<img width="250" src="/src/public/preview4.png" />

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
