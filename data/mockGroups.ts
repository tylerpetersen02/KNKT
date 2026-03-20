export interface Group {
  id: string;
  name: string;
  memberCount: number;
  createdDate: string;
  emoji: string;
}

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Close Friends',
    memberCount: 8,
    createdDate: '2024-01-15',
    emoji: '👯',
  },
  {
    id: 'group-2',
    name: 'Work Colleagues',
    memberCount: 12,
    createdDate: '2024-02-01',
    emoji: '💼',
  },
  {
    id: 'group-3',
    name: 'Family',
    memberCount: 6,
    createdDate: '2024-01-20',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    id: 'group-4',
    name: 'Gaming Squad',
    memberCount: 5,
    createdDate: '2024-02-10',
    emoji: '🎮',
  },
  {
    id: 'group-5',
    name: 'Designers',
    memberCount: 9,
    createdDate: '2024-02-05',
    emoji: '🎨',
  },
  {
    id: 'group-6',
    name: 'Fitness Crew',
    memberCount: 7,
    createdDate: '2024-01-25',
    emoji: '💪',
  },
];
