@extends('layouts.app')

@section('content')

    <script>
        Echo.channel('test')
            .listen('Test', (e) => {
                console.log(e);
            });
    </script>

@endsection
