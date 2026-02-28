export function analyze(data: any) {

    const typingSpeed = Number(data.typingSpeed) || 0;
    const focusScore = Number(data.focusScore) || 0;
    const burnoutRisk = data.burnoutRisk || "Low";

    // Stability formula (balanced)
    const stabilityIndex = Math.round(
        (focusScore * 0.6) +
        (Math.min(typingSpeed, 200) / 200) * 40
    );

    return {
        typingSpeed,
        focusScore,
        burnoutRisk,
        stabilityIndex
    };
}
