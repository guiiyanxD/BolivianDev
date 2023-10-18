<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Probando JsUML2</title>
    <link type="text/css" rel="stylesheet" href="{{asset('jsuml2/build/css/UDStyle.css')}}" media="screen">
    <script type=‘text/javascript’ src="{{asset('jsuml2/build/UDCore.js')}} "></script>
    <script type=‘text/javascript’ src="{{asset('jsuml2/build/UDModules.js')}}"></script>

</head>
<body>

<script>
    window.onload = function() {
        var width = screen.availWidth - 250;
        var height = screen.availHeight;

        if(width < 400)  width = width+250;
        if(width > 1000) width = 1000;

        const app = new Application({id: 'umldiagram', width: width, height: height});
    }
</script>
</body>
</html>
