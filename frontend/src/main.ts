import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// --- IMPORT AG GRID ---
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// --- ENREGISTREMENT GLOBAL ---
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
