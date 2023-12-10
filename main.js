class RegistroClasse {
    constructor() {
        this.countid = JSON.parse(localStorage.getItem('countid')) || 1;
        this.studenti = JSON.parse(localStorage.getItem('studenti')) || [];
        this.editing = false;
    }

    aggiungiStudente(id, nome, cognome) {
        const studente = {
            id: this.countid++,
            nome: nome,
            cognome: cognome,
            voti: [],
        }
        this.studenti.push(studente);
        console.log(this.studenti)
        this.salvaDatiLocalStorage();
        return studente;

    }

    modificaInfo(id, nuovoNome, nuovoCognome) {
        const indice = this.studenti.findIndex(studente => studente.id == id);
        this.studenti[indice].nome = nuovoNome;
        this.studenti[indice].cognome = nuovoCognome;
        console.log(this.studenti)
        this.salvaDatiLocalStorage();
    }
    //questo metodo nasce dall'esigenza di riassegnare l'id dopo che uno studente viene eliminato
    riassegnaID() {
        this.studenti.forEach((studente, index) => {
            studente.id = index + 1;
        });
        this.salvaDatiLocalStorage();
    }

    // delete student
    eliminaStudente(id) {
        this.studenti = this.studenti.filter(studente => studente.id !== id);
        this.riassegnaID();
        console.log(this.studenti)
        this.salvaDatiLocalStorage();
    }


    aggiungiVoti(id, voto, data, descrizione) {
        const studente = this.studenti.find(studente => studente.id === id);
        if (studente) {
            studente.voti.push({
                voto: voto,
                data: data,
                descrizione: descrizione,
            })
            console.log(this.studenti);
            this.salvaDatiLocalStorage();
        } else {
            console.log("Non trovato")
        }

    }

    salvaDatiLocalStorage() {
        localStorage.setItem('countid', JSON.stringify(this.countid));
        localStorage.setItem('studenti', JSON.stringify(this.studenti));
    }
    //abilita i bottoni
    enableButtons() {
        const editButton = document.getElementById('edit-info');
        const deleteBtn = document.getElementById('delete-btn');
        const addButton = document.getElementById('add-button');
        const gradeButton = document.getElementById('add-grade');
        const viewGrade = document.getElementById('viewgrade-btn');

        if (editButton && deleteBtn && addButton && gradeButton && viewGrade) {
            const isDisabled = this.editing;
            editButton.disabled = isDisabled;
            deleteBtn.disabled = isDisabled;
            addButton.disabled = isDisabled;
            gradeButton.disabled = isDisabled;
            viewGrade.disabled = isDisabled;
        }
    }
    //disabilita bottoni
    disableButtons() {
        const editButton = document.getElementById('edit-info');
        const deleteBtn = document.getElementById('delete-btn');
        const addButton = document.getElementById('add-button');
        const gradeButton = document.getElementById('add-grade');
        const viewGrade = document.getElementById('viewgrade-btn');

        if (editButton && deleteBtn && addButton && gradeButton && viewGrade) {
            const isDisabled = true;
            editButton.disabled = isDisabled;
            deleteBtn.disabled = isDisabled;
            addButton.disabled = isDisabled;
            gradeButton.disabled = isDisabled;
            viewGrade.disabled = isDisabled;
        }
    }
}

const nameinput = document.querySelector('#name-input-field');
const surnameinput = document.querySelector('#surname-input-field');
const addButton = document.querySelector('#add-button');
const container = document.querySelector('.people-container');
const editarea = document.querySelector('.edit-container');
const addgrade = document.querySelector('.grade-container');

const breakLine = document.createElement('br');

const registro = new RegistroClasse(); //oggetto registro instanziato

var countid = 1;




