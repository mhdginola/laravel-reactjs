<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script>
        let {filter} = {filter:{
            name: "name",
            email: "email",
            lord: "map"
        }};
        let {search} = {search:{
            pass: "mdcn"
        }};
        search['phone'] = 123;
        search['pass'] = new regex filter?.name;
        search['role'] = filter.lord || "";
        console.log(filter);
        console.log(search);
    </script>
</head>
<body>
    <h1>Arr</h1>
</body>
</html>