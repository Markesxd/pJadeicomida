function update() {
    const elements = {
        manha: document.querySelector('#manha'),
        tarde: document.querySelector('#tarde'),
        pate: document.querySelector('#pate'),
        noite: document.querySelector('#noite')
    }
    
    for(const element in elements) {
        if(elements[element].value === '0' && elements[element].checked) {
            eval(`${element} = parseInt(cookies.person)`);
        } else if(elements[element].value !== '0' && !elements[element].checked) {
            eval(`${element} = 0`);
        }
    }

    loading();
    fetch('/api', { 
        method: 'POST',
        headers: {
            "Content-Type": 'application/json' 
        },
        body: JSON.stringify({
            manha,
            tarde,
            pate,
            noite
        })
    }).then( () => {
        loadMessage('Atualizado com sucesso!');
    }).catch((e) => {
        console.error(e);
        loadMessage('Opa! Algo de errado aconteceu. Tente novamente mais tarde.');
    })
}

function loading() {
    document.querySelector('#root')
    .innerHTML = `
    <div class="loadingWrapper">
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#000">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>
    </div>
    `;
}

function loadMessage(message) {
    document.querySelector('#root')
    .innerHTML = `
    <svg class="bar_icon" onclick="openMenu()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    <h1 class="title">Já dei comida?</h1>
    <p class="message">${message}</p>            
    `;
}

function loadPage() {
    const root = document.querySelector('#root');
    root.innerHTML = `
    <svg class="bar_icon" onclick="openMenu()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    <h1 class="title">Já dei comida?</h1>
    <div class="checkList">
        <span >
            <input class="larger" type="checkbox" id="manha"><label for="manha">Café</label>
        </span>
        <span>
            <input class="larger" type="checkbox" id="tarde"><label for="tarde">Almoço</label>
        </span>
        <span>
            <input class="larger" type="checkbox" id="pate"><label for="pate">Patê</label>
        </span>
        <span>
            <input class="larger" type="checkbox" id="noite"><label for="noite">Jantar</label>
        </span>
    </div>
    <nav class="botaoNav">
        <button class="botao" onclick="update()">Atualizar</button>
    </nav>`;
}

function loadMain() {
    loading();
    fetch('/api').then(
        async (response) => {
            try {
                const body = await response.json();
                loadPage();
                manha = body.manha; 
                tarde = body.tarde; 
                pate = body.pate; 
                noite = body.noite;
                document.querySelector('#manha').checked = manha; 
                document.querySelector('#tarde').checked = tarde; 
                document.querySelector('#pate').checked = pate; 
                document.querySelector('#noite').checked = noite; 
                document.querySelector('#manha').value = manha; 
                document.querySelector('#tarde').value = tarde; 
                document.querySelector('#pate').value = pate; 
                document.querySelector('#noite').value = noite; 
            } catch(e) {
                console.error(e);
                loadMessage('Algum erro aconteceu, Tente novamente mais tarde.');
            }
    
    });
}

function openMenu() {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.id = "menu";
    menu.innerHTML = `
    <nav class="menu_nav">
        <svg class="bar_icon" onclick="closeMenu()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        <nav class="menu_subnav">
            <svg class="bar_icon" onclick="loadMain()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            <svg class="bar_icon" onclick="loadLogin()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            <svg class="bar_icon" onclick="loadMessage('Isso não faz nada ainda')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z"/></svg>
        </nav>
    </nav>
    <h4 class="menu_title">Horarios:</h4>
    <p class="menu_info">Café - 6:00</p>
    <p class="menu_info">Almoço - 12:00</p>
    <p class="menu_info">Patê - 18:00</p>
    <p class="menu_info">Jantar - 20:00</p>
    `;
    document.querySelector('#root').appendChild(menu);
}

function closeMenu() {
    const menu = document.querySelector("#menu");
    document.querySelector("#root").removeChild(menu);
}

function loadLogin() {
    document.querySelector('#root').innerHTML = `
    <svg class="bar_icon" onclick="openMenu()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    <h1 class="title">Quem é você?</h1>
    <div class="checkList">
    <span >
        <input class="larger" type="radio" name="person" id="rafa" value="1" checked><label for="rafa">Rafael</label>
    </span>
    <span>
        <input class="larger" type="radio" name="person" id="jane" value="2"><label for="jane">Jane</label>
    </span>
    <span>
        <input class="larger" type="radio" name="person" id="peter" value="3"><label for="peter">Peter</label>
    </span>
    <span>
        <input class="larger" type="radio" name="person" id="bella" value="4"><label for="bella">Isabella</label>
    </span>
</div>
<nav class="botaoNav">
    <button class="botao" onclick="logar()">Logar</button>
</nav>
    `
}

function logar() {
    const person = document.querySelector('input[name="person"]:checked');
    const expires = new Date('2100-01-01');
    document.cookie = `person=${person.value};expires=${expires.toUTCString()}`;
    readCookies(cookies);
    loadMain();
}

function readCookies(cookies) {
    if(cookies === undefined) {
        cookies = {}
    }
    const cookieAsString = document.cookie.split('; ');
    for(const cookie of cookieAsString) {
        const [key, value] = cookie.split('='); 
        cookies[key] =value;
    }
    return cookies;
}

const cookies = readCookies();
let manha = 0, tarde = 0, pate = 0, noite = 0;
if(cookies.person) {
    loadMain();
} else {
    loadLogin();
}

// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function () {
//         navigator.serviceWorker
//             .register("serviceWorker")
//             .then(res => console.log("service worker registered"))
//             .catch(err => console.log("service worker not registered", err))
//     })
// }