# Admin Todos [WIP]

### Development

Pasos para levantar la app de desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Crea una copia del .env.template a .env, y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando `npm install`
5. Ejecutar el comando `npm run dev`
6. Ejecutar estos comandos de prisma

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos](http://localhost:3000/api/seed)

### Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
