export function generateProfile(analyzed: any) {

    if (analyzed.focusScore < 30) {
        return {
            title: "⚡ High Context Switcher",
            insight: "Frequent file switching detected. You may be multitasking heavily."
        };
    }

    if (analyzed.typingSpeed > 100) {
        return {
            title: "🔥 Hyper Productive Mode",
            insight: "You are coding at high speed. Stay consistent."
        };
    }

    return {
        title: "⚖ Balanced Developer",
        insight: "Your workflow shows moderate typing speed and reasonable focus."
    };
}