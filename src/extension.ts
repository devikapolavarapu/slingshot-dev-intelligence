import * as vscode from 'vscode';
import { Tracker } from './tracker';
import { analyze } from './analyzer';
import { generateProfile } from './profileGenerator';
import { createOrUpdatePanel } from './webview';

let tracker: Tracker;
let interval: NodeJS.Timeout;
let lastState: string = "";

// =============================
// 🧠 Flow State Tracking
// =============================
let flowStart: number | null = null;
let maxFlowDuration: number = 0;
const FLOW_THRESHOLD = 30000; // 30 seconds sustained flow

// =============================
// 📊 Session Tracking
// =============================
let sessionStart: number = Date.now();
let totalFocusScore: number = 0;
let intervalCount: number = 0;
let burnoutCount: number = 0;
let peakTypingSpeed: number = 0;

export function activate(context: vscode.ExtensionContext) {

    console.log("COGNITIVE EXTENSION ACTIVATED");

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
        // 🧠 FLOW STATE DETECTION
        // =============================

        const isFlowCandidate =
            analyzed.focusScore > 75 &&
            analyzed.typingSpeed >= 80 &&
            analyzed.typingSpeed <= 160 &&
            rawData.isFocused;

        if (isFlowCandidate) {

            if (!flowStart) {
                flowStart = now;
            }

            const duration = now - flowStart;

            if (duration > maxFlowDuration) {
                maxFlowDuration = duration;
            }

            if (duration >= FLOW_THRESHOLD) {

                vscode.window.setStatusBarMessage(
                    `🧠 FLOW STATE ACTIVE (${(duration / 1000).toFixed(0)}s)`,
                    5000
                );

                flowStart = null; // reset after confirmation
            }

        } else {
            flowStart = null;
        }

        // =============================
        // 🔥 Deep Work Detection (Legacy)
        // =============================

        if (analyzed.focusScore > 75 && analyzed.typingSpeed > 100) {
            vscode.window.setStatusBarMessage("🔥 Deep Focus Mode", 3000);
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
        // 🤖 Smart State Engine
        // =============================

        let currentState = "";

        if (analyzed.burnoutRisk === "High") {
            currentState = "burnout";
        }
        else if (analyzed.focusScore > 75 && analyzed.typingSpeed > 120) {
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
                    vscode.window.setStatusBarMessage(
                        "✅ Workflow stabilized.",
                        3000
                    );
                    break;
            }
        }

        // =============================
        // 📈 Session Summary (10 mins)
        // =============================

        const sessionDuration = now - sessionStart;

        if (sessionDuration > 600000) {

            const avgFocus = Math.round(totalFocusScore / intervalCount);

            vscode.window.showInformationMessage(
                `📊 Session Summary

Avg Focus: ${avgFocus}
Peak Typing Speed: ${peakTypingSpeed}
Burnout Events: ${burnoutCount}
Longest Flow Duration: ${(maxFlowDuration / 60000).toFixed(2)} mins`
            );

            sessionStart = now;
            totalFocusScore = 0;
            intervalCount = 0;
            burnoutCount = 0;
            peakTypingSpeed = 0;
            maxFlowDuration = 0;
        }

    }, 5000);
}

export function deactivate() {
    if (interval) {
        clearInterval(interval);
    }
}
