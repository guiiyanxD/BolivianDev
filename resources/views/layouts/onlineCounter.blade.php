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
            update_online_counter();
        })
        .joining((user) => {
            onlineUsers++;
            update_online_counter();
        })
        .leaving((user) => {
            onlineUsers--;
            update_online_counter();
        }).
        error((error)=>{
            console.log(error)
        });

</script>
