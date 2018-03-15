export interface Exercise {
    name: string;
    specs?: string;
    url?: string[];
    slot: 'Upper Body' | 'Lower Body' | 'Torso' | 'Other';
    otherSlot?: string;
    type: 'Press' | 'Pull' | 'Leg/Hip Drive' | 'Other';
    otherType?: string;
    key: string;
}