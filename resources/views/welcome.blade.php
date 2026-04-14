<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#000000">
    <title>CryptoBridge</title>
    <link rel="manifest" href="/manifest.json">
    @vite(['resources/js/app.js'])
</head>
<body>
    <div id="app"></div>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
      }
    </script>
</body>
</html>