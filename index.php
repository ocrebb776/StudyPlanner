<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1, initial-scale=1.0">
    <title>StudyPlanner Login</title>
    <script src="Login.js"></script>
    <script src="ajax.js"></script>

<!-- JQUERY CDN -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>


</head>
<body>

    <label for="username">Username:</label>
        <input name="username" id="username" type="text" required autocapitalize="false" autocomplete="username" placeholder="Username" >
        <br>
        <label for="Password">password:</label>
        <input name="password" id="password" type="password" required autocapitalize="false" autocomplete="password" placeholder="password"> 
    <br>
    <button id='LoginFormSubmit'>Login</button>
    </form>
</body>
</html>
