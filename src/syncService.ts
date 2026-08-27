// Real-Time Cloud Sync Engine with Firebase Firestore
// Real-time bidirectional synchronization with onSnapshot and instant cross-tab broadcast

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import type { ReportStatusType } from './reportData';

export interface ReportStatusItem {
  status: ReportStatusType;
  progress: number;
  author: string;
  targetPages?: string;
  note: string;
  driveLink?: string;
}

export interface CustomSubSection {
  id: string;
  chapterNum: string;
  code: string;
  title: string;
  level2?: string;
  level3?: string;
  level4?: string;
  sartnameUyum?: string;
  scope?: string;
  defaultPages?: string;
  analizler?: any[];
}

export interface SectionOverride {
  code?: string;
  title?: string;
  level2?: string;
  level3?: string;
  defaultPages?: string;
  scope?: string;
  sartnameUyum?: string;
  analizler?: any[];
  deleted?: boolean;
}

export interface AppState {
  workStatus?: Record<string, any>;
  customRows?: Record<string, any>;
  rowOverrides?: Record<string, any>;
  analizOverrides?: Record<string, any>;
  reportStatus?: Record<string, ReportStatusItem>;
  customSubSections?: Record<string, CustomSubSection[]>;
  sectionOverrides?: Record<string, SectionOverride>;
  analysisStatuses?: Record<string, 'Tamamlandı' | 'Devam Ediyor' | 'Başlamadı' | 'İncelemede'>;
  chapterNotes?: Record<string, string>;
  chapterOrders?: Record<string, string[]>;
  lastUpdated: number;
}

const STATE_DOC_REF = doc(db, 'app_state', 'main');

let syncTimeout: any = null;
let broadcastChannel: BroadcastChannel | null = null;

try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('istanbul_2050_channel');
  }
} catch (e) {
  console.warn('BroadcastChannel not supported');
}

export function subscribeToTabBroadcast(onUpdate: (state: AppState) => void) {
  if (!broadcastChannel) return () => {};
  const handler = (event: MessageEvent) => {
    if (event.data && event.data.type === 'SYNC_STATE' && event.data.state) {
      onUpdate(event.data.state);
    }
  };
  broadcastChannel.addEventListener('message', handler);
  return () => broadcastChannel?.removeEventListener('message', handler);
}

export function broadcastLocalState(state: AppState) {
  if (!broadcastChannel) return;
  try {
    broadcastChannel.postMessage({ type: 'SYNC_STATE', state });
  } catch (e) {
    console.warn('Broadcast error:', e);
  }
}

export async function fetchGlobalCloudState(): Promise<AppState | null> {
  try {
    const snap = await getDoc(STATE_DOC_REF);
    if (snap.exists()) {
      const data = snap.data();
      return {
        workStatus: data.workStatus || {},
        customRows: data.customRows || {},
        rowOverrides: data.rowOverrides || {},
        analizOverrides: data.analizOverrides || {},
        reportStatus: data.reportStatus || {},
        customSubSections: data.customSubSections || {},
        sectionOverrides: data.sectionOverrides || {},
        analysisStatuses: data.analysisStatuses || {},
        chapterNotes: data.chapterNotes || {},
        chapterOrders: data.chapterOrders || {},
        lastUpdated: Number(data.lastUpdated) || 0
      };
    }
  } catch (err) {
    console.warn("Firestore fetch error:", err);
  }
  return null;
}

export async function pushGlobalCloudState(state: AppState): Promise<boolean> {
  const payload = {
    workStatus: state.workStatus || {},
    customRows: state.customRows || {},
    rowOverrides: state.rowOverrides || {},
    analizOverrides: state.analizOverrides || {},
    reportStatus: state.reportStatus || {},
    customSubSections: state.customSubSections || {},
    sectionOverrides: state.sectionOverrides || {},
    analysisStatuses: state.analysisStatuses || {},
    chapterNotes: state.chapterNotes || {},
    chapterOrders: state.chapterOrders || {},
    lastUpdated: state.lastUpdated || Date.now()
  };

  // Broadcast to other tabs on same machine immediately
  broadcastLocalState(payload);

  try {
    await setDoc(STATE_DOC_REF, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn("Firestore save error:", err);
    return false;
  }
}

export function queueGlobalCloudPush(
  getState: () => AppState,
  onStatusChange?: (status: 'saving' | 'synced' | 'error') => void
) {
  if (onStatusChange) onStatusChange('saving');
  if (syncTimeout) clearTimeout(syncTimeout);
  
  syncTimeout = setTimeout(async () => {
    const state = getState();
    const ok = await pushGlobalCloudState(state);
    if (onStatusChange) {
      onStatusChange(ok ? 'synced' : 'error');
    }
  }, 250);
}

export function subscribeToCloudState(
  onUpdate: (state: AppState) => void,
  onConnected?: () => void
) {
  const unsubscribe = onSnapshot(
    STATE_DOC_REF,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onUpdate({
          workStatus: data.workStatus || {},
          customRows: data.customRows || {},
          rowOverrides: data.rowOverrides || {},
          analizOverrides: data.analizOverrides || {},
          reportStatus: data.reportStatus || {},
          customSubSections: data.customSubSections || {},
          sectionOverrides: data.sectionOverrides || {},
          analysisStatuses: data.analysisStatuses || {},
          chapterNotes: data.chapterNotes || {},
          chapterOrders: data.chapterOrders || {},
          lastUpdated: Number(data.lastUpdated) || 0
        });
      }
      if (onConnected) onConnected();
    },
    (err) => {
      console.warn("Firestore real-time subscription error:", err);
    }
  );

  return unsubscribe;
}
