export function analyze(data: any) {

    const focusScore =
        data.fileSwitches > 10 ? 20 :
        data.fileSwitches > 5 ? 50 :
        80;

    const burnoutRisk =
        focusScore < 30 ? "High" :
        focusScore < 60 ? "Moderate" :
        "Low";

    const typingSpeed = data.typingSpeed;

    // 🔥 Composite Cognitive Stability Index (0–100)
    const stabilityIndex = Math.round(
        (focusScore * 0.6) +
        (Math.min(typingSpeed, 120) / 120) * 30 +
        (burnoutRisk === "Low" ? 10 : burnoutRisk === "Moderate" ? 5 : 0)
    );

    return {
        typingSpeed,
        focusScore,
        burnoutRisk,
        stabilityIndex
    };
}