(function() {
    // Create and inject CSS styles for the widget
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
            resize: none;
            min-width: 300px;
            max-width: 90vw;
            min-height: 300px;
            max-height: 90vh;
        }
        #chatbot-iframe iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        /* Resizable handle on the left */
        #resizable-handle {
            position: absolute;
            top: 0;
            left: 0;
            width: 10px;
            height: 100%;
            cursor: ew-resize;
            background-color: rgba(0, 0, 0, 0.1);
        }
        /* Resizable handle on the bottom */
        #resizable-handle-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 10px;
            cursor: ns-resize;
            background-color: rgba(0, 0, 0, 0.1);
        }
        /* Media query for smaller screens */
        @media (max-width: 768px) {
            #chatbot-iframe {
                width: 90%;
                height: 60%;
                top: auto;
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
                transform: none;
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
            <div id="resizable-handle"></div>
            <div id="resizable-handle-bottom"></div>
            <iframe id="chatbot-frame" frameborder="0" title="Chatbot Frame"></iframe>
        </div>
    `;
    document.body.appendChild(container);

    // Function to get current page URL and open the chatbot with it
    function openChatbot() {
        var currentUrl = encodeURIComponent(window.location.href);
        var iframe = document.getElementById('chatbot-frame');
        iframe.src = `http://10.1.6.81:8501?webapp_url=${currentUrl}`;
        document.getElementById('chatbot-iframe').style.display = 'block';
        document.getElementById('chatbot-button').innerHTML = '&#x2715;';
    }

    // Function to close the chatbot
    function closeChatbot() {
        document.getElementById('chatbot-iframe').style.display = 'none';
        document.getElementById('chatbot-button').innerHTML = '&#x1F4AC;';
    }

    // Button click event to toggle the chatbot
    document.getElementById('chatbot-button').onclick = function() {
        var iframe = document.getElementById('chatbot-iframe');
        if (iframe.style.display === 'none' || iframe.style.display === '') {
            openChatbot();
        } else {
            closeChatbot();
        }
    };

    // Resizing Logic for Smooth Horizontal and Vertical Resizing
    var iframeContainer = document.getElementById('chatbot-iframe');
    var resizableHandle = document.getElementById('resizable-handle');
    var resizableHandleBottom = document.getElementById('resizable-handle-bottom');
    var isResizingX = false;
    var isResizingY = false;
    var startX = 0;
    var startY = 0;
    var startWidth = 0;
    var startHeight = 0;

    function handleMouseMoveX(e) {
        var newWidth = startWidth - (e.clientX - startX);
        if (newWidth > 300 && newWidth < window.innerWidth * 0.9) {
            iframeContainer.style.width = newWidth + 'px';
        }
    }

    function handleMouseMoveY(e) {
        var newHeight = startHeight + (e.clientY - startY);
        if (newHeight > 300 && newHeight < window.innerHeight * 0.9) {
            iframeContainer.style.height = newHeight + 'px';
        }
    }

    function stopResizing() {
        isResizingX = false;
        isResizingY = false;
        document.removeEventListener('mousemove', handleMouseMoveX);
        document.removeEventListener('mousemove', handleMouseMoveY);
        document.removeEventListener('mouseup', stopResizing);
    }

    // Horizontal Resizing from Left
    resizableHandle.addEventListener('mousedown', function(e) {
        isResizingX = true;
        startX = e.clientX;
        startWidth = parseInt(document.defaultView.getComputedStyle(iframeContainer).width, 10);
        document.addEventListener('mousemove', handleMouseMoveX);
        document.addEventListener('mouseup', stopResizing);
        e.preventDefault();
    });

    // Vertical Resizing from Bottom
    resizableHandleBottom.addEventListener('mousedown', function(e) {
        isResizingY = true;
        startY = e.clientY;
        startHeight = parseInt(document.defaultView.getComputedStyle(iframeContainer).height, 10);
        document.addEventListener('mousemove', handleMouseMoveY);
        document.addEventListener('mouseup', stopResizing);
        e.preventDefault();
    });
})();
