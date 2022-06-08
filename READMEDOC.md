# Generador de contraseñas. 

Genera contraseñas seguras con caracteres especiales, números y mayúsculas. 

## Lenguajes

* HTML.
* CSS.
* JavaScript.
* Bootstrap 5.

## Contenido 

El generador funciona con JavaScript, dentro del archivo `app.js` se encuentran las declaraciones de variables, eventos y funciones necesarias para el funcionamiento de la página.

La contraseña, se genera aleatoriamente tomando caracteres al azar del objeto que los contiene.  

```JavaScript
const caracteres = {
    numbers  : '0 1 2 3 4 5 6 7 8 9',
    simbolos : '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? ¿ ! | /',
    upperCase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    lowerCase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
}
```
Según las opciones de configuración que haya elegido el usuario, apoyado por los métodos `Math.floor` y `Math.random`. 

Para aprender más sobre estos métodos, visite la [documentación del objeto Math](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Funciones

* Generar contraseñas seguras. 
* Permitir decidir al usuario la cantidad de caracteres que contiene la contraseña, así como si la misma contiene números, caracteres especiales o letras mayúsculas.
* Guardar en el almacenamiento local las opciones de configuración para que estas persistan incluso si se cierra el navegador.  

Pruebe la validación de formularios desde aquí {@link https://franj1748.github.io/generador-de-password/}

![generador-password](https://accesoweb.online/images/generador_password/generador-password.png)

### Contacto: 

* [Linkedin]
* [GitHub]
* [Telegram]











[Linkedin]:https://www.linkedin.com/in/francisco-elis-24506b209
[GitHub]:https://github.com/franj1748
[Telegram]:https://t.me/franciscoj1748









