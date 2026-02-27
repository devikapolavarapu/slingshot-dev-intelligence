import * as vscode from 'vscode';
import { Tracker } from './tracker';
import { analyze } from './analyzer';
import { generateProfile } from './profileGenerator';
import { createOrUpdatePanel } from './webview';

let tracker: Tracker;
let interval: NodeJS.Timeout;
let lastState: string = "";

// 🔥 Flow + Session Tracking
let deepFocusStart: number | null = null;
let maxDeepFocusDuration: number = 0;

let sessionStart: number = Date.now();
let totalFocusScore: number = 0;
let intervalCount: number = 0;
let burnoutCount: number = 0;
let peakTypingSpeed: number = 0;

export function activate(context: vscode.ExtensionContext) {

    tracker = new Tracker();
    tracker.startTracking(context);

    const panel = createOrUpdatePanel(context);

    interval = setInterval(() => {

        const rawData = tracker.getData();
        const analyzed = analyze(rawData);
        const profile = generateProfile(analyzed);

        const now = Date.now();

        // =============================
        // 📊 Session Metrics Tracking
        // =============================

        intervalCount++;
        totalFocusScore += analyzed.focusScore;

        if (analyzed.typingSpeed > peakTypingSpeed) {
            peakTypingSpeed = analyzed.typingSpeed;
        }

        if (analyzed.burnoutRisk === "High") {
            burnoutCount++;
        }

        // =============================
        // 🔥 Deep Work Detection
        // =============================

        if (analyzed.focusScore > 75 && analyzed.typingSpeed > 80) {

            if (!deepFocusStart) {
                deepFocusStart = now;
            }

            const duration = now - deepFocusStart;

            if (duration > maxDeepFocusDuration) {
                maxDeepFocusDuration = duration;
            }

            if (duration > 120000) { // 2 minutes
                vscode.window.showInformationMessage(
                    `🔥 Deep Work maintained for ${(duration / 60000).toFixed(2)} minutes`
                );
                deepFocusStart = null;
            }

        } else {
            deepFocusStart = null;
        }

        // =============================
        // 🧠 Dashboard Update
        // =============================

        panel.webview.postMessage({
            typingSpeed: analyzed.typingSpeed,
            focus: analyzed.focusScore,
            burnout: analyzed.burnoutRisk,
            stability: analyzed.stabilityIndex,
            title: profile.title,
            insight: profile.insight
        });

        // =============================
        // 🤖 Smart AI State Engine
        // =============================

        let currentState = "";

        if (analyzed.burnoutRisk === "High") {
            currentState = "burnout";
        }
        else if (analyzed.focusScore > 75 && analyzed.typingSpeed > 100) {
            currentState = "deepFocus";
        }
        else if (analyzed.focusScore < 40 && analyzed.typingSpeed < 40) {
            currentState = "contextSwitch";
        }
        else if (analyzed.typingSpeed === 0 && analyzed.focusScore > 70) {
            currentState = "thinking";
        }
        else {
            currentState = "normal";
        }

        if (currentState !== lastState) {

            lastState = currentState;

            switch (currentState) {

                case "burnout":
                    vscode.window.showWarningMessage(
                        "⚠ High burnout risk detected. Take a short break."
                    );
                    break;

                case "deepFocus":
                    vscode.window.showInformationMessage(
                        "🔥 Deep Focus Mode detected. Protect this flow state."
                    );
                    break;

                case "contextSwitch":
                    vscode.window.showInformationMessage(
                        "🧠 Frequent context switching detected. Try batching tasks."
                    );
                    break;

                case "thinking":
                    vscode.window.showInformationMessage(
                        "🧘 You appear to be thinking. Stay intentional."
                    );
                    break;

                case "normal":
                    vscode.window.showInformationMessage(
                        "✅ Workflow stabilized."
                    );
                    break;
            }
        }

        // =============================
        // 📈 Session Summary (10 mins)
        // =============================

        const sessionDuration = now - sessionStart;

        if (sessionDuration > 600000) { // 10 minutes

            const avgFocus = Math.round(totalFocusScore / intervalCount);

            vscode.window.showInformationMessage(
                `📊 Session Summary:
                
Avg Focus: ${avgFocus}
Peak Typing Speed: ${peakTypingSpeed.toFixed(2)}
Burnout Events: ${burnoutCount}
Longest Deep Work: ${(maxDeepFocusDuration / 60000).toFixed(2)} mins`
            );

            // Reset metrics
            sessionStart = now;
            totalFocusScore = 0;
            intervalCount = 0;
            burnoutCount = 0;
            peakTypingSpeed = 0;
            maxDeepFocusDuration = 0;
        }

    }, 5000);
}

export function deactivate() {
    if (interval) {
        clearInterval(interval);
    }
}