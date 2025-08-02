#!/usr/bin/env ts-node
export {}
import { FactionColors } from './designTokens'
import assert from 'assert'

assert.deepStrictEqual(FactionColors, {
  Aetherion: '#00E5FF',
  Thermoclan: '#FF3D00',
  VorrTech: '#D500F9',
  Novarkh: '#FFD600',
})

console.log('designTokens faction colors test passed')
