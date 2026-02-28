import * as vscode from 'vscode';

export class Tracker {

    private keystrokes: number = 0;
    private windowStart: number = Date.now();
    private isFocused: boolean = true;

    // Rolling 15-second behavioral window
    private readonly WINDOW_DURATION = 15000;

    startTracking(context: vscode.ExtensionContext) {

        // Track actual text edits
        const textChangeDisposable = vscode.workspace.onDidChangeTextDocument((event) => {

            if (!event?.contentChanges) return;

            for (const change of event.contentChanges) {
                if (change.text) {
                    this.keystrokes += change.text.length;
                }
            }
        });

        // Track window focus
        const focusDisposable = vscode.window.onDidChangeWindowState((state) => {
            this.isFocused = state.focused;
        });

        context.subscriptions.push(textChangeDisposable);
        context.subscriptions.push(focusDisposable);
    }

    getData() {

        const now = Date.now();
        const elapsed = now - this.windowStart;

        // Calculate typing speed over rolling window
        const minutes = elapsed / 60000;

        let typingSpeed = minutes > 0
            ? this.keystrokes / minutes
            : 0;

        // Cap to realistic human maximum
        typingSpeed = Math.min(typingSpeed, 220);

        // Focus logic
        const focusScore = this.isFocused ? 80 : 30;

        // Burnout logic tuned to realistic range
        let burnoutRisk = "Low";

        if (typingSpeed > 180) burnoutRisk = "High";
        else if (typingSpeed > 140) burnoutRisk = "Moderate";

        // Reset rolling window every 15 seconds
        if (elapsed >= this.WINDOW_DURATION) {
            this.keystrokes = 0;
        }

        return {
            typingSpeed: Math.round(typingSpeed),
            focusScore,
            burnoutRisk,
            isFocused: this.isFocused
        };
    }
}
