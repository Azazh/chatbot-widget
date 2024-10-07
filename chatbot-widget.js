(function() {
    // Create and inject CSS styles for the widget
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        #chatbot-container {
            position: fixed;
            top: 20px;  
            right: 20px; 
            z-index: 1000;
        }
        #chatbot-button {
            background-color: #1ab5f1;
            border-radius: 50%;
            padding: 15px;
            cursor: pointer;
            font-size: 20px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for better visibility */
            transition: background-color 0.3s ease; /* Smooth hover effect */
        }
        #chatbot-button:hover {
            background-color: #0d8ecf; /* Darker hover color */
        }
        #chatbot-iframe {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 350px;
            height: 500px;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            display: none; /* Hide iframe by default */
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Add shadow for better visibility */
        }
        #chatbot-iframe iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        /* Media query for smaller screens */
        @media (max-width: 768px) {
            #chatbot-iframe {
                width: 90%;  /* Make the iframe 90% of the screen width */
                height: 60%; /* Make the iframe 60% of the screen height */
                bottom: 10px; /* Adjust bottom position */
                right: 5px;   /* Adjust right position */
            }
            #chatbot-button {
                width: 45px;  /* Reduce button size for smaller screens */
                height: 45px;
            }
        }
        /* Media query for extra small screens */
        @media (max-width: 480px) {
            #chatbot-iframe {
                width: 100%;  /* Full width for very small screens */
                height: 70%;  /* Increased height for small screens */
                right: 0px;
                bottom: 0px;
                border-radius: 0; /* Remove border radius */
            }
            #chatbot-button {
                width: 40px;  /* Further reduce button size */
                height: 40px;
            }
        }
    `;
    document.head.appendChild(style);

    // Create the chatbot container
    var container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = `
        <div id="chatbot-button" aria-label="Chatbot Button">
            &#x1F4AC; <!-- Chat bubble Unicode icon -->
        </div>
        <div id="chatbot-iframe">
            <iframe id="chatbot-frame" frameborder="0" title="Chatbot Frame"></iframe>
        </div>
    `;
    document.body.appendChild(container);

    // Function to get current page URL and open the chatbot with it
    function openChatbot() {
        var currentUrl = encodeURIComponent(window.location.href);  // Get and encode the current URL
        var iframe = document.getElementById('chatbot-frame');
        
        // Set the chatbot iframe source, passing the current URL as a parameter
      //  iframe.src = `http://192.168.8.57:8501?webapp_url=${currentUrl}`; 
        iframe.src = ` http://localhos:8501?webapp_url=${currentUrl}`;  

        
        // Display the iframe
        document.getElementById('chatbot-iframe').style.display = 'block';
    }

    // Button click event to toggle the chatbot
    document.getElementById('chatbot-button').onclick = function() {
        var iframe = document.getElementById('chatbot-iframe');
        
        if (iframe.style.display === 'none') {
            openChatbot();  // Open chatbot and pass the current URL
        } else {
            iframe.style.display = 'none';  // Hide the chatbot if it's open
        }
    };
})();
