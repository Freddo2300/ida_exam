# Program
Her finder du et lille program baseret på dispositionerne.

## Introduktion
Programmet er en udvidelse af det, du demonstrerer i dispositionen. Du kan bruge det, hvis du vil, blot til inspiration eller studie.

### `main.js`
Indeholder programmets udgangspunkt, hvorfra det eksekveres gennem `main()` som kaldes i anonym funktion i bunden af scriptet. Her kaldes opstilles variable, instantieres objekter og kaldes funktioner, eksporteret fra modulerne `fruit.js` og `person.js`.

### `fruit.js`
Modulet indeholder kode til din første disposition som kan fungere til inspiration eller pejlemærker. Her demonstreres blandt andet fejlhåndtering gennem `try-catch`, `if-else`, `if-else`-alternativet `switch`, string-interpolering, samt eksportering af funktioner.

### `person.js`
Modulet indeholder klasserne `Person` og `Employee`. Subklassen `Employee` nedarver fra superklassen `Person`, hvilket betyder, den har alle properties og metoder defineret for `Person` klassen, men udvider også superklassen ved at tilføje yderligere logik, hvilket kaldes inheritance/nedarvning. Desuden modificerer den `introduce()` metoden, hvilket vi fra objekt-orienteret programmering kender som polymorphism/polymorfisme. Bemærk, hvordan funktionen virker forskelligt for en `Person` objekt og en `Employee` objekt.

Modulet viser et alternativ til, hvordan man kan lave objekter til det, du viser i din disposition, hvor klasser oprettes funktionelt i stedet for den objekt-orienterede måde.

## Forudsætninger
For at køre programmet skal du enten bruge en editor som Visual Studio Code eller du kan køre det fra kommandolinjen, hvis ud har [node.js](https://nodejs.org/en/download) installeret:

```sh
unzip ~/Downloads/ida_exam.zip -d ~/Downloads/ida_exam # hvis du ikke allerede har pakket filerne ud
cd ~/Downloads/ida_exam
node ./main.js
```
