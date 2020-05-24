## Check branches for JWT, GraphQL and WebSocket versions.

## Лабораторная №2
Простое приложение, как в лабораторной работе 1, но с другой архитектурой. На сервере должен быть реализован REST API, на клиентк - Single Page Application. Обмен данных должен осуществляться путем отправки/принятия http запросов с данными в формате JSON или файлов в формате multipart/form-data. Обновление данных на клиенте не должно приводить к перегрузке страницы. Серверный REST API должен поддерживать ожидаемую семантику: правильно использовать http методы (GET для чтения данных, POST/PUT для изменения, DELETE для удаления и т.п.) и возвращать правильные коды ответов (200 в случае успешного чтения/изменения данных, 404 если ресурс не найдет и т.п.). Обязательно использование NodeJS на сервере. На клиенте можно использовать что угодно, React/Angular/Vue или вообще без библиотеки.

## Screenshots
![Alt text](../images/Main.png?raw=true)

![Alt text](../images/NoteCreate.png?raw=true)

![Alt text](../images/NoteCreateDataPick.png?raw=true)

![Alt text](../images/NoteDetails.png?raw=true)

![Alt text](../images/MainFilled.png?raw=true)

## Building
1. Open Client and Server folders in Terminal
2. Run in each folder:
```bash
npm install
```
3. Run in Server folder
```bash
node server.js
```
4. Run in Client folder
```bash
npm start
```
