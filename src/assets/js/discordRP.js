"use strict";

const DiscordRPC = require('discord-rpc');

// DISCORD RICH PRESENCE
const clientId = '1186059125470285936';
const startTimestamp = new Date();

const activity = {
    state: 'Dans le launcher',
    startTimestamp,
    largeImageKey: 'launcher-neve-2',
    largeImageText: 'Version 2.0.5',
    smallImageKey: 'neve',
    smallImageText: 'Neve Launcher',
    instance: false,
};

DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
let isRPCActive = false;

// Fonction asynchrone pour démarrer le RPC
async function start() {
    try {
        await rpc.login({ clientId });
        await rpc.setActivity(activity);
        isRPCActive = true;
        console.log('Activité RPC définie avec succès.');
    } catch (error) {
        console.error('Erreur lors du démarrage de RPC:', error);
    }
}

// Fonction asynchrone pour arrêter le RPC
async function stop() {
    if (isRPCActive) {
        try {
            await rpc.destroy();
            isRPCActive = false;
            console.log('Connexion RPC fermée avec succès.');
        } catch (error) {
            console.error('Erreur lors de la fermeture de RPC:', error);
        }
    } else {
        console.log('RPC n\'est pas actif, aucune action requise.');
    }
}

module.exports = {
    start,
    stop
};
