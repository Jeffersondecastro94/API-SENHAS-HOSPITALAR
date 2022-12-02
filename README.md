# API-SENHA-HOSPITALAR

A api consiste num sistema de gerar senhas para um paciente. A senha consiste na uniao da data do sistema invertida, tipo de prioridade e sequencia que essa senha foi gerada.
Por parte do atendente , ele vai ter uma lista de senhas a serem chamadas de acordo com sua prioridade. sendo senha prioritaria (SP) >senha exame(SE)> senha geral(SG).
Ao chamar a senha da vez , a senha é deletada do banco de dados , dessa forma a proxima senha prioritaria sera filtrada e exibida quando for chamada pelo atendente.

## Para rodar o programa:
### Utilizar:
```
npm install

npm start 
```

## Para conectar ao banco :
o banco foi criado no mongo Atlas.

necessario criar um arquivo . env, como o do exemplo , passando os dados necessarios para conectar ao banco 

![image](https://user-images.githubusercontent.com/60047670/205212388-5696eae9-8d99-4f4e-8b79-8f8123e1c613.png)

### Opcional:
postman (para utilizar os end points)

## END-POINTS

#### Solicitar uma senha (POST)
````
http://localhost:3000/tokens/registertoken
````
![image](https://user-images.githubusercontent.com/60047670/205214203-ee4677a4-ca3a-40b1-ac42-6ba4975ee813.png)
#### Listar todas as senhas (GET)
````
http://localhost:3000/tokens/fulltokens
````
![image](https://user-images.githubusercontent.com/60047670/205214350-09649ada-30fb-438d-b543-7dd10d92f8c8.png)

#### SENHA DA VEZ (GET)
````
http://localhost:3000/tokens/nextToken
````
![image](https://user-images.githubusercontent.com/60047670/205214509-dd3003b3-5073-4e89-901c-b447ab0300a5.png)

#### Deletar todas as senhas (DELETE)
````
http://localhost:3000/tokens/deleteAll
````
![image](https://user-images.githubusercontent.com/60047670/205214631-6a56d85d-f9e2-4e1c-8025-03fdcd388620.png)






