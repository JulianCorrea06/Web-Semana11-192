

window.addEventListener('load', () => {

    var form = document.querySelector('form');
    
    var btns = document.querySelectorAll('ul button');

    function displayList() {
        fetch('api/people')
        .then(raw => {
            return raw.json();
        })
        .then(info => {
            var container = document.querySelector('.container');

            container.innerHTML = "";

            info.forEach((item) => {
                var listItem = document.createElement('ul');

                listItem.innerHTML = '<li>'+item.firstname+'</li><li>'+item.number+'</li><li>'+item.select_color+'</li><button>X</button>';

                container.appendChild(listItem);
            })
        });
    }
    
    displayList();

    btns.forEach(function (elem, index){
        elem.addEventListener('click', function(){

            var data = new URLSearchParams();
            data.append('indexToDelete', index)
            var promise = fetch('/api/people', {
                method: 'DELETE',
                body: data
            });
                promise.then(function(response){
                    return response.json();
                }).then(function(info){
                    displayList();
                    console.log(info)
                });
        });

    });

    
    
    
    

    form.addEventListener('submit', function(event){
        event.preventDefault();

        // transforma el formulario como DOM (lo que el usuario puede ver)
        // a una colección de datos (variables con valores)
        var formInfo = new FormData(form);
        // agrego esos datos a lo que vamos a enviar
        var data = new URLSearchParams(formInfo);

       /* data.append('adittional', 'algo adicional');
        data.append('date', Date.now());
        data.delete('firstname');*/

        var promise = fetch('/api/people', {
                method: 'POST',
                body: data
            });

        
        
        promise.then((raw) => {
                return raw.json();
            })
            .then((info) => {
                form.reset();
                displayList();
                console.log(info);
            });
    });

});