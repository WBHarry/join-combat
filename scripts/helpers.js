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

    const currentCombatantId = game.combat.current.combatantId;
    if(!currentCombatantId){
        return {};
    }

    const currentInitiative = game.combat.data.combatants.find(x => x.id === currentCombatantId)?.data?.initiative;
    if(currentInitiative === undefined){
        return {};
    }

    const dice = Math.max(currentInitiative-1, 0);

    return { formula: dice ? `1d${dice}` : '0' };
}