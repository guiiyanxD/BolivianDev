@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card mt-5">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">

                    <h5 class="font-weight-bold">{{ __('Ya has iniciado sesion! Ahora a diagramar') }}</h5>
                    <!-- El modal comeinza aca -->

                        <div class="card mt-2">
                            <div class="card-header" style="background-color: #36382E">
                                <h5 class="card-title" style="color: #5BC3EB">{{__('Generar codigo')}}</h5>
                            </div>

                            <div class="card-body">
                                <form action="{{route('invitation.store')}}" method="POST">
                                    @csrf
                                    @method('POST')
                                    <div>
                                        <h5 class="small font-weight-bold text-center text-danger">
                                            <li>Para generar un codigo sin limite de invitados seleccion cero </li>
                                        </h5>
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
                            <form action="{{route('board')}}" method="POST">
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
    </div>
</div>
@endsection
