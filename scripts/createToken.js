import { getInitiativeOptions } from './helpers.js';

export const createToken = async (document, userId) => {
    const dmCreated = game.user.isGM && game.user.id === userId;
    const activeCombat = Boolean(game.combat);
    if(activeCombat && dmCreated && game.settings.get('join-combat', 'active')){
        const token = await document.object.toggleCombat(); 
        const newCombatant = game.combat.combatants.find(x => x.token.id === token.id);
        await game.combat.rollInitiative([newCombatant.id], getInitiativeOptions());
    }
};