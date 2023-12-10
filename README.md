# README

## Descrizione
Questo script implementa un'applicazione web per gestire una lista di persone. Gli utenti possono eseguire operazioni CRUD (Create, Read, Update, Delete) per gestire le informazioni sulla lista.
[https://chiaraferrara.github.io/Rubrica-Crud-JS/](https://chiaraferrara.github.io/RubricaClasse/)
## Operazioni CRUD

### Creazione di una Persona
1. Inserire il nome nella casella di input con l'ID `name-input-field`.
2. Inserire il cognome nella casella di input con l'ID `surname-input-field`.
3. Fare clic sul pulsante con l'ID `add-button`.
4. Una nuova persona sarà aggiunta alla lista nella sezione con la classe `people-container`.

### Lettura di una Persona
1. La lista di persone è visualizzata nella sezione con la classe `people-container`.
2. Ogni persona è rappresentata con nome, cognome e pulsanti per le operazioni di modifica ed eliminazione.

### Aggiornamento di una Persona
1. Fare clic sul pulsante "Modifica" (icona matita) accanto alla persona che si desidera modificare.
2. Nella sezione di modifica, inserire i nuovi valori per nome e cognome.
3. Fare clic sul pulsante "Salva" per applicare le modifiche.
4. Le informazioni sulla persona saranno aggiornate nella lista.

### Eliminazione di una Persona
1. Fare clic sul pulsante "Elimina" (icona cestino) accanto alla persona che si desidera eliminare.
2. La persona sarà rimossa dalla lista.

### Note Aggiuntive
- È possibile modificare una persona alla volta.
- Il pulsante "Modifica" nella sezione di una persona sarà disabilitato durante la modifica di un'altra persona.
- Assicurarsi di inserire valori validi per nome e cognome prima di aggiungere una persona.

## Struttura del Codice
Il codice è organizzato in una classe `Person` che rappresenta un individuo con un ID, nome e cognome. Le interazioni con l'interfaccia utente sono gestite attraverso eventi e funzioni di manipolazione del DOM.

### File e Risorse
- `index.html`: Contiene la struttura HTML dell'applicazione.
- `style.css`: Definisce lo stile dell'applicazione.
- `main.js`: Contiene il codice JavaScript per la logica dell'applicazione.

## Descrizione del CRUD dell'Applicazione

### Creazione (Create)
- Quando un utente clicca sul pulsante "Aggiungi", i valori inseriti nei campi `name-input-field` e `surname-input-field` vengono utilizzati per creare una nuova istanza di `Person`.
- Questa istanza viene quindi aggiunta alla lista visibile nella sezione `people-container` e alla mappa `peopleMap`.

### Lettura (Read)
- La lista di persone viene visualizzata nella sezione `people-container`.
- Ogni persona mostra il suo nome, cognome e pulsanti per le operazioni di modifica ed eliminazione.
- La mappa `peopleMap` mantiene una traccia delle persone aggiunte con i loro ID associati.

### Aggiornamento (Update)
- Cliccando sul pulsante "Modifica" di una persona, si attiva la modalità di modifica per quella specifica persona.
- Nella sezione di modifica, è possibile inserire nuovi valori per il nome e il cognome.
- Cliccando sul pulsante "Salva", le informazioni della persona vengono aggiornate sia nella lista che nella mappa `peopleMap`.

### Eliminazione (Delete)
- Cliccando sul pulsante "Elimina" di una persona, si rimuove l'elemento dalla sezione `people-container`.
- La persona corrispondente viene anche eliminata dalla mappa `peopleMap`.

## Dipendenze
L'applicazione non richiede dipendenze esterne. Si basa su HTML, CSS e JavaScript standard.

