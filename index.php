<!DOCTYPE html>
<!--
    Study Planner - Main Application Page
    This is the entry point of the application that loads all necessary
    dependencies and sets up the basic HTML structure.
-->
<html lang="en">
<head>
    <!-- Bootstrap CSS and JavaScript -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <!-- Meta tags for proper rendering and viewport handling -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>StudyPlanner Login</title>

    <!-- External Dependencies -->
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Cookie handling library -->
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
    <!-- jQuery for AJAX and DOM manipulation -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <!-- Application JavaScript Modules -->
    <script src="js/utils.js"></script>        <!-- Utility functions -->
    <script src="ajax.js"></script>           <!-- AJAX request handling -->
    <script src="js/login.js"></script>       <!-- Login functionality -->
    <script src="js/events.js"></script>      <!-- Event handling -->
    <script src="js/homepage.js"></script>    <!-- Homepage functionality -->
    <script src="js/notes.js"></script>       <!-- Notes functionality -->
    <script src="js/study.js"></script>       <!-- Study session handling -->
    <script src="js/subjects.js"></script>    <!-- Subject management -->
    <script src="js/todo.js"></script>        <!-- Todo list functionality -->
    <script src="js/topics.js"></script>      <!-- Topic management -->
    <script src="js/getData.js"></script>     <!-- Data retrieval functions -->

    <!-- Application Styling -->
    <link rel="stylesheet" href="css.css">
    
    <!-- Progressive Web App Support -->
    <link rel="manifest" href="manifest.json">

    <!-- Additional External Libraries -->
    <!-- URL detection and formatting -->
    <script src="https://cdn.jsdelivr.net/npm/linkifyjs@3.0.3/dist/linkify.min.js"></script>
    <!-- Timer functionality -->
    <script src='https://ocrebb776.github.io/OcrebbtimerJS/timer.js'></script>
    
    <!-- Core application logic -->
    <script src="general.js"></script>
</head>
<body>
    <!-- Application Header -->
    <div class="container p-1">
        <div class="h1">STUDY PLANNER <span id='nameGoesHere'></span></div>
    </div>
    
    <!-- Modal popup container -->
    <div class="modal fade" id="popup" role="dialog"></div>
</body>

<!-- Main application wrapper -->
<div id="wrapper"></div>
</html>