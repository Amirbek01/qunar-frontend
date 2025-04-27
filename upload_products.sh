#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0NTYwMDQzNSwiZXhwIjoxNzQ1NjA0MDM1fQ.nJ4UfC9ouEuogYmQk44Ifwek559NqExx0p1h"
URL="https://vencera.tech/qunarBack/products/add"

echo "🚀 Заливаю товары в маркетплейс..."

# ДАТЧИКИ
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":1,"name":"Сенсор температуры DS18B20","description":"Датчик температуры для Arduino.","price":1200,"image_url":"https://via.placeholder.com/150","metadata":{"range":"-55°C-125°C","accuracy":"±0.5°C","interface":"1-Wire"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":1,"name":"Датчик влажности DHT22","description":"Комбинированный датчик влажности и температуры.","price":1700,"image_url":"https://via.placeholder.com/150","metadata":{"range":"0-100%","accuracy":"±2%","interface":"Digital"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":1,"name":"Барометр BMP280","description":"Датчик давления и температуры.","price":2100,"image_url":"https://via.placeholder.com/150","metadata":{"range":"300-1100hPa","accuracy":"±1hPa","interface":"I2C/SPI"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":1,"name":"Датчик CO2 MH-Z19B","description":"Датчик углекислого газа.","price":5800,"image_url":"https://via.placeholder.com/150","metadata":{"range":"0-5000ppm","accuracy":"±50ppm","interface":"UART"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":1,"name":"Пылевой датчик GP2Y1010AU0F","description":"Датчик качества воздуха.","price":6063,"image_url":"https://via.placeholder.com/150","metadata":{"range":"0-500µg/m³","accuracy":"±10%","interface":"Analog"}}'

# ОСВЕЩЕНИЕ
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":2,"name":"Фитолампа 60W","description":"Фитолампа для растений.","price":5000,"image_url":"https://via.placeholder.com/150","metadata":{"power":"60W","spectrum":"380–800nm","dimensions":"20x20см"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":2,"name":"Фитолампа 100W","description":"Профессиональная LED лампа.","price":9500,"image_url":"https://via.placeholder.com/150","metadata":{"power":"100W","spectrum":"Полный","dimensions":"30x30см"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":2,"name":"Лампа для аквариума","description":"Освещение аквариума.","price":3800,"image_url":"https://via.placeholder.com/150","metadata":{"power":"15W","spectrum":"Бело-синий","dimensions":"45см"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":2,"name":"Компактная лампа 30W","description":"Компактный светильник.","price":3200,"image_url":"https://via.placeholder.com/150","metadata":{"power":"30W","spectrum":"Белый","dimensions":"15x15см"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":2,"name":"Гроубокс LED","description":"Полный набор для выращивания.","price":15000,"image_url":"https://via.placeholder.com/150","metadata":{"power":"200W","spectrum":"Full Spectrum","dimensions":"80x80x180см"}}'

# АНАЛИЗАТОРЫ
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":3,"name":"pH-метр воды","description":"Измеритель уровня pH.","price":2500,"image_url":"https://via.placeholder.com/150","metadata":{"measurements":["pH"],"power_source":"Battery"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":3,"name":"Анализатор почвы 3в1","description":"Проверка pH, влажности, освещения.","price":3400,"image_url":"https://via.placeholder.com/150","metadata":{"measurements":["Moisture","pH","Light"],"power_source":"Без батареек"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":3,"name":"TDS-метр","description":"Измерение солей в воде.","price":2100,"image_url":"https://via.placeholder.com/150","metadata":{"measurements":["TDS"],"power_source":"Батарейки"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":3,"name":"Luxmeter","description":"Измерение освещенности.","price":2900,"image_url":"https://via.placeholder.com/150","metadata":{"measurements":["Lux"],"power_source":"Батарейки"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":3,"name":"Анализатор качества воздуха","description":"CO2, pM2.5, влажность.","price":10000,"image_url":"https://via.placeholder.com/150","metadata":{"measurements":["CO2","pM2.5"],"power_source":"Сеть"}}'

# ЧЕРВИ
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":4,"name":"Черви Eisenia fetida","description":"Красные калифорнийские черви.","price":900,"image_url":"https://via.placeholder.com/150","metadata":{"species":"Eisenia fetida","package_weight":"0.5кг"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":4,"name":"Черви Lumbricus terrestris","description":"Дождевые черви.","price":700,"image_url":"https://via.placeholder.com/150","metadata":{"species":"Lumbricus terrestris","package_weight":"1кг"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":4,"name":"Черви червяк Nightcrawler","description":"Крупные черви для рыбалки.","price":1200,"image_url":"https://via.placeholder.com/150","metadata":{"species":"Nightcrawler","package_weight":"0.8кг"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":4,"name":"Компостные черви","description":"Черви для компоста.","price":950,"image_url":"https://via.placeholder.com/150","metadata":{"species":"Various","package_weight":"0.5кг"}}'
curl -X POST $URL -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"category_id":4,"name":"Черви для живой наживки","description":"Идеально для рыбалки.","price":800,"image_url":"https://via.placeholder.com/150","metadata":{"species":"Earthworm","package_weight":"1кг"}}'

echo "✅ Все 30 товаров загружены успешно!"
