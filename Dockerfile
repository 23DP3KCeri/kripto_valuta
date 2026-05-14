FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    curl zip unzip git libzip-dev libonig-dev libxml2-dev libsqlite3-dev

RUN docker-php-ext-install pdo mbstring zip

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY . .

RUN composer install --no-dev
RUN npm install && npm run build

EXPOSE 8080
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8080