// metodo callback. una volta cliccato aggiungerà dal text-input
document.addEventListener('DOMContentLoaded', () => {
    registro.studenti.forEach((studente) => {
        const id = studente.id;
        const name = studente.nome;
        const surname = studente.cognome;
        registro.riassegnaID();

        const personContainer = document.createElement('div');
        personContainer.classList.add('person-item-container');
        container.appendChild(personContainer);

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


        //bottone edit
        const editButton = document.createElement('button');
        editButton.id = 'edit-info';
        const editimg = document.createElement('img');
        editimg.src = 'assets/edit.svg'
        editButton.appendChild(editimg);
        personContainer.appendChild(editButton); //fa apparire il bottone edit all'interno di people-container.

        //aggiungi voto
        const gradeButton = document.createElement('button');
        gradeButton.id = 'add-grade';
        const gradeimg = document.createElement('img');
        gradeimg.src = 'assets/grade.svg'
        gradeButton.appendChild(gradeimg);
        personContainer.appendChild(gradeButton);

        //se clicco devo modificare le info 

        editButton.addEventListener('click', () => {
            registro.disableButtons();



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
            saveimg.src = 'assets/save.svg'
            saveButton.appendChild(saveimg);
            saveButton.addEventListener('click', () => {
                const editedStudent = registro.studenti.find(student => student.id === id);
                registro.enableButtons();
                if (editedStudent) {
                    // questio aggiorna il nome e cognome con dei nuovi valori
                    editedStudent.nome = newNameInput.value;
                    editedStudent.cognome = newSurnameInput.value;

                    registro.enableButtons();
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

        //visualizza voti btn

        const viewGrade = document.createElement('button')
        viewGrade.id = 'viewgrade-btn';
        const viewimg = document.createElement('img');
        viewimg.src = 'assets/viewtable.svg';
        viewGrade.appendChild(viewimg);
        personContainer.appendChild(viewGrade);

        //eventListener viewVoti
        viewGrade.addEventListener('click', () => {
            const student = registro.studenti.find(studente => studente.id === id);
            if (student) {
                registro.disableButtons();
                const tableContainer = document.createElement('div');
                tableContainer.classList.add('grade-table-container');


                const tableName = document.createElement('p');
                tableName.innerText = `Voti di ${student.nome}`;
                tableContainer.appendChild(tableName);

                const table = document.createElement('table');
                table.classList.add('grade-table');

                // header tabella
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['Voto', 'Data', 'Descrizione'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // tabella con i voti
                const tbody = document.createElement('tbody');
                student.voti.forEach(voto => {
                    const tr = document.createElement('tr');
                    const tdVoto = document.createElement('td');
                    const tdData = document.createElement('td');
                    const tdDescrizione = document.createElement('td');

                    tdVoto.textContent = voto.voto;
                    tdData.textContent = voto.data;
                    tdDescrizione.textContent = voto.descrizione;

                    tr.appendChild(tdVoto);
                    tr.appendChild(tdData);
                    tr.appendChild(tdDescrizione);

                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);

                // Append table to container
                tableContainer.appendChild(table);
                //appendchild
                container.appendChild(tableContainer);

                // Chiudi btn
                const closeTableButton = document.createElement('button');
                const closeTableImg = document.createElement('img');
                closeTableImg.src = 'assets/closesmall.svg';
                closeTableButton.appendChild(closeTableImg);
                closeTableButton.addEventListener('click', () => {
                    container.removeChild(tableContainer);
                    registro.enableButtons();
                });
                tableContainer.appendChild(closeTableButton);
            }
        });

        //bottone delete
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'delete-btn';
        const deleteimg = document.createElement('img');
        deleteimg.src = 'assets/delete.svg';
        deleteBtn.appendChild(deleteimg);
        personContainer.appendChild(deleteBtn);




        const closeGrade = document.createElement('button');
        const closeimg = document.createElement('img');
        closeimg.src = 'assets/close.svg'

        //se clicco devo eliminare la persona
        deleteBtn.addEventListener('click', () => {
            // rimuove l'elemento html
            container.removeChild(personContainer);

            // rimuove la persona
            registro.eliminaStudente(id);
            //così l'id si aggiorna
            location.reload();

        });

        const voto = "";
        const descrizione = "";
        const data = "";
        let descrText, descrInput, dateText, dateInput, saveGrade;
        //se clicco aggiungi voto devo poter aggiungere un voto.
        //durante l'aggiunta del voto non voglio che si possa eliminare lo studente.
        //durante l'aggiunta del voto non posso modificare lo studente.
        gradeButton.addEventListener('click', () => {
            registro.disableButtons();
            votoText = document.createElement('p');
            votoText.type = 'text';
            votoText.innerText = `Inserisci un voto per ${studente.nome}:`;

            votoInput = document.createElement('input');
            votoInput.type = 'number';
            votoInput.min = 1;
            votoInput.max = 10;

            votoInput.value = voto;
            votoInput.placeholder = 'Voto';
            votoInput.id = 'text-input-field';
            addgrade.appendChild(votoText);
            addgrade.appendChild(votoInput);


            descrText = document.createElement('p');
            descrText.type = 'text';
            descrText.innerText = 'Inserisci un commento: ';

            descrInput = document.createElement('textarea');
            descrInput.type = 'text';
            descrInput.value = descrizione;
            descrInput.placeholder = 'Commento';
            descrInput.id = 'text-input-field';

            dateText = document.createElement('p');
            dateText.type = 'text';
            dateText.innerText = 'Inserisci la data: ';

            dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = data;
            dateInput.placeholder = 'YYYY-MM-DD';
            dateInput.id = 'date-input-field';

            addgrade.appendChild(descrText);
            addgrade.appendChild(descrInput);
            addgrade.appendChild(dateText);
            addgrade.appendChild(dateInput);
            addgrade.appendChild(breakLine);

            saveGrade = document.createElement('button');
            const saveimg = document.createElement('img');
            saveimg.src = 'assets/save.svg';


            // const closeGrade = document.createElement('button');
            // const closeimg = document.createElement('img');
            // closeimg.src= 'close.svg'
            saveGrade.appendChild(saveimg);
            addgrade.appendChild(breakLine);
            addgrade.appendChild(breakLine);
            addgrade.appendChild(saveGrade);

            closeGrade.appendChild(closeimg);
            addgrade.appendChild(closeGrade);

            // registro.aggiungiVoti(id, votoInput.value, dateInput.value, descrInput.value);
            //Da implementare un tasto close.
            saveGrade.addEventListener('click', () => {
                registro.enableButtons();
                registro.aggiungiVoti(id, votoInput.value, dateInput.value, descrInput.value);
                // const parentElement = addgrade.parentElement; //questo consente di eliminare tutti il ParentElement (addgrade)
                // parentElement.removeChild(addgrade);
                location.reload();

            });



            closeGrade.addEventListener('click', () => {
                registro.enableButtons();
                // const parentElement = addgrade.parentElement;
                // parentElement.removeChild(addgrade);
                location.reload();


            })
        });


        nameinput.value = '' //questo fa sì che una volta che clicchi sul button si elimini il value. Non si vede niente nell'input.
        surnameinput.value = ''
    }
    )
})
addButton.addEventListener('click', () => {
    registro.enableButtons();
    const nameInput = document.getElementById('name-input-field');
    const surnameInput = document.getElementById('surname-input-field');

    if (!nameInput || !surnameInput || nameInput.value.trim() === '' || surnameInput.value.trim() === '') {
        return;
    } else {
        const name = nameInput.value;
        const surname = surnameInput.value;
        const id = countid++;

        registro.aggiungiStudente(id, name, surname);

        // Aggiorna la pagina dopo aver aggiunto uno studente
        location.reload();
    }
});