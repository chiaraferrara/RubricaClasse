class RegistroClasse {
    constructor() {
        this.studenti = [];

    }

    aggiungiStudente(id, nome, cognome) {
        const studente = {
            id: id,
            nome: nome,
            cognome: cognome,
            voti: [],
        }
        this.studenti.push(studente);
        console.log(this.studenti)
        return studente;
    }

    modificaInfo(id, nuovoNome, nuovoCognome) {
        const indice = this.studenti.findIndex(studente => studente.id == id);
        this.studenti[indice].nome = nuovoNome;
        this.studenti[indice].cognome = nuovoCognome;
        console.log(this.studenti)
    }

    // delete student
    eliminaStudente(id) {
        this.studenti = this.studenti.filter(studente => studente.id !== id);
        console.log(this.studenti)
    }
}

const nameinput = document.querySelector('#name-input-field');
const surnameinput = document.querySelector('#surname-input-field');
const addButton = document.querySelector('#add-button');
const container = document.querySelector('.people-container');
const editarea = document.querySelector('.edit-container');



const registro = new RegistroClasse(); //oggetto registro instanziato

var countid = 1;
var click = false;

// metodo callback. una volta cliccato aggiungerà dal text-input
addButton.addEventListener('click', () => {
    const nameInput = document.getElementById('name-input-field');
    const surnameInput = document.getElementById('surname-input-field');

    if (!nameInput || !surnameInput || nameInput.value.trim() === '' || surnameInput.value.trim() === '') {
        return;
    } else {
        const name = nameInput.value;
        const surname = surnameInput.value;
        const id = countid++;





        const personContainer = document.createElement('div');
        personContainer.classList.add('person-item-container');
        container.appendChild(personContainer);


    //     personContainer.style.display = 'grid';
    // personContainer.style.gridTemplateColumns = 'auto auto auto auto auto';


        // id. Nome Cognome
        const paragraphId = document.createElement('p');
        paragraphId.id = 'person-id';
        paragraphId.innerText = `${id}` + ' .';
        personContainer.appendChild(paragraphId);

        const paragraphName = document.createElement('p');
        paragraphName.id = 'person-name';
        paragraphName.innerText = `${name} `;
        personContainer.appendChild(paragraphName);


        const paragraphSurname = document.createElement('p');
        paragraphSurname.id = 'person-surname';
        paragraphSurname.innerText = `${surname}`;
        personContainer.appendChild(paragraphSurname);

        //metodo aggiungiStudente della classe
        registro.aggiungiStudente(id, name, surname);


        //bottone edit
        const editButton = document.createElement('button');
        editButton.id = 'edit-info';
        const editimg = document.createElement('img');
        editimg.src = 'edit.svg'
        editButton.appendChild(editimg);
        personContainer.appendChild(editButton); //fa apparire il bottone edit all'interno di people-container.

        //se clicco devo modificare le info 

        editButton.addEventListener('click', () => {
            click = !click;

            if (click == false) {
                editarea.innerHTML = ''; //questo fa in modo che ci sia un solo edit alla volta.
                document.getElementById(editButton).disabled = true;
            }

            const editedStudent = registro.studenti.find(student => student.id === id); //trovo l'id dello studente per risalire a nome e cognome
            const datiCorrenti = document.createElement('p');
            datiCorrenti.innerText = `Stai modificando: ${editedStudent.nome} ${editedStudent.cognome}`;


            const editContainer = document.createElement('div');
            editContainer.classList.add('edit-info-container');

            const newNameInput = document.createElement('input');
            newNameInput.type = 'text';
            newNameInput.value = name;
            newNameInput.placeholder = 'Nuovo Nome';
            newNameInput.id = 'text-input-field';



            const newSurnameInput = document.createElement('input');
            newSurnameInput.type = 'text';
            newSurnameInput.value = surname;
            newSurnameInput.placeholder = 'Nuovo Cognome';
            newSurnameInput.id = 'text-input-field';


            const saveButton = document.createElement('button');

            const saveimg = document.createElement('img');
            saveimg.src = 'save.svg'
            saveButton.appendChild(saveimg);
            saveButton.addEventListener('click', () => {
                click = false;
                const editedStudent = registro.studenti.find(student => student.id === id);
                if (editedStudent) {
                    // questio aggiorna il nome e cognome con dei nuovi valori
                    editedStudent.nome = newNameInput.value;
                    editedStudent.cognome = newSurnameInput.value;


                    //metodo modificaInfo della classe
                    registro.modificaInfo(id, editedStudent.nome, editedStudent.cognome)


                    // aggiorniamo i dati
                    paragraphName.innerText = `${editedStudent.nome} `;
                    paragraphSurname.innerText = `${editedStudent.cognome}`;
                    console.log('I nuovi dati:', newNameInput.value, newSurnameInput.value);
                    editarea.innerHTML = ''; //non si vedrà più nulla dopo aver salvato


                }
            });


            editContainer.appendChild(datiCorrenti); //voglio che visualizzi i dati precedenti...
            editContainer.appendChild(newNameInput);
            editContainer.appendChild(newSurnameInput);


            editarea.appendChild(editContainer);
            editContainer.appendChild(saveButton);



        })

        //bottone delete
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'delete-btn';
        const deleteimg = document.createElement('img');
        deleteimg.src = 'delete.svg'
        deleteBtn.appendChild(deleteimg);
        personContainer.appendChild(deleteBtn);

        //se clicco devo eliminare la persona
        deleteBtn.addEventListener('click', () => {
            if (click == false) {
                // rimuove l'elemento html
                container.removeChild(personContainer);

                // rimuove la persona dalla mappa
                const editedStudent = registro.studenti.find(student => student.id === id);
                //metodo eliminaStudente della classe!
                registro.eliminaStudente(id)
            } else {
                return;
            }


        });


        nameinput.value = '' //questo fa sì che una volta che clicchi sul button si elimini il value. Non si vede niente nell'input.
        surnameinput.value = ''
    }
})
