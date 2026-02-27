import * as vscode from 'vscode';

let panel: vscode.WebviewPanel | undefined;

export function createOrUpdatePanel(
    context: vscode.ExtensionContext
): vscode.WebviewPanel {

    if (panel) {
        return panel;
    }

    panel = vscode.window.createWebviewPanel(
        'cognitiveSignature',
        'Cognitive Signature Dashboard',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getHtml();

    panel.onDidDispose(() => {
        panel = undefined;
    });

    return panel;
}

function getHtml(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            body {
                background:#1e1e1e;
                color:white;
                font-family:sans-serif;
                padding:20px;
            }

            h1 {
                transition: all 0.5s ease;
            }

            .glow {
                color: orange;
                text-shadow: 0 0 10px orange;
            }

            .section {
                margin-top: 25px;
            }

            .bar-container {
                width: 100%;
                height: 20px;
                background: #444;
                border-radius: 10px;
                margin-top: 10px;
            }

            .bar-fill {
                height: 100%;
                width: 0%;
                background: green;
                border-radius: 10px;
                transition: width 0.5s ease;
            }

            footer {
                margin-top: 40px;
                font-size: 12px;
                opacity: 0.6;
            }
        </style>
    </head>
    <body>

        <h1 id="dashboardTitle">🧠 Cognitive Signature Dashboard</h1>

        <div class="section">
            <h2 id="profileTitle">Initializing...</h2>
            <p id="insight"></p>
        </div>

        <div class="section">
            <h3>Behavioral Metrics</h3>
            <p><b>Typing Speed:</b> <span id="typing">0</span> keys/min</p>
            <p><b>Focus Score:</b> <span id="focus">0</span>/100</p>
            <p><b>Burnout Risk:</b> <span id="burnout">Low</span></p>
        </div>

        <div class="section">
            <h3>Performance Stability Index</h3>
            <p>Composite performance resilience score</p>
            <p><b>Cognitive Stability Index:</b> <span id="stability">0</span>/100</p>
            <div class="bar-container">
                <div id="stabilityBar" class="bar-fill"></div>
            </div>
        </div>

        <div class="section">
            <h3>Cognitive Load Timeline</h3>
            <canvas id="focusChart" height="100"></canvas>
        </div>

        <footer>
            All analysis runs locally. No behavioral data leaves your machine.
        </footer>

        <script>
            const ctx = document.getElementById('focusChart').getContext('2d');
            const titleEl = document.getElementById('dashboardTitle');

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Focus Score',
                            data: [],
                            borderColor: 'yellow'
                        },
                        {
                            label: 'Typing Speed',
                            data: [],
                            borderColor: 'cyan'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { ticks: { color: "white" }},
                        y: { ticks: { color: "white" }}
                    }
                }
            });

            window.addEventListener('message', event => {

                const data = event.data;

                document.getElementById('typing').textContent = data.typingSpeed.toFixed(2);
                document.getElementById('focus').textContent = data.focus;
                document.getElementById('profileTitle').textContent = data.title;
                document.getElementById('insight').textContent = data.insight;
                document.getElementById('stability').textContent = data.stability;

                const burnout =
                    data.focus < 30 ? "High"
                    : data.focus < 60 ? "Moderate"
                    : "Low";

                document.getElementById('burnout').textContent = burnout;

                // Stability bar
                const bar = document.getElementById('stabilityBar');
                bar.style.width = data.stability + "%";

                if (data.stability > 75) {
                    bar.style.background = "green";
                } else if (data.stability > 40) {
                    bar.style.background = "orange";
                } else {
                    bar.style.background = "red";
                }

                // Glow effect for deep focus
                if (data.focus > 75 && data.typingSpeed > 100) {
                    titleEl.classList.add('glow');
                    setTimeout(() => {
                        titleEl.classList.remove('glow');
                    }, 5000);
                }

                chart.data.labels.push('');
                chart.data.datasets[0].data.push(data.focus);
                chart.data.datasets[1].data.push(data.typingSpeed);

                if (chart.data.labels.length > 20) {
                    chart.data.labels.shift();
                    chart.data.datasets.forEach(ds => ds.data.shift());
                }

                chart.update();
            });
        </script>

    </body>
    </html>
    `;
}