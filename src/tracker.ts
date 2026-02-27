import * as vscode from 'vscode';

export class Tracker {

    private keystrokes = 0;
    private lastReset = Date.now();
    private fileSwitches = 0;

    startTracking(context: vscode.ExtensionContext) {

        vscode.workspace.onDidChangeTextDocument(() => {
            this.keystrokes++;
        }, null, context.subscriptions);

        vscode.window.onDidChangeActiveTextEditor(() => {
            this.fileSwitches++;
        }, null, context.subscriptions);
    }

    getData() {
        const now = Date.now();
        const minutes = (now - this.lastReset) / 60000;

        const typingSpeed = minutes > 0 ? this.keystrokes / minutes : 0;

        const data = {
            typingSpeed,
            fileSwitches: this.fileSwitches
        };

        // reset counters
        this.keystrokes = 0;
        this.fileSwitches = 0;
        this.lastReset = now;

        return data;
    }
}