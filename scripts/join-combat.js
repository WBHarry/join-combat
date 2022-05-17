import { getInitiativeOptions, isSystemSameRoundCompatible } from './helpers.js';

Hooks.once('init', () => {
    game.settings.register('join-combat', 'active', {
        name: 'Join Combat Active',
        hint: 'Roll Initiative for new tokens or not',
        scope: 'world',
        default: false,
        config: false,
        type: Boolean,
    });
    game.settings.register('join-combat', 'join-same-round', {
        name: 'Same Round',
        hint: '',
        scope: 'world',
        default: false,
        config: false,
        type: Boolean,
    });
});

Hooks.on('renderSceneControls', async (controls, html) => {
    if(game.user.isGM){
        const tokenSublist = $(html).find('ol.sub-controls').first();
        tokenSublist.append(await renderTemplate('modules/join-combat/templates/TokenButtons.hbs', {
            active: game.settings.get('join-combat', 'active'),
            joinSameRound: game.settings.get('join-combat', 'join-same-round'),
            sameRoundCompatible: isSystemSameRoundCompatible(),
        }));

        const activeButton = tokenSublist.find('.control-tool > .fas.fa-fist-raised');
        const sameRoundButton = tokenSublist.find('.control-tool > .far.fa-clock');

        activeButton.click(event => {
            const active = game.settings.get('join-combat', 'active');
            game.settings.set('join-combat', 'active', !active);
            $(event.currentTarget.parentElement).toggleClass('active');
            const sameRoundParent = $(sameRoundButton[0].parentElement);
            if(active){
                sameRoundParent.addClass('disabled');
                sameRoundParent.removeClass('active');
                sameRoundParent.prop('title', game.i18n.localize('joinCombat.navigation.toggleSameRoundDisabled'));
                game.settings.set('join-combat', 'join-same-round', false);
            }
            else {
                sameRoundParent.removeClass('disabled');
                sameRoundParent.prop('title', game.i18n.localize('joinCombat.navigation.toggleSameRound'));
            }
        });

        sameRoundButton.click(event => {
            const active = game.settings.get('join-combat', 'active');
            if(active){
                const sameRoundActive = game.settings.get('join-combat', 'join-same-round');
                game.settings.set('join-combat', 'join-same-round', !sameRoundActive);
                $(event.currentTarget.parentElement).toggleClass('active');
            }
        });
    }
});

Hooks.on('createToken', (document, _, userId) => {
    const dmCreated = game.user.isGM && game.user.id === userId;
    const activeCombat = Boolean(game.combat);
    if(activeCombat && dmCreated && game.settings.get('join-combat', 'active')){
        document.actor.rollInitiative({createCombatants: true, initiativeOptions: getInitiativeOptions()});
    }
});