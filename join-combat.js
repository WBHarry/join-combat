import { createToken } from './scripts/createToken.js';
import { renderSceneControls } from './scripts/renderSceneControls.js';

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
   await renderSceneControls(html);
});

Hooks.on('createToken', async (document, _, userId) => {
    await createToken(document, userId);
});