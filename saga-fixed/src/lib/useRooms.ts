import { useState, useEffect } from 'react';
import { rooms as DEFAULT_ROOMS } from './rooms';
import type { Room } from './rooms';

export interface RoomData extends Room {
  id?: string;
}

export const ROOM_DURATION_OPTIONS = [
  { label: '1 Day', value: 24 * 60 * 60 * 1000 },
  { label: '2 Days', value: 2 * 24 * 60 * 60 * 1000 },
  { label: '3 Days', value: 3 * 24 * 60 * 60 * 1000 },
  { label: '4 Days', value: 4 * 24 * 60 * 60 * 1000 },
  { label: '12 Hours', value: 12 * 60 * 60 * 1000 },
  { label: '3 Hours', value: 3 * 60 * 60 * 1000 },
];

export const getRoomRemainingTime = (room: RoomData): number => {
  if (!room.occupiedAt || !room.durationMs) return 0;
  const endTime = room.occupiedAt + room.durationMs;
  return Math.max(0, endTime - Date.now());
};

export const formatRoomTime = (ms: number): string => {
  if (ms <= 0) return '00:00:00';
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const loadRooms = (): RoomData[] => {
  try {
    const saved = localStorage.getItem('saga-rooms');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_ROOMS.map((r, i) => ({ ...r, id: `room-${i}` }));
};

export const useRooms = () => {
  const [rooms, setRooms] = useState<RoomData[]>(loadRooms);
  const [tick, setTick] = useState(0);
  const [isInitialized] = useState(true);

  // Tick every second for timers
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem('saga-rooms', JSON.stringify(rooms));
  }, [rooms]);

  const addRoom = (room: Omit<RoomData, 'id'>) => {
    const newRoom: RoomData = { ...room, id: `room-${Date.now()}` };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (roomId: string, updates: Partial<RoomData>) => {
    setRooms(prev =>
      prev.map(r => (r.id === roomId || r.name === roomId ? { ...r, ...updates } : r))
    );
  };

  const deleteRoom = (roomId: string) => {
    setRooms(prev => prev.filter(r => r.id !== roomId && r.name !== roomId));
  };

  const occupyRoomWithTimer = (roomId: string, durationMs: number) => {
    updateRoom(roomId, { status: 'Occupied', occupiedAt: Date.now(), durationMs });
  };

  const vacateRoom = (roomId: string) => {
    updateRoom(roomId, { status: 'Available', occupiedAt: undefined, durationMs: undefined });
  };

  // FIX: was filtering wrong variable (rooms static import) — now filters state
  const availableRooms = (type: RoomData['type']) => {
    return rooms.filter(r => r.type === type && r.status === 'Available');
  };

  return {
    rooms,
    tick,
    addRoom,
    updateRoom,
    deleteRoom,
    occupyRoomWithTimer,
    occupyRoom: occupyRoomWithTimer,
    vacateRoom,
    availableRooms,
    isInitialized,
  };
};
