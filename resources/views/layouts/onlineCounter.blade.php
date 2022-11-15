<script>
    /*
    * Script para el contador de usuarios que esta en linea
    * */
    let onlineUsers = 0;
    var meetId = {{$meet_id}};

    function update_online_counter() {
        document.getElementById('online').textContent = '' + onlineUsers;
    }

    window.Echo.join('meet.' + meetId )
        .here((users) => {
            onlineUsers = users.length;
            console.log('Estan aqui: ' + users.toString())
            update_online_counter();
        })
        .joining((user) => {
            onlineUsers++;
            console.log("acaba de entrar:" +  user.toString())
            update_online_counter();
        })
        .leaving((user) => {
            onlineUsers--;
            console.log('se fue: ' +user.toString())
            update_online_counter();
        })

</script>
