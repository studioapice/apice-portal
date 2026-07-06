/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Frustration {
  id: string;
  text: string;
  impact: string;
}

export interface SystemNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface Pillar {
  id: string;
  title: string;
  concept: string;
  description: string;
  visualMetaphor: string;
}

export interface PlatformItem {
  day: number;
  type: 'Reel' | 'Carrusel' | 'Testimonio' | 'Estrategia' | 'Empty';
  title: string;
  thumbnailUrl?: string;
  caption: string;
  strategyNote: string;
  duration?: string;
  pillar: string;
}

export interface StoryTransformation {
  clientName: string;
  niche: string;
  program: string;
  before: string;
  after: string;
  quote: string;
}
