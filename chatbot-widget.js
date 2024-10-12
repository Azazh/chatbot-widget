(function() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        #chatbot-container {
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
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
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        }
        #chatbot-button:hover {
            background-color: #0d8ecf;
        }
        #chatbot-iframe {
            position: fixed;
            top: 50%;
            right: 70px;
            transform: translateY(-50%);
            width: 350px;
            height: 500px;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            display: none;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            resize: both;
            min-width: 300px;
            min-height: 300px;
            max-width: 90vw;
            max-height: 90vh;
        }
        #chatbot-iframe iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        /* Media query for smaller screens */
        @media (max-width: 768px) {
            #chatbot-iframe {
                width: 90%;
                height: 60%;
                bottom: 10px;
                right: 10px;
                transform: none;
            }
            #chatbot-button {
                width: 45px;
                height: 45px;
            }
        }
        /* Media query for extra small screens */
        @media (max-width: 480px) {
            #chatbot-iframe {
                width: 100%;
                height: 70%;
                right: 0px;
                bottom: 0px;
                border-radius: 0;
            }
            #chatbot-button {
                width: 40px;
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
            &#x1F4AC;
        </div>
        <div id="chatbot-iframe">
            <iframe id="chatbot-frame" frameborder="0" title="Chatbot Frame"></iframe>
        </div>
    `;
    document.body.appendChild(container);

    function openChatbot() {
        var currentUrl = encodeURIComponent(window.location.href);
        var iframe = document.getElementById('chatbot-frame');
        iframe.src = `http://10.1.6.81:8501?webapp_url=${currentUrl}`;
        document.getElementById('chatbot-iframe').style.display = 'block';
        document.getElementById('chatbot-button').innerHTML = '&#x2715;';
    }

    function closeChatbot() {
        document.getElementById('chatbot-iframe').style.display = 'none';
        document.getElementById('chatbot-button').innerHTML = '&#x1F4AC;';
    }

    document.getElementById('chatbot-button').onclick = function() {
        var iframe = document.getElementById('chatbot-iframe');
        if (iframe.style.display === 'none' || iframe.style.display === '') {
            openChatbot();
        } else {
            closeChatbot();
        }
    };

})();
