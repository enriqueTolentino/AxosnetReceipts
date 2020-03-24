# AxosnetReceipts

Gracias por la oportunidad, espero que el proyecto sea de su agrado. Si tienen alguna duda o comentario al respecto, estoy a la orden.

## Getting Started

Estas instrucciones le proporcionarán una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba. 

### Prerequisitos

- .net core 3.1
- .net core cli
- node js
- npm
- sql server (no importa versión)
- git


### Instalación
(Todos los comandos descritos son considerando estar posicionado dentro de la carpeta AxosnetReceipts generada por la clonación del repositorio)

- Clonar el repositorio con el siguiente comando (posicionarse antes en la carpeta deseada)
```
git clone https://github.com/enriqueTolentino/AxosnetReceipts.git
```

- Instalar los node_modules del proyecto de reactjs
```
cd axosnet-web-app
npm install
```

- Ejecutar los migrations del proyecto de .net
```
cd AxosnetAPI/AxosnetAPI
dotnet ef database update
```

- Ejecutar el query en el servidor de base de datos. El query se encuentra en:
```
queries/InsertCurrencies.sql
```

- (Solo si es necesario) Cambiar el puerto al que apunta la configuración de las peticiones de la aplicación de react, por el puerto correspondiente a su ambiente local de .net

**Archivo**: axosnet-web-app/src/services/AxiosConfig.js
**Línea a cambiar:**
```
baseURL: `https://localhost:5001/api/`,
```

- (Solo si es necesario) Cambiar el puerto al que permite hacer peticiones el servidor de .net, por el puerto correspondiente a su ambiente local de reactjs
**Archivo**: AxosnetAPI/AxosnetAPI/Startup.cs
**Línea a cambiar:**
```
app.UseCors(
      options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader()
);
```

- **IMPORTANTE** Cambiar la información del servidor de base de datos, en la connectionString del proyecto de .net
**Archivo**: AxosnetAPI/AxosnetAPI/appsettings.json
**Línea a cambiar:**
```
"ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AxosnetAPIDB;User Id=sa;Password=yourPassword;"
  }
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
