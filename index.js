// OPERAZIONI DA FARE AD AVVIO PAGINA
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todolist = document.querySelector('.todo-list')
const emptyListMessage = document.querySelector('.empty-list-message')
// crea una chiave ler il local storage
const STORAGE_KEY = '__bool_todo__'

// PREPARO UN LISTA DI ATTIVITA'
let activities = [];

// controllo se per caso c'erano delle ttività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if(storage){
    activities = JSON.parse(storage);
};

//CHIEDO A JS DI DECIDERE COSA MOSTRARE
showcontent();

//# OPERAZIONI DINAMICHE  
//regisco al click del bottone
button.addEventListener('click', function(){

// recupero il testo nel campo
const newActivity = inputField.value.trim();

  addActivity(newActivity);

});


// # FUNZIONI

// funzioni che decido di mostrare in pagina

function showcontent(){
    //innanzitutto pulisco tutto
    todolist.innerText = '';
    emptyListMessage.innerText = '';

    if(activities.length > 0){
    // se ce almeno un attività...
    // per ciascuna  attività...
    activities.forEach(function(activity){
    // inserisci in pagina un blocco HTML che ti dico io:
        todolist.innerHTML += `
        <li class="todo-item">
        <div class="todo-check">
            <img src="images/check.svg" alt="check icon">
        </div>
        <p class="todo-text">${activity}</p>
    </li>
        `;
    })

    // richiamo funzione check cliccabili 
    makeCheckClicable();
    


    }else{
    emptyListMessage.innerText = 'sembra che non ci siano attività';
    //ALTRIMENTI 
    //MOSTRA IN MESSAGIO DI LISTA VUOTA
    }
} 

// funzione per rendere i check cliccabili
function makeCheckClicable(newActivity){
    // cerca tutti i check e fa si che siano cliccabili
    const checks = document.querySelectorAll('.todo-check');
    // per ognuno dei check 
    checks.forEach(function(check, index){
    /// aggiungi una reazione al click
    check.addEventListener('click', function(){
        // rimuovi l'elemento dalla lista 
        activities.splice( index, 1);

        //aggiorna anche locale storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        // aggiorna la lista in pagina
        showcontent();
        });
    }); 
};

// funzione per aggiungere un attività 
function addActivity(newActivity){
    
    // se il campo non e vuoto
    if(newActivity.length > 0){

        //aggiungo l'attività nella lista
        activities.push(newActivity);

        // aggiorna lo storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        //ora, ridecidi cosa mostrare 
        showcontent();
    
        // svuoto il campo di testo
        inputField.value = '';
        };
};