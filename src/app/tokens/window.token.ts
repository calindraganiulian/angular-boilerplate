import { InjectionToken } from '@angular/core';

/**
 * InjectionToken care poate fi folosit pentru a injecta obiectul `window`
 * într-un mod sigur pentru diverse platforme (browser, server, etc.).
 */
export const WINDOW = new InjectionToken<Window>('Global window object');
