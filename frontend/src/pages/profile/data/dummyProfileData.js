/**
 * Dummy profile data for development and testing.
 * Structure matches the MySQL database schema tables exactly:
 *   - users: username, email
 *   - profiles: firstName, middleName, lastName, phoneNumber, gender, dateOfBirth, bio, profilePictureUrl
 *   - addresses: city, state, country, pincode
 *   - professional_details: experienceLevel
 *   - social_links: github, linkedin, portfolioWebsite, leetcode
 *   - education: (client-side list, no dedicated DB table)
 */

const userProfiles = {
  akashpatel: {
    // users table fields (readonly in form)
    username: 'akashpatel',
    email: 'akashpatel@gmail.com',

    // profiles table fields
    profilePictureUrl: null,
    profilePicture: null,
    firstName: 'Akash',
    middleName: '',
    lastName: 'Patel',
    phoneNumber: '+91 9827654123',
    gender: 'MALE',
    dateOfBirth: '2002-04-19',
    bio: 'Backend Specialist & Competitive Programming Enthusiast. Engineering high-performance systems and algorithms.',

    // addresses table fields
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    pincode: '420001',

    // professional_details table field
    experienceLevel: 'FRESHER',

    // social_links table fields
    github: 'https://github.com/akashpatel',
    linkedin: 'https://linkedin.com/in/akashpatel',
    portfolioWebsite: 'https://akashpatel.dev',
    leetcode: 'https://leetcode.com/akashpatel',

    // education (client-side, no dedicated table in current schema)
    education: [
      {
        id: 'edu-akash-1',
        collegeName: 'Acropolis Institute of Technology and Research',
        university: 'RGPV',
        degree: 'Bachelor of Technology',
        branch: 'Computer Science & Engineering',
        specialization: 'Computer Science',
        cgpa: '6.78',
        percentage: '67.8',
        passingYear: '2025',
        startYear: '2021',
        endYear: '2025',
        currentSemester: '',
        achievements: 'Institute Gold Medalist',
      },
    ],
  },
};

/**
 * Returns a deep clone of the dummy profile data for a specific user.
 */
export function getDummyProfileData(username = 'akashpatel') {
  const profile = userProfiles[username] || userProfiles['akashpatel'];
  return JSON.parse(JSON.stringify(profile));
}

/**
 * List of available users for the user selector & demo login.
 */
export const AVAILABLE_USERS = [
  {
    username: 'akashpatel',
    displayName: 'Akash Patel',
    role: 'Fresher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    tagline: 'Backend & Competitive Programming',
  },
];

export default userProfiles.akashpatel;
