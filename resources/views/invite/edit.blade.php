@extends('layouts.app')

@section('content')
    <div class="container" >
        <div class="row justify-content-around">
            <div class="col-lg-8 ">
                <div class="card mt-5">
                    <div class="card-header">
                        <h5>
                            <strong> {{ __('Configuracion de parametros de una reunion ')}}</strong>
                        </h5>
                    </div>
                    <div class="card-body">
                        <form action="{{route('invite.update', [$meet->id, $invite->id])}}" method="POST">
                            @csrf
                            @method('PUT')
                            <div>
                                <h5 class="small font-weight-bold text-center text-danger">
                                    <li>Para generar un codigo sin limites, genera la sala sin cambiar nada </li>
                                </h5>
                            </div>

                            <div>
                                <label for="name">Nombre:</label>
                                <input type="text" value="{{$meet->name}}" placeholder="Nombre de la reunion" name="name">
                            </div>
                            <div>
                                <label for="description">Descripcion:</label>
                                <input type="text" value="{{$meet->description}}" placeholder="Description de la reunion" name="description">
                            </div>
                            <div>
                                <label for="max_usages">Cantidad de invitados:</label>
                                <input type="number" value="{{$invite->max_usages}}" placeholder="cant de invitados" min="0" max="35" name="max_usages">
                            </div>
                            <div>
                                <label for="expires_at">Fecha de expiracion establecidad a: <strong>{{$invite->expires_at}}</strong> , cambiar a: </label>
                                <input type="date" name="expires_at">
                            </div>
                            <button type="submit" class="btn" style="background-color: #F06449; color: #FFFFFF">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
