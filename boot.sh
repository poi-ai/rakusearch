#!/bin/bash
kill -9 $(lsof -t -i:8000)
cd /home/rakusearch/backend
php artisan serve &
kill -9 $(lsof -t -i:3000)
cd /home/rakusearch/frontend
npm start &
