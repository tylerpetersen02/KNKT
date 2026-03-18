export interface MockUser {
  id: string;
  name: string;
  username: string;
  avatar_url?: string;
  bio?: string;
}

export const mockUsersForTesting: MockUser[] = [
  {
    id: 'user-5',
    name: 'Sarah Chen',
    username: 'sarahchen',
    bio: 'Coffee enthusiast & designer',
  },
  {
    id: 'user-6',
    name: 'Alex Park',
    username: 'alexpark',
    bio: 'Software engineer & hobby photographer',
  },
  {
    id: 'user-7',
    name: 'Morgan Lee',
    username: 'morganlee',
    bio: 'Marketing strategist & podcast listener',
  },
  {
    id: 'user-8',
    name: 'Jordan Smith',
    username: 'jordansmith',
    bio: 'Fitness trainer & nutrition enthusiast',
  },
  {
    id: 'user-9',
    name: 'Casey Johnson',
    username: 'caseyjoh',
    bio: 'Content creator & travel junkie',
  },
];

export const getRandomTestUser = (): MockUser => {
  return mockUsersForTesting[
    Math.floor(Math.random() * mockUsersForTesting.length)
  ];
};
