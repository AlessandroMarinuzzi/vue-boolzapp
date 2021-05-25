const root = new Vue({
    el:"#root",

    data:{
        username: "Sandro",
        userImg: "./assets/img/avatar_io.jpg",
        visible: true,
        
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
        
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

        changingImg:"",
        changingName:"",
        selectedContact:{
            name: '',
            avatar: '',
            visible: true,
            messages:[{}]
        },
        msgBar:"",
        // **********************************************
        searchedContacts:"",
        // filteredContact:"",
        // ********************************************
    },

    methods: {
        getContactImg(index) {
            const contact = this.contacts[index];
            const imgPath = `./assets/img/avatar${contact.avatar}.jpg`;
            return imgPath
        },
    
        changeContactImg(index){
            const profilePic = this.contacts[index].avatar;
            this.changingImg = `./assets/img/avatar${profilePic}.jpg`
        },

        changeName(index){
            const changeName = this.contacts[index].name;
            this.changingName = changeName
            console.log(this.changingName);
            },

        selectContact(index){
            this.selectedContact = this.contacts[index]
            console.log(this.selectedContact);
        },

        getCurrentTime() {
            const currentTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
            return currentTime
        },

        sendMessage(){
            this.selectedContact.messages.push({
                date: root.getCurrentTime(),
                text: this.msgBar,
                status: 'sent'

            })
            this.msgBar = "";

            this.receiveMessage();
            // console.log(selectedContact);
        },

        receiveMessage() {
            setTimeout(function () {
                root.selectedContact.messages.push(
                    {
                        date: root.getCurrentTime(),
                        text: 'Ok',
                        status: 'received'
                    }
                );
            }, 1000);
        },
        // *************************************************
        search(){
            let searchedContact = this.searchedContacts.toLowerCase();
            console.log(this.searchedContacts);
            this.contacts.forEach((el)=>{
                let savedName = el.name.toLowerCase()
                if(savedName.includes(searchedContact)){
                    el.visible = true
                    
                } else {
                        el.visible = false
                        
                    }
            })
          
        },
        // *****************************************************

        dropMenu(index){
            let menu = document.querySelectorAll(".dropdown_menu");
            console.log(menu);
            if(menu[index].style.display === "" || menu[index].style.display === "none"){
                menu[index].style.display = "flex"
                console.log(menu[index].style.display);
            } else if (menu[index].style.display === "flex"){
                menu[index].style.display = "none"
            }
        },

        deletemsg(index){
            this.selectedContact.messages.splice(index, 1);
            let menu = document.querySelectorAll(".dropdown_menu");
            menu[index].style.display = "none"
        },

    },

    mounted() {
        this.selectedContact = this.contacts[0];
        this.changingImg = `./assets/img/avatar${this.selectedContact.avatar}.jpg`;
        this.changingName = this.contacts[0].name;
        


        // this.filteredContacts = this.contacts;

        // ATTEMPT TO SHUT ALL DROPDOWN MENUS ON ANY CLICK
        document.addEventListener('click', function (event) {
            const menu = document.querySelectorAll(".dropdown_menu");
            
            if (event.target.classList.contains('dropdown-arrow') || event.target.classList.contains('delete_message')) {
                return
            };

            menu.forEach(dropdown => {
                /* console.log(dropdown.style.display); */
                if (dropdown.style.display === 'flex') {
                    dropdown.style.display = 'none';
                }
            });
        }, true);
        
        // document.addEventListener("click",function(){
        //     document.querySelectorAll(".dropdown_menu").style.display = "none"
        // }, true);
    }
    
    
})
