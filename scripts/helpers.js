const sameRoundCompatibleSystems = [
    'dnd5e',
];

export const isSystemSameRoundCompatible = () => {
    return Boolean(sameRoundCompatibleSystems.find(x => x === game.system.id));
}

export const getInitiativeOptions = () => {
    if(!game.settings.get('join-combat', 'join-same-round') || !isSystemSameRoundCompatible()){
        return {};
    }

    const lowestInitiative = game.combat.data.combatants.reduce((acc, c) => {
        if(acc === null){
            return c.data.initiative ? c : null;
        }

        return acc.data.initiative > c.data.initiative ? c : acc;
    }, null)?.data?.initiative;
    
    if(!lowestInitiative){
        return {};
    }

    const dice = Math.max(lowestInitiative-1, 0);

    return { formula: dice ? `1d${dice}` : '0' };
}