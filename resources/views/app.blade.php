<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- <title inertia>{{ config('app.name', 'Laravel') }}</title> --}}

    <title>Once Upon A Life</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <!-- Optional: higher resolution/png variants -->
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('favicon.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        {{-- Fallback for Vite 5+ dev websocket token (avoids "__WS_TOKEN__ is not defined" if inline preamble blocked by CSP or plugin mismatch) --}}
        @env('local')
            <script>
                window.__WS_TOKEN__ = window.__WS_TOKEN__ || '';
                if (typeof __WS_TOKEN__ === 'undefined') { window.__WS_TOKEN__ = ''; }
            </script>
        @endenv
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    <div id="toast-root"><toast /></div>
    </body>
</html>
