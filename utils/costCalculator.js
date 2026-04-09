function getPlanLimits(plan) {
    const plans = {
        starter: { minutes: 200, price: 1999, extra_per_min: 5 },
        growth: { minutes: 500, price: 3999, extra_per_min: 4 },
        scale: { minutes: 1500, price: 7999, extra_per_min: 3 },
    };

    return plans[plan] || plans.starter;
}

function calculateExtraCharges(minutesUsed, plan) {
    const limits = getPlanLimits(plan);
    const overageMinutes = Math.max(0, minutesUsed - limits.minutes);
    return overageMinutes * limits.extra_per_min;
}

module.exports = {
    getPlanLimits,
    calculateExtraCharges,
};
