# Spotify2VK
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[ENG](README.md "English version") RUS
## Как запустить
Вам потребуется инструмент _forever_, установить который можно через NPM:   
`npm install forever -g`   
После этого перейдите в папку со скриптом и выполните следующие команды:   
```
npm install
forever start main.js <аргументы>
```

## Как использовать
Просто так скрипт работать не будет - вам нужно указать, как минимум, access_token ВКонтакте. Получить его можно, например, [здесь](https://vkhost.github.io/)   
Полный список аргументов командной строки:   
```
--token <token>        Access_token ВКонтакте (обязательно)
--prefix <prefix>      Префикс статуса (по умолчанию: "Spotify |")
--replacer <replacer>  Текст, который будет установлен в качестве статуса перед закрытием скрипта
--current              Использовать статус, который был установлен до запуска скрипта как replacer
```

## Как добавить в автозагрузку
Для того, чтобы добавить скрипт в автозагрузку, откройте файл `sp2vk.cmd`:
```
forever start main.js --token <TOKEN> --current
```
Здесь вам нужно изменить `<TOKEN>` на свой access_token от ВКонтакте. После этого дважды кликните на файл `add_to_startup.cmd`. Теперь скрипт будет запускаться каждый раз при запуске Windows.
