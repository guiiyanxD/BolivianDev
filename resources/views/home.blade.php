@extends('layouts.app')

@section('content')
<div class="container" >
    <div class="row justify-content-around">
        <div class="col-lg-8 ">
            <div class="card mt-5">
                @if(session('message'))
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" >
                        {{session('message')}}
                    </div>
                @endif
                    @if(session('editedInvitation'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert" >
                            {{session('editedInvitation')}}
                        </div>
                    @endif
                    <div class="card-header">{{ __('Dashboard') }}</div>

                    <div class="card-body">

                        <h5 class="font-weight-bold">{{ __('Ya has iniciado sesion! Ahora a diagramar') }}</h5>
                        <!-- El modal comeinza aca -->

                        <div class="card mt-2">
                            <div class="card-header" style="background-color: #36382E">
                                <h5 class="card-title" style="color: #5BC3EB">{{__('Generar codigo')}}</h5>
                            </div>

                            <div class="card-body">
                                <form action="{{route('meet.storeAsHost')}}" method="POST">
                                    @csrf
                                    @method('POST')
                                    <div>
                                        <h5 class="small font-weight-bold text-center text-danger">
                                            <li>Para generar un codigo sin limites, genera la sala sin cambiar nada </li>
                                        </h5>
                                    </div>

                                    <div>
                                        <label for="name">Nombre</label>
                                        <input type="text" placeholder="Nombre de la reunion" name="name">
                                    </div>
                                    <div>
                                        <label for="description">Descripcion</label>
                                        <input type="text" placeholder="Description de la reunion" name="description">
                                    </div>
                                    <div>
                                        <label for="max">Cantidad de invitados</label>
                                        <input type="number" placeholder="cant de invitados" min="0" max="35" name="max">
                                    </div>
                                    <div>
                                        <label for="fecha">Fecha de expiracion</label>
                                        <input type="date" name="fecha">
                                    </div>
                                    <button type="submit" class="btn" style="background-color: #F06449; color: #FFFFFF">Generar</button>
                                </form>
                            </div>
                        </div>

                        <hr>
                        <div class="card">
                            <div class="card-header" style="background-color: #36382E">
                                <h5 class="card-title" style="color: #5BC3EB">{{__('O unete a una sesion ya existente')}}</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="{{route('meet.storeAsGuest')}}" method="POST">
                                @csrf
                                @method('POST')
                                <input type="text" placeholder="coloca el codigo aqui" name="invite_code">
                                <button class="btn" type="submit" style="background-color: #F06449; color: #FFFFFF" >
                                    Unete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        <div class="col-lg-4 ">
            <div class="card mt-5 mb-5">
                <div class="card-header">
                    {{ __('Continua tu trabajo con tus salas creadas') }}
                </div>
                <div class="card-body" style="height: 37em; overflow-y: auto">
                    <div>
                    @foreach($meets as $meet)
                        <p>
                            <strong>Nombre:</strong> {{$meet->meets->name}}
                            <br>
                            <strong>Descripcion:</strong>{{$meet->meets->description}}
                            <br>
                            <strong>Maxima Cantidad de invitados:</strong>  {{$meet->meets->invite->max_usages}}
                            <br>
                            <strong>Veces que el codigo fue usado:</strong>  {{$meet->meets->invite->uses}}
                            <br>
                            <strong>Fecha de expiracion:</strong> {{$meet->meets->invite->expires_at}}
                        </p>

                        <div>
                            <a class="btn btn-info" href="{{route('invite.edit', [$meet->meets->id, $meet->meets->invite->id])}}">
                                Editar
                            </a>
                            <a class="btn btn-success">
                                Entrar
                            </a>
                        </div>
                        <hr>
                    @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>




</div>
@endsection
