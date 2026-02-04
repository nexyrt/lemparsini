<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Primary Meta Tags -->
        <meta name="title" content="{{ config('app.name', 'Lemparsini') }} - Undangan Digital Premium">
        <meta name="description" content="Buat undangan digital elegan untuk pernikahan, ulang tahun, dan acara spesial lainnya. Template modern, mudah dikustomisasi, dan harga terjangkau.">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ config('app.name', 'Lemparsini') }} - Undangan Digital Premium">
        <meta property="og:description" content="Buat undangan digital elegan untuk pernikahan, ulang tahun, dan acara spesial lainnya. Template modern, mudah dikustomisasi, dan harga terjangkau.">
        <meta property="og:image" content="{{ asset('og-image.jpg') }}">
        <meta property="og:site_name" content="{{ config('app.name', 'Lemparsini') }}">
        <meta property="og:locale" content="id_ID">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="{{ config('app.name', 'Lemparsini') }} - Undangan Digital Premium">
        <meta property="twitter:description" content="Buat undangan digital elegan untuk pernikahan, ulang tahun, dan acara spesial lainnya. Template modern, mudah dikustomisasi, dan harga terjangkau.">
        <meta property="twitter:image" content="{{ asset('og-image.jpg') }}">

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">
        <meta name="theme-color" content="#e11d48">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
