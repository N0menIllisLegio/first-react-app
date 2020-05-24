## Лабораторная №3
Добавить к приложению из лабораторной №2 аутентификацию на базе JWT токенов. Токен должен передаваться через httponly cookie на клиент и так же отправляться на сервер. При попытке прочитать/изменить данные на сервере без валидного токена, должен клиенту должен возвращаться 401 код. При получении кода 401 клиент должен потребовать от пользователя ввода логина/пароля. Для формирования jwt токена можно использовать только пакеты jsonwebtoken и bcrypt. Логику аутентификации нужно описать в виде отдельного middleware той библиотеки, на которой написан сервер (например, Express). 
**Зарегестрированные пользователи видят ВСЕ существующие заметки и могут их редактировать**

## Screenshots
![Alt text](../images/SignIn.png?raw=true)

![Alt text](../images/SignUp.png?raw=true)

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
