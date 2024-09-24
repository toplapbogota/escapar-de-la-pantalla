# Pines
## Encendido y apagado
```js
prender(7,8,12,13)
```

```js
apagar(7,8,12,13)
```
## Serie
```js
serie(7,8);
```
## Bucle
Por defecto el intervalo es de 1000
```js
bucle(7,8,12,13) 
```
para cambiar la velocidad del _bucle_
```js
cambiarIntervalo(500)
```
También afecta la velocidad del [serie](#serie)
```js
detenerBucle()
```


## Paralelo
```js
paralelo({pin:7,inicio:2,lapso:4},{pin:8,inicio:2,lapso:4},{pin:12,inicio:2,lapso:4})
```
```js
paralelo({pin:7,inicio:1,lapso:4},{pin:8,inicio:2,lapso:4},{pin:12,inicio:3,lapso:4})
```
## Silencio
```js
apagarTodo()
```
