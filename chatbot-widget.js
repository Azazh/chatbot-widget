(function() {
    // Create and inject CSS styles for the widget
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        #chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        #chatbot-button {
            background-color: #1ab5f1;
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
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
            display: none;
        }
        #chatbot-iframe iframe {
            width: 100%;
            height: 100%;
        }
    `;
    document.head.appendChild(style);

    // Create the chatbot container
    var container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = `
        <div id="chatbot-button">
            <img src="chat-icon.png" alt="Chat" width="50px" />
        </div>
        <div id="chatbot-iframe">
            <iframe id="chatbot-frame" frameborder="0"></iframe>
        </div>
    `;
    document.body.appendChild(container);

    // Function to get current page URL and update the iframe src
    function openChatbot() {
        var currentUrl = encodeURIComponent(window.location.href);  // Encode the URL
        var iframe = document.getElementById('chatbot-frame');
        iframe.src = `http://10.1.6.81:8501?webapp_url=${currentUrl}`;  // Append the current URL as query parameter
        iframe.style.display = 'block';
    }

    // Toggle chatbot visibility and pass web app URL
    document.getElementById('chatbot-button').onclick = function() {
        var iframe = document.getElementById('chatbot-iframe');
        if (iframe.style.display === 'none') {
            openChatbot();
        } else {
            iframe.style.display = 'none';
        }
    };
})();
